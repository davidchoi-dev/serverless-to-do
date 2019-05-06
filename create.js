import uuid from "uuid";
import { call } from "./libs/dynamodb";
import { success, failure } from "./libs/responses";

export async function main(event) {
  const body = JSON.parse(event.body);
  const params = {
    TableName: "notes",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: body.content,
      attachment: body.attachment,
      createdAt: Date.now()
    }
  };

  try {
    await call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
