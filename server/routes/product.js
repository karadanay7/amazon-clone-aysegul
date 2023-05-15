const router = require("express").Router();
const upload = require("../middleware/upload-photo");
const Product = require("../models/product");

// POST request to create a product
router.post("/products", upload.single("photo"), async (req, res) => {
  try {
    let product = new Product();
    product.category = req.body.category;
    product.owner = req.body.owner;
    product.title = req.body.title;
    product.price = req.body.price;
    product.stockQuantity = req.body.stockQuantity;
    product.description = req.body.description;
    product.photo = req.file.location;

    await product.save();
    res.json({
      status: true,
      message: "Successfully saved",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//  GET request  - get all products
router.get("/products", async (req, res) => {
  try {
    let products = await Product.find().populate("owner category").exec();
    res.json({
      success: true,
      products: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// GET request  - get a single product
router.get("/products/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id })
      .populate("owner category")
      .exec();
    res.json({
      success: true,
      product: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// DELETE  request  - delete a product
router.delete("/products/:id", async (req, res) => {
  try {
    let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });
    if (deletedProduct) {
      res.json({
        status: true,
        message: "Successfully deleted",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//  PUT     request  - update a product
router.put("/products/:id", upload.single("photo"), async (req, res) => {
  try {
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          category: req.body.categoryID,
          owner: req.body.ownerID,
          title: req.body.title,
          price: req.body.price,
          stockQuantity: req.body.stockQuantity,
          description: req.body.description,
          photo: req.file.location,
        },
      },
      { upsert: true }
    );
    res.json({
      success: true,
      updatedProduct: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
module.exports = router;
