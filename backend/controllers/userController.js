const User = require("../models/User");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const maxAge = 24 * 60 * 60 * 3;
const generateToken = (id, isAdmin = false) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_AUTH, { expiresIn: maxAge });
};
async function register(req, res) {
  const { email, password, name } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "all fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email is already used",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });
    const { password: _, ...userData } = newUser.toObject();
    const accessToken = generateToken(newUser._id);

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });
    res.status(200).json({
      ...userData,
      success: true,
      accessToken: accessToken,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "all fields are required", success: false });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Not found",
      });
    }

    if (!(await user.comparePassword(password))) {
      return res
        .status(400)
        .json({ message: "Invalid password", success: false });
    }

    const { password: _, ...userData } = user.toObject();
    const accessToken = generateToken(user._id);

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    res.status(200).json({
      userData,
      accessToken: accessToken,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
async function logout(req, res) {
  res.clearCookie("jwt");

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
}
async function me(req, res) {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    user,
    message: "successfully",
  });
}
async function adminLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "all fields are required", success: false });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Not found",
      });
    }

    if (!(await user.comparePassword(password))) {
      return res
        .status(400)
        .json({ message: "Invalid password", success: false });
    }
    if (!user.isAdmin) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
    const { password: _, ...userData } = user.toObject();
    const accessToken = generateToken(user._id, true);

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    res.status(200).json({
      userData,
      accessToken: accessToken,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
module.exports = {
  register,
  login,
  logout,
  adminLogin,
  me,
};
