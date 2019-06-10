const express = require("express");
const routes = require("./startup/routes");
const {handlePromiseRejection} = require("./startup/winston");

const app = express();
routes(app);
handlePromiseRejection();

app.listen(3000, () => console.log("listening in port 3000"));
