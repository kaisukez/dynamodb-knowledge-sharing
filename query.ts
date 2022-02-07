// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/index.html
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-dynamodb-utilities.html
// https://stackoverflow.com/questions/68820119/aws-aws-sdk-lib-dynamodb-cannot-read-property-0-of-undefined
import { GetCommand, QueryCommand, QueryCommandInput } from "@aws-sdk/lib-dynamodb"

import { ddbDocClient } from "./config"
import { TABLE_NAME, GSI_1 } from './constants'
import { articles, users, subscriptions } from './data'
import { Article, User, Subscription, DateRange } from './types'

async function queryById(id: string) {
    const result = await ddbDocClient.send(new GetCommand({
        TableName: TABLE_NAME,
        Key: {
            PK: id,
            SK: '#',
        },
    }))

    console.log('queryById')
    console.log(result.Item, '\n')
    return result
}

async function queryArticleByCategoryUsingDenormalizationMethod(
    category: Article['article_category'],
    isPremium?: Article['article_is_premium'],

    // for pagination
    limit?: QueryCommandInput['Limit'],
    exclusiveStartKey?: QueryCommandInput['ExclusiveStartKey'],
) {
    const isPremiumConditionExpression = isPremium ? ' AND begins_with(SK, :is_premium)' : ''
    const isPremiumAttributeValue: Record<string, string> = isPremium ? { ':is_premium': isPremium } : {}
    const result = await ddbDocClient.send(new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: '#PK = :category' + isPremiumConditionExpression,
        ExpressionAttributeNames: {
            '#PK': 'PK',
        },
        ExpressionAttributeValues: {
            ':category': category,
            ...isPremiumAttributeValue,
        },

        // for pagination
        Limit: limit,
        ExclusiveStartKey: exclusiveStartKey,
    }))

    console.log('queryArticleByCategoryUsingDenormalizationMethod')
    console.log(result.Items, '\n')
    return result
}

async function queryArticleByCategoryUsingGSIMethod(
    category: Article['article_category'],
    isPremium: Article['article_is_premium'],
    dateRange?: DateRange,

    // for pagination
    limit?: QueryCommandInput['Limit'],
    exclusiveStartKey?: QueryCommandInput['ExclusiveStartKey'],
) {
    const dateRangeConditionExpression = dateRange ? ' AND GSI_1_SK BETWEEN :start AND :end' : ''
    const dateRangeAttributeValue: Record<string, string> = dateRange ? { ':start': dateRange.start, ':end': dateRange.end } : {}
    const result = await ddbDocClient.send(new QueryCommand({
        TableName: TABLE_NAME,
        IndexName: GSI_1,
        KeyConditionExpression: '#GSI_1_PK = :GSI_1_PK' + dateRangeConditionExpression,
        ExpressionAttributeNames: {
            '#GSI_1_PK': 'GSI_1_PK',
        },
        ExpressionAttributeValues: {
            ':GSI_1_PK': `${category}#${isPremium}`,
            ...dateRangeAttributeValue,
        },

        // for pagination
        Limit: limit,
        ExclusiveStartKey: exclusiveStartKey,
    }))

    console.log('queryArticleByCategoryUsingGSIMethod')
    console.log(result.Items, '\n')
    return result
}

async function queryArticlesByUserId(userId: Article['article_user_id']) {
    const result = await ddbDocClient.send(new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: '#PK = :userId AND begins_with(SK, :SK)',
        ExpressionAttributeNames: {
            '#PK': 'PK',
        },
        ExpressionAttributeValues: {
            ':userId': userId,
            ':SK': 'ARTICLES'
        },
    }))

    console.log('queryArticlesByFromUserId')
    console.log(result.Items, '\n')
    return result
}

async function querySubscriptionsByUserId(userId: Article['article_user_id']) {
    const result = await ddbDocClient.send(new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: '#PK = :userId AND begins_with(SK, :SK)',
        ExpressionAttributeNames: {
            '#PK': 'PK',
        },
        ExpressionAttributeValues: {
            ':userId': userId,
            ':SK': 'SUBSCRIPTIONS'
        },
    }))

    console.log('querySubscriptionsByUserId')
    console.log(result.Items, '\n')
    return result
}

async function queryWithPagination() {
    const result = await queryArticleByCategoryUsingDenormalizationMethod('FISH', undefined, 2)
    let lastEvaluatedKey = result.LastEvaluatedKey
    console.log('lastEvaluatedKey', lastEvaluatedKey)
    
    while (lastEvaluatedKey) {
        const result = await queryArticleByCategoryUsingDenormalizationMethod('FISH', undefined, 2, lastEvaluatedKey)
        lastEvaluatedKey = result.LastEvaluatedKey
        console.log('lastEvaluatedKey', lastEvaluatedKey)
    }
}

async function main() {
    try {
        await queryById('a93cae22-7a9b-4b4f-b6b0-b40db54b4803')
        await queryById('ea2dd93e-0568-47ef-8004-bc4990425f1a')
        await queryById('b48367aa-d040-4430-8279-1c17e2900af9')

        await queryArticleByCategoryUsingDenormalizationMethod('CAT')
        await queryArticleByCategoryUsingDenormalizationMethod('DOG', 'TRUE')
        
        await queryArticleByCategoryUsingGSIMethod('FISH', 'FALSE')
        await queryArticleByCategoryUsingGSIMethod(
            'FISH',
            'FALSE',
            {
                start: '2021-07-20T17:00:00.000Z',
                end: '2021-07-30T17:00:00.000Z',
            },
        )

        await queryArticlesByUserId('ea2dd93e-0568-47ef-8004-bc4990425f1a')
        await querySubscriptionsByUserId('ea2dd93e-0568-47ef-8004-bc4990425f1a')

        await queryWithPagination()
    } catch (error) {
        console.error(error)
    }
}

main()