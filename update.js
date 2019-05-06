import { callDB } from "./libs/dynamodb";
import { success, failure } from "./libs/responses";

export async function main(event) {
  const body = JSON.parse(event.body);
  const params = {
    TableName: "notes",
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    },
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": body.attachment || null,
      ":content": body.content || null
    }
  };
  try {
    await callDB("update", params);
    return success({ status: true });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
