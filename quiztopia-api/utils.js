const bcrypt = require("bcryptjs");

async function hashPassword(password) {
  const hashedPwd = await bcrypt.hash(password, 10);

  return hashedPwd;
}

async function comparePassword(password, hashedPwd) {
  const isMatch = await bcrypt.compare(password, hashedPwd);

  return isMatch ? true : false;
}

module.exports = { hashPassword, comparePassword };