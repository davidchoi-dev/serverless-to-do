import { callDB } from "./libs/dynamodb";
import { success, failure } from "./libs/responses";

export async function main(event) {
  const params = {
    TableName: "notes",
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };
  try {
    await callDB("delete", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
