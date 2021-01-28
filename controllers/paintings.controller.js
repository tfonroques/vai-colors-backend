const bcrypt = require("bcrypt");
const { Painting, validatePainting } = require("../models/painting.model");
const _ = require("lodash");

module.exports.addPainting = async (req, res) => {
  const { error } = validatePainting(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let painting = await Painting.findOne({ title: req.body.title });
  if (painting) {
    return res.status(400).send("Painting with that title already exists");
  }

  painting = new Painting(
    _.pick(req.body, [
      "author",
      "title",
      "description",
      "original",
      "thumbnail",
      "date",
    ])
  );

  await painting.save();

  res.send(painting);
};

module.exports.updatePainting = async (req, res) => {
  const { error } = validatePainting(req.body.name);
  if (error) return res.status(400).send(error.details[0].message);

  const painting = await Painting.findById(req.params.id);
  if (!painting)
    return res.status(404).send("Painting with given ID could not be found.");

  painting.title = req.body.title;
  painting.author = req.body.author;
  painting.description = req.body.description;
  painting.original = req.body.original;
  painting.thumbnail = req.body.original;
  painting.date = req.body.date;
  await painting.save();

  res.send(painting);
};

module.exports.getPaintings = async (req, res) => {
  const paintings = await Painting.find({});
  res.send(paintings);
};

module.exports.getPaintingById = async (req, res) => {
  const painting = await Painting.find({ _id: req.params.id });
  console.log(painting);
  res.send(painting);
};

module.exports.deletePainting = async (req, res) => {
  const painting = await Painting.findByIdAndDelete(req.params.id);
  if (!painting)
    return res.status(404).send("Painting with given ID could not be found.");

  res.send(painting);
};
