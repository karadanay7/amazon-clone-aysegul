const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const algoliasearch = require("algoliasearch");
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_SECRET
);
const index = client.initIndex(process.env.ALGOLIA_INDEX);

const ProductSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  owner: { type: Schema.Types.ObjectId, ref: "Owner" },
  title: String,
  price: Number,
  stockQuantity: Number,
  description: String,
  photo: String,
  rating: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

ProductSchema.post("save", function (doc) {
  // When a new product is saved, update its data in Algolia index
  index.saveObject({
    objectID: doc._id.toString(),
    title: doc.title,
    // Add other relevant fields to be indexed
  });
});

ProductSchema.post("remove", function (doc) {
  // When a product is removed, delete it from Algolia index
  index.deleteObject(doc._id.toString());
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
