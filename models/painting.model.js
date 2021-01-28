const Joi = require("joi");
const mongoose = require("mongoose");

const MIN_LENGTH_PASSWORD = 8;
const MAX_LENGTH = 100;

const paintingSchema = new mongoose.Schema({
  author: {
    type: String,
    maxlength: MAX_LENGTH,
  },
  title: {
    type: String,
    unique: true,
    maxlength: MAX_LENGTH,
  },
  description: {
    type: String,
    maxlength: MAX_LENGTH * 3,
  },
  original: String,
  date: {
    type: String,
  },
  thumbnail: String,
});

const Painting = mongoose.model("Painting", paintingSchema);

function validatePainting(req) {
  const schema = Joi.object({
    title: Joi.string().max(MAX_LENGTH),
    author: Joi.string().max(MAX_LENGTH),
    description: Joi.string().max(MAX_LENGTH * 3),
    original: Joi.string(),
    thumbnail: Joi.string(),
    date: Joi.string(),
  });

  return schema.validate(req);
}

exports.Painting = Painting;
exports.validatePainting = validatePainting;
