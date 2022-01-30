require('./awsConfig')

const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const { TABLE_NAME, GSI_1 } = require('./constants')
const { articles, users, subscriptions } = require('./data')

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html

async function createTable() {
    try {
        await dynamodb.deleteTable({
            TableName: TABLE_NAME,
        }).promise()
    } catch (error) {
        // catch error if you try to delete non-existent table
        if (!error.name === 'ResourceNotFoundException') {
            throw error
        }
    }
    await dynamodb.createTable({
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
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10,
        },
    }).promise()
}

async function createData() {
    await Promise.all(
        articles
            .map(article => ({
                TableName: TABLE_NAME,
                Item: {
                    ...article,
                    PK: article.article_id,
                    SK: '#',
                    GSI_1_PK: article.article_category,
                    GSI_1_SK: article.article_upload_datetime,
                },
            }))
            .map(params => docClient.put(params).promise())
    )
    
    await Promise.all(
        users
            .map(user => ({
                TableName: TABLE_NAME,
                Item: {
                    ...user,
                    PK: user.user_id,
                    SK: '#',
                },
            }))
            .map(params => docClient.put(params).promise())
    )

    await Promise.all(
        subscriptions
            .map(subscription => ({
                TableName: TABLE_NAME,
                Item: {
                    ...subscription,
                    PK: subscription.subscription_id,
                    SK: '#',
                },
            }))
            .map(params => docClient.put(params).promise())
    )
}

async function scanTable() {
    const mainTable = await docClient.scan({
        TableName: TABLE_NAME,
    }).promise()
    console.log('table', TABLE_NAME, '\n', mainTable.Items)

    console.log('\n------------------------------\n')

    const gsi1 = await docClient.scan({
        TableName: TABLE_NAME,
        IndexName: GSI_1,
    }).promise()
    console.log('index', GSI_1, '\n', gsi1.Items)
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