const Order = require("../models/Order");
const User = require("../models/User");
// orderController.js
const Stripe = require("stripe");
const dotenv = require("dotenv");
const currency = "usd";
const deliveryCharge = 10;
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { CartItems: items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
    };
    const newOrder = new Order(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency,
        product_data: { name: item.product?.name ?? item.name },
        unit_amount: Math.round((item.product?.price ?? item.price) * 100),
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency,
        product_data: { name: "Delivery Charges" },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.ORIGIN}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${process.env.ORIGIN}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyStripe = async (req, res) => {
  const userId = req.user.id; // FIX: was req.body.userId
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });

      await User.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await Order.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
async function allOrders(req, res) {
  try {
    const orders = await Order.find();

    res.status(201).json({ success: true, orders });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
async function myOrders(req, res) {
  const userId = req.user.id;
  try {
    const orders = await Order.find({ userId: userId });

    res.status(201).json({ success: true, orders });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
async function updateOrder(req, res) {
  const { status } = req.body;

  try {
    const order = await Order.findById(req.params.id);

    order.status = status;
    await order.save();

    return res.status(201).json({
      success: true,
      order,
      message: "succesfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function placeOrders(req, res) {
  const { CartItems, address, status, paid, paymentMethod, amount } = req.body;

  if (
    !CartItems ||
    CartItems.length === 0 ||
    !address ||
    paid === undefined ||
    !paymentMethod ||
    !amount
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const order = await Order.create({
      userId: req.user.id,
      items: CartItems,
      amount,
      address,
      status: status || "Order Placed",
      paid,
      paymentMethod,
    });

    return res.status(201).json({
      success: true,
      order,
      message: "Order placed successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  allOrders,
  updateOrder,
  placeOrders,
  myOrders,
  placeOrderStripe,
  verifyStripe,
};
