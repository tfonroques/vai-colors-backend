const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  const db = config.get("db");
  const mongoConnectionString = db;

  mongoose
    .connect(mongoConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log(`Successfully connected to ${db} !`));
};
