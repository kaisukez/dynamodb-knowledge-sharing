const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: 'placeholder_for_dynamodb_local',
    secretAccessKey: 'placeholder_for_dynamodb_local',
    region: 'ap-southeast-1',
    endpoint: 'http://localhost:65000'
})