const { sendResponse, sendError } = require("../../../responses/index");
const { db } = require("../../../services/db");
const middy = require("@middy/core");

async function getAllUsers() {
  try {
    const results = await db.scan({ TableName: "quizUsersDb" }).promise();
    
    return sendResponse(200, { success: true, users: results.Items });
  } catch (error) {
    return sendError(500, { success: false, message: "Could not get users" });
  }
}

export const handler = middy(getAllUsers)
.handler(getAllUsers);
