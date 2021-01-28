const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();

require("./initServer/routes")(app);
require("./initServer/db")();
require("./initServer/config")();

//middleware
app.use(morgan("dev"));
app.use(cookieParser());

//port
const port = process.env.PORT || 8000;
const server = app.listen(
  port,
  console.log(`Server is running on port${port}`)
);

module.exports = server;
