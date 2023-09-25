const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-2'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'ots-user';
const teamPath = '/team';
const userPath = '/user';
const usersPath = '/users';

exports.handler = async function (event) {
    console.log('Request event', event);
    let response;
    switch (true) {
        case event.httpMethod === 'GET' && event.path === teamPath:
            response = buildResponse(200);
            break;
        case event.httpMethod === 'GET' && event.path === userPath:
            response = await getUser(event.queryStringParameters.userId);
            break;
        case event.httpMethod === 'GET' && event.path === usersPath:
            response = await getUsers()
            break;
        case event.httpMethod === 'POST' && event.path === userPath:
            response = await saveUser(JSON.parse(event.body))
            break;
        case event.httpMethod === 'PATCH' && event.path === userPath:
            const requestBody = JSON.parse(event.body)
            response = await modifyUser(requestBody.userId, requestBody.updateKey, requestBody.updateValue)
            break;
        case event.httpMethod === 'DELETE' && event.path === userPath:
            response = await deleteUser(JSON.parse(event.body).userId)
            break;
        default:
            response = buildResponse(404, '404 Not Found');
    }
    return response;
}

function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}
async function getUser(userId){
    const params = {
        TableName: dynamodbTableName,
        Key: {
            'userId': userId
        }
    }
    return await dynamodb.get(params).promise().then((response) => {
        return buildResponse(200, response.Item)
    }, (error) => {
        console.error('Do your custom error handling here. I am just gonna log it: ', error)
    })
}
async function getUsers() {
    const params = {
        TableName: dynamodbTableName
    }

    const allUsers = await scanDynamoRecords(params, []);
    const body = {
        users: allUsers
    }
    return buildResponse(200, body)

}

async function scanDynamoRecords(scanParams, itemArray) {
    try {
        const dynamoData = await dynamodb.scan(scanParams).promise();
        itemArray = itemArray.concat(dynamoData.Items)
        if (dynamoData.LastEvaluatedKey) {
            scanParams.ExclusiveStartKey = dynamoData.LastEvaluatedKey
            return await scanDynamoRecords(scanParams, itemArray)
        }
        return itemArray
    } catch (error) {
        console.error('Do your custom error handling here. I am just gonna log it: ', error)
    }
}

async function saveUser(requestBody) {
    const params = {
        TableName: dynamodbTableName,
        Item: requestBody
    }
    return await dynamodb.put(params).promise().then(() => {
        const body = {
            Operation: 'SAVE',
            Message: 'SUCCESS',
            Item: requestBody
        }
        return buildResponse(200, body)
    }, (error) => {
        console.error('Do your custom error handling here. I am just gonna log it: ', error)
    })
}
async function modifyUser(userId, updateKey, updateValue) {
    const params = {
        TableName: dynamodbTableName,
        Key: {
            'userId': userId
        },
        UpdateExpression: `set ${updateKey} = :value`,
        ExpressionAttributeValues: {
            ':value': updateValue
        },
        ReturnValues: 'UPDATED_NEW'
    }
    return await dynamodb.update(params).promise().then((response) => {
        const body = {
            Operation: 'UPDATE',
            Message: 'SUCCESS',
            UpdatedAttributes: response
        }
        return buildResponse(200, body)
    }, (error) => {
        console.error('Do your custom error handling here. I am just gonna log it: ', error)
    })
}

async function deleteUser(userId) {
    const params = {
        TableName: dynamodbTableName,
        Key: {
            'userId': userId
        },
        ReturnValues: 'ALL_OLD'
    }
    return await dynamodb.delete(params).promise().then((response) => {
        const body = {
            Operation: 'DELETE',
            Message: 'SUCCESS',
            Item: response
        }
        return buildResponse(200, body)
    }, (error) => {
        console.error('Do your custom error handling here. I am just gonna log it: ', error)
    })
}







