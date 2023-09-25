const { sendResponse, sendError } = require("../../../responses/index");
const { db } = require("../../../services/db");

let users;

exports.handler = async (event, context) => {
  try {
    // const { Items } = await db.scan({
    //     TableName: "quizUsersDb",
    //     FilterExpression: "attribute_exists(#DYNOBASE_todo)",
    //     ExpressionAttributeNames: {
    //       "#DYNOBASE_todo": "todo",
    //     },
    //   }).promise();
    const results = await db.scan({ TableName: "quizUsersDb" }).promise();
    users = results.Items;

    return sendResponse(200, { success: true, users: users });
  } catch (error) {
    return sendError(500, { success: false, message: "Could not get users" });
  }
};