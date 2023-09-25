const { sendResponse, sendError } = require("../../responses/index");
const { db } = require("../../services/db");

let todos;

exports.handler = async (event, context) => {
  try {
    // const { Items } = await db.scan({
    //     TableName: "todoDB",
    //     FilterExpression: "attribute_exists(#DYNOBASE_todo)",
    //     ExpressionAttributeNames: {
    //       "#DYNOBASE_todo": "todo",
    //     },
    //   }).promise();
    const results = await db.scan({ TableName: "todoDB" }).promise();
    todos = results.Items;

    return sendResponse(200, { success: true, todos: todos });
  } catch (error) {
    return sendError(500, { success: false, message: "Could not get todos" });
  }
};
