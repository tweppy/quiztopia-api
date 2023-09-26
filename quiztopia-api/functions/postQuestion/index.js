import { validateToken } from "../../middleware/auth";
const { sendResponse, sendError } = require("../../responses/index");
const { db } = require("../../services/db");
const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");
const { nanoid } = require("nanoid");

async function postQuestion(event) {
  const { quizId, question, answer, coordinates, userId } = event.body;

  const searchParams = {
    TableName: "quizDB",
    Key: { quizId: quizId },
  };

  try {
    if (!question || !answer || !coordinates.latitude || !coordinates.longitude) {
      return sendError(400, { success: false, message: "Invalid body" });
    }

    const result = await db.get(searchParams).promise();

    if (!result.Item) {
      return sendError(404, { success: false, message: "Quiz not found" });
    }

    const params = {
      TableName: "quizDB",
      Key: { quizId: quizId },
      ReturnValues: "ALL_NEW",
      UpdateExpression: "SET #qq = list_append(#qq, :newQuestion)",
      ExpressionAttributeNames: { "#qq": "questions" },
      ExpressionAttributeValues: {
        ":newQuestion": [
          {
            questionId: nanoid(),
            question: question,
            answer: answer,
            coordinates: coordinates,
          },
        ],
      },
    };

    await db.update(params).promise();

    const newQ = params.ExpressionAttributeValues[":newQuestion"][0];
    const response = {
      quizId,
      userId,
      question: newQ,
    };

    return sendResponse(200, { success: true, result: response });
  } catch (error) {
    return sendError(500, { success: false, error: error });
  }
}

export const handler = middy(postQuestion)
.use(jsonBodyParser())
.use(validateToken)
.handler(postQuestion);
