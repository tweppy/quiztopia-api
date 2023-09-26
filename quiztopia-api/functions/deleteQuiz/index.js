const { sendResponse, sendError } = require("../../responses/index");
import { validateToken } from "../../middleware/auth";
const { db } = require("../../services/db");
const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");

async function deleteQuiz(event) {
  const { quizId } = event.pathParameters;
  const { userId } = event.body;

  const params = {
    TableName: "quizDB",
    Key: { quizId: quizId },
  };

  try {
    const result = await db.get(params).promise();

    if (!result.Item) {
      return sendError(404, { success: false, message: "Quiz not found" });
    }

    const quizCreator = result.Item.userId;
    
    if (userId !== quizCreator) {
      return sendError(401, { msg: "Unauthorized user: You can't delete someone else's quiz", quizCreator: quizCreator, userIdBody: userId });
    }

    await db.delete(params).promise();

    return sendResponse(200, { success: true, message: "Quiz deleted" });
  } catch (error) {
    console.log(error);
    return sendError(500, { success: false, message: error });
  }
}

export const handler = middy(deleteQuiz)
.use(jsonBodyParser()).use(validateToken)
.handler(deleteQuiz);
