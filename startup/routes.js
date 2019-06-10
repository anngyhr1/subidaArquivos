const bodyParser = require("body-parser");
const { routeUsuario } = require("../routes/user");
const { error } = require("../middleware/error");
const { response } = require("../middleware/response");
const { login } = require("../routes/login");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/user", routeUsuario);
  app.use("/login", login);
  app.use(response);
  app.use(error);
};
