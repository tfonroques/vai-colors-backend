const express = require("express");
const router = express.Router();
const {
  addPainting,
  updatePainting,
  getPaintings,
  getPaintingById,
  deletePainting,
} = require("../controllers/paintings.controller");
const auth = require("../middleware/auth");

router.post("/new-painting", auth, addPainting);

router.get("/", getPaintings);

router.put("/update-painting/:id", auth, updatePainting);
router.get("/:id", getPaintingById);

router.delete("/:id", deletePainting);

module.exports = router;
