const Joi = require("joi");
const mongoose = require("mongoose");

const MIN_LENGTH_PASSWORD = 8;
const MAX_LENGTH = 1000;

const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 50,
  },
  description: {
    type: String,
    unique: true,
    maxlength: MAX_LENGTH,
  },
});

const About = mongoose.model("About", aboutSchema);

function validateAbout(req) {
  const schema = Joi.object({
    title: Joi.string().max(50).required(),
    description: Joi.string().max(MAX_LENGTH).required(),
  });

  return schema.validate(req);
}

exports.About = About;
exports.validateAbout = validateAbout;
