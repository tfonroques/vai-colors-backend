const express = require("express");
const router = express.Router();
const {
  addAbout,
  updateAbout,
  getAbout,
} = require("../controllers/about.controller");
const auth = require("../middleware/auth");

router.post("/", auth, addAbout);

router.get("/", getAbout);

router.put("/:id", updateAbout);

module.exports = router;
