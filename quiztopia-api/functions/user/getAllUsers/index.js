const { sendResponse, sendError } = require("../../../responses/index");
const { db } = require("../../../services/db");
const middy = require("@middy/core");

async function getAllUsers() {
  try {
    const results = await db.scan({ TableName: "quizUsersDb" }).promise();
    // const { username, userId } = results.Items;

    // const response = {
    //   username,
    //   userId,
    // };

    return sendResponse(200, { success: true, users: results.Items });
  } catch (error) {
    return sendError(500, { success: false, message: "Could not get users" });
  }
}

export const handler = middy(getAllUsers)
.handler(getAllUsers);
