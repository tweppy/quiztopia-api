const { sendResponse, sendError } = require("../../../responses/index");
const { db } = require("../../../services/db");
import middy from "@middy/core";
import { checkUsername } from "../../../middleware/user";
const { hashPassword } = require("../../../utils");
const { nanoid } = require("nanoid");
const jsonBodyParser = require("@middy/http-json-body-parser");

async function signup(event) {
  const { username, password } = event.body;

  const hashedPwd = await hashPassword(password);
  const result = await checkUsername(username);
  const usersFound = result.Count;

  try {
    if (usersFound === 1) {
      return sendError(400, { success: false, message: "Username already exists" });
    }

    const params = {
      TableName: "quizUsersDb",
      Item: {
        userId: nanoid(),
        username: username,
        password: hashedPwd,
      },
    };

    await db.put(params).promise();

    return sendResponse(200, { success: true, message: "User account created", username: username });
  } catch (error) {
    return sendError(500, { success: false, message: "Could not create user account", error: error });
  }
}

export const handler = middy(signup).use(jsonBodyParser()).handler(signup);
