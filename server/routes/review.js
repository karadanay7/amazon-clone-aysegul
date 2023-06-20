const router = require("express").Router();
const Review = require("../models/review");
const Product = require("../models/product");
const verifyToken = require("../middleware/verify-token");
const upload = require("../middleware/upload-photo");

// Post review
router.post(
  "/reviews/:productID",
  [verifyToken, upload.single("photo")],
  async (req, res) => {
    try {
      const review = new Review();
      review.rating = req.body.rating;
      review.photo = req.file.location;
      review.headline = req.body.headline;
      review.body = req.body.body;
      review.productID = req.params.productID;
      review.user = req.decoded._id;

      await Product.update({ $push: { reviews: review._id } });
      const savedReview = await review.save();

      if (savedReview) {
        res.json({
          status: true,
          message: "Successfully Added Review!",
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);

// Get reviews
router.get("/reviews/:productID", async (req, res) => {
  try {
    const productReviews = await Review.find({
      productID: req.params.productID,
    })
      .populate("user")
      .exec();

    res.json({
      success: true,
      reviews: productReviews,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
