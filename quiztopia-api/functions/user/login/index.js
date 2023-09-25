const { checkUsername, checkBody } = require("../../../middleware/user");
const { sendResponse, sendError } = require("../../../responses/index");
const { db } = require("../../../services/db");
const { comparePassword } = require("../../../utils");

exports.handler = async (event, context) => {
  const { username, password } = JSON.parse(event.body);

  try {
    const result = await checkUsername(username);
    const usersFound = result.Count;

    // make into checkbody
    if (!username || !password) {
      return sendError(404, { success: false, message: "Missing password or username from body" });
    }

    // const validBody = await checkBody(event.body);

    if (usersFound === 0) {
      return sendError(404, { success: false, message: "User not found" });
    }

    const userData = result.Items[0];
    const storedPasswordHash = userData.password;
    const passwordMatch = await comparePassword(password, storedPasswordHash);

    if (!passwordMatch) {
      return sendError(400, { success: false, message: "Invalid password" });
    }

    return sendResponse(200, { success: true, message: `User ${username} successfully logged in!` });
  } catch (error) {
    return sendError(500, { success: false, error: error });
  }
};

// needs auth
