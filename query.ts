// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/index.html
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-dynamodb-utilities.html
// https://stackoverflow.com/questions/68820119/aws-aws-sdk-lib-dynamodb-cannot-read-property-0-of-undefined
import { GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb"

import { ddbDocClient } from "./config"
import { TABLE_NAME, GSI_1 } from './constants'
import { articles, users, subscriptions } from './data'
import { Article, User, Subscription } from './types'

async function queryById(id: string) {
    const result = await ddbDocClient.send(new GetCommand({
        TableName: TABLE_NAME,
        Key: {
            PK: id,
            SK: '#',
        },
    }))

    console.log(result.Item, '\n')
}

async function queryArticleByCategory(category: Article['article_category']) {
    const result = await ddbDocClient.send(new QueryCommand({
        TableName: TABLE_NAME,
        IndexName: GSI_1,
        KeyConditionExpression: '#GSI_1_PK = :category',
        ExpressionAttributeNames: {
            '#GSI_1_PK': 'GSI_1_PK',
        },
        ExpressionAttributeValues: {
            ':category': category,
        },
    }))

    console.log(result.Items, '\n')
}

async function main() {
    try {
        await queryById(articles[0].article_id)
        await queryById(users[0].user_id)
        await queryById(subscriptions[0].subscription_id)
        await queryArticleByCategory(articles[0].article_category)
    } catch (error) {
        console.error(error)
    }
}

main()