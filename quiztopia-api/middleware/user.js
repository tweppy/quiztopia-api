const { db } = require("../services/db");

async function checkUsername(username) {
  const params = {
    TableName: "quizUsersDb",
    FilterExpression: "username = :username",
    ExpressionAttributeValues: {
      ":username": username,
    },
  };

  const result = await db.scan(params).promise();

  return result;
}

async function checkBody(body) {
  if (!body.username || !body.password) {
    return sendError(404, { success: false, message: "Missing password or username from body" });
  }

  return;
}

module.exports = { checkUsername, checkBody };
