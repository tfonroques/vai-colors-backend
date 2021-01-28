const express = require("express");

const error = require("../middleware/error");

const home = require("../routes/home");
const auth = require("../routes/auth");
const users = require("../routes/users");
const paintings = require("../routes/paintings");
const about = require("../routes/about");

module.exports = function (app) {
  app.use(express.json());
  app.use("/", home);
  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/paintings", paintings);
  app.use("/api/about", about);
  app.use(error);
};
