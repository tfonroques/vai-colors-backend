const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const MIN_LENGTH_PASSWORD = 8;
const MAX_LENGTH = 100;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: MAX_LENGTH,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      maxlength: MAX_LENGTH,
    },
    password: {
      type: String,
      required: true,
      minlength: MIN_LENGTH_PASSWORD,
      maxlength: MAX_LENGTH,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
    isAdmin: Boolean,
  },
  { timestamp: true }
);

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, username: this.username, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("User", userSchema);

function validateUser(req) {
  const schema = Joi.object({
    username: Joi.string().required().max(MAX_LENGTH),
    email: Joi.string().required().max(MAX_LENGTH).email(),
    password: Joi.string().required().min(MIN_LENGTH_PASSWORD).max(MAX_LENGTH),
  });

  return schema.validate(req);
}

exports.User = User;
exports.validateUser = validateUser;
