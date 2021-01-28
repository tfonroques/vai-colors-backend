const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const Joi = require("joi");

module.exports.signIn = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  res.send(token);
};

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().required().max(60).email(),
    password: Joi.string().required().min(8).max(60),
  });

  return schema.validate(req);
}
