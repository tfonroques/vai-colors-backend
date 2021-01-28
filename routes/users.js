const express = require("express");
const router = express.Router();
const { signUp, getMyInfo } = require("../controllers/users.controller");
const auth = require("../middleware/auth");
const { User } = require("../models/user.model");

router.post("/signUp", signUp);

router.get("/me", auth, getMyInfo);

router.get("/", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

module.exports = router;
