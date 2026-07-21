const {
  addProduct,
  removeProducts,
  singleProduct,
  listProducts,
  getProductSearch,
} = require("../controllers/productController.js");
const express = require("express");
const upload = require("../middleware/multer.js");
const { register, login, logout } = require("../controllers/userController.js");
const adminAuth = require("../middleware/adminAuth.js");
const jwtProtection = require("../middleware/jwtProtection.js");

const router = express.Router();
router.get("/single/:id", singleProduct);

router.post("/list", listProducts);
router.post("/add", adminAuth, upload.array("images", 4), addProduct);
router.post("/search", getProductSearch);
router.delete("/remove/:id", adminAuth, removeProducts);

module.exports = router;
