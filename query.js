require('./awsConfig')

const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const { TABLE_NAME, GSI_1 } = require('./constants')
const { articles, users, subscriptions } = require('./data')

async function queryById(id) {
    const result = await docClient.query({
        TableName: TABLE_NAME,
        KeyConditionExpression: '#PK = :id',
        ExpressionAttributeNames: {
            '#PK': 'PK',
        },
        ExpressionAttributeValues: {
            ':id': id,
        },
    }).promise()

    console.log(result.Items, '\n')
}

async function queryArticleByCategory(category) {
    const result = await docClient.query({
        TableName: TABLE_NAME,
        IndexName: GSI_1,
        KeyConditionExpression: '#GSI_1_PK = :category',
        ExpressionAttributeNames: {
            '#GSI_1_PK': 'GSI_1_PK',
        },
        ExpressionAttributeValues: {
            ':category': category,
        },
    }).promise()

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