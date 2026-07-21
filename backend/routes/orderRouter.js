const express = require("express");
const adminAuth = require("../middleware/adminAuth.js");
const jwtCheck = require("../middleware/jwtProtection.js");
const {
  allOrders,
  updateOrder,
  placeOrders,
  myOrders,
  placeOrderStripe,
  verifyStripe,
} = require("../controllers/orderController.js");

const router = express.Router();
router.get("/list", adminAuth, allOrders);
router.get("/my", jwtCheck, myOrders);
router.post("/place", jwtCheck, placeOrders);
router.post("/place_stripe", jwtCheck, placeOrderStripe);
router.post("/verifyStripe", jwtCheck, verifyStripe);
router.put("/status/:id", adminAuth, updateOrder);
module.exports = router;
