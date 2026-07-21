const express = require("express");
const jwtCheck = require("../middleware/jwtProtection.js");
const {
  addToCart,
  updateCart,
  getUserCart,
  deleteItem,
  deleteAll,
} = require("../controllers/cartController.js");

const router = express.Router();

router.get("/get", jwtCheck, getUserCart);
router.post("/add", jwtCheck, addToCart);
router.post("/update", jwtCheck, updateCart);
router.delete("/delete", jwtCheck, deleteItem);
router.delete("/delete-all", jwtCheck, deleteAll);

module.exports = router;
