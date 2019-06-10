const { jwtVerify } = require("../lib/authentication");

module.exports.auth = (req, res, next) => {
  try {
    console.log("in auth");
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("acceso denegado");

    const decoded = jwtVerify(token, "testPassword");
    console.log(`decoded`);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (e) {
    next(e);
  }
};
