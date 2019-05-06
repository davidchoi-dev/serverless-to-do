import uuid from "uuid";
import AWS from "aws-sdk";

const db = new AWS.DynamoDB.DocumentClient();

export function main(event, context, callback) {
  const body = JSON.parse(event.body);
  const params = {
    TableName: "notes",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: body.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  db.put(params, (error, data) => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    };
    if (error) {
      const response = {
        statusCode: 500,
        headers,
        body: JSON.stringify({ status: false })
      };
      callback(null, response);
      return;
    }

    const response = {
      statusCode: 200,
      headers,
      body: JSON.stringify(params.Item)
    };
    callback(null, response);
  });
}
