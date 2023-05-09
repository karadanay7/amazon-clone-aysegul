const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  type: { type: String, unique: true },
});
module.exports = mongoose.model("Category", CategorySchema);
