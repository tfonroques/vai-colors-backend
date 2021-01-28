module.exports = function (err, req, res, next) {
  if (err) res.status(500).send("Somehing went wrong");
  console.log("Something went wrong");
};
