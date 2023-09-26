const { sendResponse, sendError } = require("../../../responses/index");
const { db } = require("../../../services/db");
const middy = require("@middy/core");

async function getQuizzes() {
  try {
    const results = await db.scan({ TableName: "quizDB" }).promise();

    return sendResponse(200, { success: true, results: results.Items });
  } catch (error) {
    return sendError(500, { success: false, message: "Error" });
  }
}

export const handler = middy(getQuizzes)
.handler(getQuizzes);
