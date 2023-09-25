const { sendResponse, sendError } = require("../../../responses/index");
const { db } = require("../../../services/db");
import middy from "@middy/core";
import { validateToken } from "../../../middleware/auth";
import { checkUsername } from "../../../middleware/user";
const { hashPassword } = require("../../../utils");
const { v4 } = require("uuid");

// rm exports.handler and replace with= async function createUser
exports.handler = async (event, context) => {
  const { username, password } = JSON.parse(event.body);
  const hashedPwd = await hashPassword(password);
  const id = v4();
  const result = await checkUsername(username);
  const usersFound = result.Count;

  try {
    if (!username || !password) {
      return sendError(404, { success: false, message: "Missing password or username from body" });
    }
    
    if (usersFound === 1) {
      return sendError(400, { success: false, message: "Username already exists" });
    }

    await db
      .put({
        TableName: "quizUsersDb",
        Item: {
          userId: id,
          username: username,
          password: hashedPwd,
        },
      })
      .promise();

    return sendResponse(200, { success: true, message: "User account created", username: username });
  } catch (error) {
    return sendError(500, { success: false, message: "Could not create user account", error: error });
  }
};

// later-------------auth stuff

// const handler = middy()
//   .use(validateToken)
//   .handler(async (event) => {
//     try {
//       // if no event id OR there's an error and it's 401, sendError
//       if (!event?.id || (event?.error && event?.error === "401")) return sendError(401, { success: false, message: "Invalid token" });

//       // from jwt
//       const user = await createUser(event.username);

//       // // if no acc found:
//       // if (!user) return sendError(401, { success: false, message: "No user found" });

//       // found acc:
//       return sendResponse({ success: true, user: user });
//     } catch (error) {
//       return sendError(400, { success: false, message: "Could not get user" });
//     }
//   });

// module.exports = { handler };
