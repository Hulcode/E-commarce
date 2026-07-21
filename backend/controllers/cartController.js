const User = require("../models/User");

async function addToCart(req, res) {
  const { productId, name, price, image, size } = req.body;

  if (!productId || !name || !price || !image || !size) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findById(req.user.id);

    const key = `${productId}_${size}`;

    if (user.cartData[key]) {
      user.cartData[key].quantity += 1;
    } else {
      user.cartData[key] = {
        quantity: 1,
        size,
        productId,
        product: {
          name,
          price,
          image,
        },
      };
    }

    user.markModified("cartData");
    await user.save();

    return res.status(201).json({
      success: true,
      cartData: user.cartData,
      message: "Successfully added to cart",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function updateCart(req, res) {
  const { quantity, id } = req.body;
  try {
    const result = await User.findOneAndUpdate(
      { _id: req.user.id, [`cartData.${id}`]: { $exists: true } },
      { $set: { [`cartData.${id}.quantity`]: quantity } },
      { new: true, select: "cartData" },
    );

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    return res.status(200).json({
      success: true,
      cartData: result.cartData,
      message: "success",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function deleteAll(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.cartData = {}; // full reassignment — Mongoose's setter picks this up automatically
    await user.save();

    return res.status(200).json({
      success: true,
      cartData: user.cartData,
      message: "Cart cleared successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
async function deleteItem(req, res) {
  const { id } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user.cartData[id]) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    delete user.cartData[id];

    // Tell Mongoose the object was modified
    user.markModified("cartData");

    await user.save();

    return res.status(200).json({
      success: true,
      cartData: user.cartData,
      message: "Item removed successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
async function getUserCart(req, res) {
  try {
    const user = await User.findById(req.user.id).select("cartData");
    return res.status(201).json({
      success: true,
      cartData: user.cartData,
      message: "succesfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = { addToCart, updateCart, getUserCart, deleteItem, deleteAll };
