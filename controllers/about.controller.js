const { About, validateAbout } = require("../models/about.model");
const _ = require("lodash");

module.exports.addAbout = async (req, res) => {
  const { error } = validateAbout(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  about = new About(_.pick(req.body, ["title", "description"]));

  await about.save();

  res.send(about);
};

module.exports.updateAbout = async (req, res) => {
  const { error } = validateAbout(req.body.name);
  if (error) return res.status(400).send(error.details[0].message);

  const about = await About.findById(req.params.id);
  if (!about)
    return res.status(404).send("About with given ID could not be found.");

  about.title = req.body.title;
  about.description = req.body.description;
  await about.save();

  res.send(about);
};

module.exports.getAbout = async (req, res) => {
  const about = await About.find({});
  res.send(about);
};
