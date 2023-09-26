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

module.exports = { checkUsername };
