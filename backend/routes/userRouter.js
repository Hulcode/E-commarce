const express = require("express");
// const upload = require("../middleware/multer.js");
const {
  register,
  login,
  logout,
  adminLogin,
  me,
} = require("../controllers/userController.js");
const jwtCheck = require("../middleware/jwtProtection.js");

const router = express.Router();
router.post("/signup", register);
router.get("/me", jwtCheck, me);
router.post("/login", login);
router.post("/login/admin", adminLogin);
router.post("/logout", logout);

module.exports = router;
