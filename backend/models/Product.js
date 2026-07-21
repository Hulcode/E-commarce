const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 100 },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [
      {
        type: String,
        validate: {
          validator: (v) => v.length > 0,
        },
      },
    ],
    category: {
      type: String,
      required: true,
      enum: ["Men", "Women", "Kids"],
    },
    subCategory: {
      type: String,
      required: true,
      enum: ["Topwear", "Bottomwear", "Winterwear"],
    },
    sizes: [
      { type: String, required: true, enum: ["S", "M", "L", "XL", "XXL"] },
    ],
    bestSeller: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
