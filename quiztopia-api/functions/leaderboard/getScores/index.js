const { sendResponse, sendError } = require("../../../responses/index");
const { db } = require("../../../services/db");
const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");

async function getScores(event) {
  const { quizId } = event.body;

  const params = {
    TableName: "quizDB",
    Key: { quizId: quizId },
  };

  try {
    const result = await db.get(params).promise();

    if (!result.Item) {
      return sendError(404, { success: false, message: "Quiz not found" });
    }

    const { scores, quizName } = result.Item;
    
    const sorted = scores.sort((a, b) => b.score - a.score);

    const response = {
      quizName,
      quizId,
      highscores: sorted
    };

    return sendResponse(200, { success: true, result: response });
  } catch (error) {
    return sendError(500, { success: false, error: error });
  }
}

export const handler = middy(getScores)
.use(jsonBodyParser())
.handler(getScores);
