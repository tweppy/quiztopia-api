import { validateToken } from "../../middleware/auth";
const { sendResponse, sendError } = require("../../responses/index");
const { db } = require("../../services/db");
const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");
const { nanoid } = require("nanoid");

async function postQuiz(event) {
  const { quizName, userId } = event.body;

  try {
    const params = {
      TableName: "quizDB",
      Item: {
        quizId: nanoid(),
        quizName: quizName,
        userId: userId,
        questions: [],
        scores: [],
      },
    };

    await db.put(params).promise();

    return sendResponse(200, { success: true, item: params.Item });
  } catch (error) {
    return sendError(500, { success: false, error: error });
  }
}

export const handler = middy(postQuiz)
.use(jsonBodyParser())
.use(validateToken)
.handler(postQuiz);
