const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        quantity: { type: Number },
        product: {
          price: { type: Number },
          name: { type: String },
          image: { type: String },
        },
        size: { type: String },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object },
    status: {
      type: String,
      default: "Order Placed",
      enum: [
        "Order Placed",
        "Packing",
        "Shipped",
        "Out for delivery",
        "Delivered",
      ],
    },
    paid: { type: Boolean, default: false },
    paymentMethod: {
      type: String,
      default: "COD",
      enum: ["Stripe", "Razorpay", "COD"],
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
