const jwt = require("jsonwebtoken");
const { error } = require("../middleware/error");

module.exports.jwtSign = payload => {
  try {
    console.log("payload");
    console.log(payload);
    return jwt.sign( payload, "passwordTest");
  } catch (e) {
    throw error(e);
  }
};

module.exports.jwtVerify = token => {
  try {
    const decoded = jwt.verify(token, "passwordTest");
    return decoded;
  } catch (e) {
    throw error(e); 
  }
};