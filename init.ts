// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/index.html
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-dynamodb-utilities.html
// https://stackoverflow.com/questions/68820119/aws-aws-sdk-lib-dynamodb-cannot-read-property-0-of-undefined
import {
    DeleteTableCommand,
    CreateTableCommand,
} from "@aws-sdk/client-dynamodb"

import {
    ScanCommand,
    PutCommand,
    PutCommandInput,
} from '@aws-sdk/lib-dynamodb'

import { ddbClient, ddbDocClient } from "./config"
import { TABLE_NAME, GSI_1 } from './constants'
import { articles, users, subscriptions } from './data'
import { Article, User, Subscription } from './types'


async function createTable() {
    try {
        await ddbClient.send(new DeleteTableCommand({
            TableName: TABLE_NAME,
        }))
    } catch (error: any) {
        // catch error if you try to delete non-existent table
        if (error.name !== 'ResourceNotFoundException') {
            throw error
        }
    }
    await ddbClient.send(new CreateTableCommand({
        TableName: TABLE_NAME,
        KeySchema: [
            {
                AttributeName: 'PK',
                KeyType: 'HASH', // Partition Key
            },
            {
                AttributeName: 'SK',
                KeyType: 'RANGE', // Sort Key
            }
        ],
        GlobalSecondaryIndexes: [
            {
                IndexName: 'GSI_1',
                KeySchema: [
                    {
                        AttributeName: 'GSI_1_PK',
                        KeyType: 'HASH', // Partition Key
                    },
                    {
                        AttributeName: 'GSI_1_SK',
                        KeyType: 'RANGE', // Sort Key
                    },
                ],
                Projection: {
                    NonKeyAttributes: [
                        'article_title',
                    ],
                    ProjectionType: 'INCLUDE',
                },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 10,
                    WriteCapacityUnits: 10,
                },
            },
        ],
        // LocalSecondaryIndexes: [
        //     {
        //         IndexName: 'LSI_1',
        //         KeySchema: [
        //             {
        //                 AttributeName: 'PK',
        //                 KeyType: 'HASH', // Partition Key
        //             },
        //             {
        //                 AttributeName: 'LSI_1_SK',
        //                 KeyType: 'RANGE', // Sort Key
        //             },
        //         ],
        //         Projection: {
        //             NonKeyAttributes: [
        //                 'article_title',
        //                 'subscription_start_date',
        //                 'subscription_end_date',
        //             ],
        //             ProjectionType: 'INCLUDE',
        //         },
        //     },
        // ],
        AttributeDefinitions: [
            {
                AttributeName: 'PK',
                AttributeType: 'S',
            },
            {
                AttributeName: 'SK',
                AttributeType: 'S',
            },
            {
                AttributeName: 'GSI_1_PK',
                AttributeType: 'S',
            },
            {
                AttributeName: 'GSI_1_SK',
                AttributeType: 'S',
            },
            // {
            //     AttributeName: 'LSI_1_SK',
            //     AttributeType: 'S',
            // },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10,
        },
    }))
}

async function createData() {
    await Promise.all(
        articles
            .map((article: Article) => ({
                TableName: TABLE_NAME,
                Item: {
                    ...article,
                    PK: article.article_id,
                    SK: '#',
                    GSI_1_PK: `${article.article_category}#${article.article_is_premium}`,
                    GSI_1_SK: article.article_upload_datetime,
                },
            }))
            .map((params: PutCommandInput) => ddbDocClient.send(new PutCommand(params)))
    )

    // denormalizing data (don't forget to update when data is updated or deleted)
    await Promise.all(
        articles
            .map((article: Article) => ({
                TableName: TABLE_NAME,
                Item: {
                    PK: article.article_category,
                    SK: `${article.article_is_premium}#${article.article_upload_datetime}`,
                    article_title: article.article_title,
                    article_id: article.article_id,
                },
            }))
            .map((params: PutCommandInput) => ddbDocClient.send(new PutCommand(params)))
    )

    // denormalizing data (don't forget to update when data is updated or deleted)
    await Promise.all(
        articles
            .map((article: Article) => ({
                TableName: TABLE_NAME,
                Item: {
                    PK: article.article_user_id,
                    SK: `ARTICLES#${article.article_upload_datetime}`,
                    article_title: article.article_title,
                    article_id: article.article_id,
                },
            }))
            .map((params: PutCommandInput) => ddbDocClient.send(new PutCommand(params)))
    )
    
    await Promise.all(
        users
            .map((user: User) => ({
                TableName: TABLE_NAME,
                Item: {
                    ...user,
                    PK: user.user_id,
                    SK: '#',
                },
            }))
            .map((params: PutCommandInput) => ddbDocClient.send(new PutCommand(params)))
    )

    await Promise.all(
        subscriptions
            .map((subscription: Subscription) => ({
                TableName: TABLE_NAME,
                Item: {
                    ...subscription,
                    PK: subscription.subscription_id,
                    SK: '#',
                },
            }))
            .map((params: PutCommandInput) => ddbDocClient.send(new PutCommand(params)))
    )

    // denormalizing data (don't forget to update when data is updated or deleted)
    await Promise.all(
        subscriptions
            .map((subscription: Subscription) => ({
                TableName: TABLE_NAME,
                Item: {
                    PK: subscription.subscription_user_id,
                    SK: `SUBSCRIPTIONS#${subscription.subscription_id}`,
                    subscription_start_date: subscription.subscription_start_date,
                    subscription_end_date: subscription.subscription_end_date,
                    subscription_payment_status: subscription.subscription_payment_status,
                },
            }))
            .map((params: PutCommandInput) => ddbDocClient.send(new PutCommand(params)))
    )
}

async function scanTable() {
    const mainTable = await ddbDocClient.send(new ScanCommand({
        TableName: TABLE_NAME,
    }))
    console.log('table', TABLE_NAME)
    console.log(mainTable.Items)

    console.log('\n------------------------------\n')

    const gsi1 = await ddbDocClient.send(new ScanCommand({
        TableName: TABLE_NAME,
        IndexName: GSI_1,
    }))
    console.log('index', GSI_1)
    console.log(gsi1.Items)
}

async function main() {
    try {
        await createTable()
        await createData()
        await scanTable()
    } catch (error) {
        console.log('error')
        console.error(error)
    }
}

main()