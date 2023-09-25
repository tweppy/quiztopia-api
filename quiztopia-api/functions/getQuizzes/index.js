const { sendResponse, sendError } = require("../../responses/index");
const { db } = require("../../services/db");

let quizzes;

exports.handler = async (event, context) => {
  try {
    // const { Items } = await db.scan({
    //     TableName: "quizDB",
    //     FilterExpression: "attribute_exists(#DYNOBASE_quizName)",
    //     ExpressionAttributeNames: {
    //       "#DYNOBASE_quizName": "quizName",
    //     },
    //   }).promise();
    const results = await db.scan({ TableName: "quizDB" }).promise();
    quizzes = results.Items;

    return sendResponse(200, { success: true});
  } catch (error) {
    return sendError(500, { success: false, message: "Error" });
  }
};
