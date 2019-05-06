import { callDB } from "./libs/dynamodb";
import { success, failure } from "./libs/responses";

export async function main(event) {
  const params = {
    TableName: "notes",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    const result = await callDB("query", params);
    return success(result.Items);
  } catch (e) {
    return failure({ status: false });
  }
}
