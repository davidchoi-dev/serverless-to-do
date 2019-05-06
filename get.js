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
    const result = await callDB("get", params);
    if (result.Item) {
      return success(result.Item);
    } else {
      return failure({ status: false, error: "Item not found" });
    }
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
