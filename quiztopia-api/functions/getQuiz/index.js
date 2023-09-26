const { sendResponse, sendError } = require("../../responses/index");
const { db } = require("../../services/db");
const middy = require("@middy/core");

async function getQuiz(event) {
  const { quizId } = event.pathParameters;

  const params = {
    TableName: "quizDB",
    Key: {
      quizId: quizId,
    },
  };

  try {
    const result = await db.get(params).promise();

    if (!result.Item) {
      return sendError(404, { success: false, message: "Quiz not found" });
    }

    const { quizId, userId, questions, quizName } = result.Item;

    const questionList = questions.map((question) => question.question);

    const response = {
      quizName,
      quizId,
      userId,
      questions: questionList,
    };

    return sendResponse(200, { success: true, results: response });
  } catch (error) {
    console.log(error);
    return sendError(500, { success: false, message: error });
  }
}

export const handler = middy(getQuiz)
.handler(getQuiz);
