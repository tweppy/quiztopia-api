const { sendResponse, sendError } = require("../../responses/index");
const { db } = require("../../services/db");

exports.handler = async (event, context) => {
  try {
    // code

    return sendResponse(200, { success: true });
  } catch (error) {
    return sendError(500, { success: false, message: "Error" });
  }
};