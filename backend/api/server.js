const userRouter = require("../routes/userRouter");
const productRouter = require("../routes/productRouter");
const cartRouter = require("../routes/cartRouter");
const orderRouter = require("../routes/orderRouter");
const cookieParser = require("cookie-parser");

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const mongoose = require("mongoose");
const connectDB = require("../config/DB");
const connectCloudinary = require("./config/cloudinary");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.ORIGIN, process.env.ADMIN], // e.g. "http://localhost:5173"

    credentials: true,
  }),
);
(async () => {
  await connectDB();
  connectCloudinary();
})();

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

module.exports = app;
