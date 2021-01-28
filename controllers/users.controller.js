const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/user.model");
const _ = require("lodash");

module.exports.signUp = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("user already exists");
  }

  user = new User(_.pick(req.body, ["username", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email"]));
};

module.exports.getMyInfo = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
};
