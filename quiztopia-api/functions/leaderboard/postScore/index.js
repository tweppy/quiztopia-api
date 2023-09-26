import { validateToken } from "../../../middleware/auth";
const { sendResponse, sendError } = require("../../../responses/index");
const { db } = require("../../../services/db");
const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");

/*
auth in header.

{
  "userId": "str",
  "quizId": "str",
  "score": "str"
}
*/

async function postScore(event) {
  const { quizId, userId, score } = event.body;

  const searchParams = {
    TableName: "quizDB",
    Key: { quizId: quizId },
  };

  try {
    const result = await db.get(searchParams).promise();

    if (!result.Item) {
      return sendError(404, { success: false, message: "Quiz not found" });
    }

    const params = {
      TableName: "quizDB",
      Key: { quizId: quizId },
      ReturnValues: "ALL_NEW",
      UpdateExpression: "SET #qq = list_append(#qq, :newScores)",
      ExpressionAttributeNames: { "#qq": "scores" },
      ExpressionAttributeValues: {
        ":newScores": [
          {
            score: score,
            userId: userId
          },
        ],
      },
    };

    await db.update(params).promise();

    const newScore = params.ExpressionAttributeValues[":newScores"][0];
    const response = {
      quizId,
      score: newScore,
    };

    return sendResponse(200, { success: true, result: response });
  } catch (error) {
    return sendError(500, { success: false, error: error });
  }
}

export const handler = middy(postScore)
.use(jsonBodyParser())
.use(validateToken)
.handler(postScore);
