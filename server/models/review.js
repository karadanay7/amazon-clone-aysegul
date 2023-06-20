const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  rating: Number,
  photo: String,
  headline: String,
  body: String,
  productID: { type: Schema.Types.ObjectId, ref: "Product" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});
module.exports = mongoose.model("Review", ReviewSchema);
