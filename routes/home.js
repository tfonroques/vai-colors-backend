const express = require("express");
const router = express.Router();
const { hello } = require("../controllers/home.controller");

router.get("/", hello);

module.exports = router;
