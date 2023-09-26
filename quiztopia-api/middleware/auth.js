const jwt = require("jsonwebtoken");
const { sendError } = require("../responses");

const validateToken = {
  before: async (request) => {
    try {
      const token = request.event.headers.authorization?.replace("Bearer ", "");
      const bodyId = request.event.body.userId;

      if (!token) {
        return sendError(400, { success: false, error: "No token" });
      }

      const data = jwt.verify(token, "4815162342");

      if (bodyId !== data.userId) {
        return sendError(401, { success: false, error: "UserId doesn't match token" });
      }

      request.event.userId = data.userId;

      return request.response;
    } catch (error) {
      console.log(error);

      return sendError(401, { success: false, error: "Invalid or expired token" });
    }
  },
  onError: async (request) => {
    request.event.error = "401";
    return request.response;
  },
};

module.exports = { validateToken };
