const express = require("express");
const router = express.Router();
const {
  getAllTypes,
  updateType,
  addType,
  deleteType,
} = require("../controllers/appointmentsTypesController");

//GET ALL TYPES
router.get("/", getAllTypes);

//UPDATE TYPE
router.patch("/:typeId", updateType);

//ADD TYPE
router.post("/", addType);

//DELETE TYPE
router.delete("/:typeId", deleteType);

module.exports = router;
