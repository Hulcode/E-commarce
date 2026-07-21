const Product = require("../models/Product");
const cloudinary = require("cloudinary").v2;

async function getProductSearch(req, res) {
  const { search } = req.body;
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  try {
    if (typeof search !== "string" || !search.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid search term" });
    }
    const products = await Product.find({
      $or: [{ name: { $regex: escapeRegex(search.trim()), $options: "i" } }],
    });
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }
    res.status(201).json({ success: true, products });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
async function addProduct(req, res) {
  const {
    name,
    description,
    price,

    category,
    subCategory,

    sizes,
    bestSeller,
  } = req.body;

  if (
    !name ||
    !description ||
    !price ||
    !category ||
    !subCategory ||
    sizes === []
  ) {
    return res.status(400).json({
      success: false,
      message: "all feildes are required",
    });
  }

  try {
    const imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });

        imageUrls.push(result.secure_url);
      }
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller,
      images: imageUrls || [],
    });

    return res.status(201).json({
      success: true,
      product,
      message: "succesfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function removeProducts(req, res) {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();
    return res.status(201).json({
      success: true,
      product,
      message: "succesfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function singleProduct(req, res) {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }
    res.status(201).json({ success: true, product });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function listProducts(req, res) {
  const { subCategory, category, order } = req.body;

  try {
    const query = {};
    if (subCategory?.length) query.subCategory = { $in: subCategory };
    if (category?.length) query.category = { $in: category };

    let dbQuery = Product.find(query);
    if (order && order !== "relevant") dbQuery = dbQuery.sort({ price: order });

    const products = await dbQuery;
    res.status(200).json({ success: true, products });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  addProduct,
  removeProducts,
  singleProduct,
  listProducts,
  getProductSearch,
};
