const mongoose = require("mongoose");

const schemaProduct = mongoose.Schema({
  product_id: { type: String, unique: true },
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  category: String,
  image: String,
  price: String,
  Stock: {
    type: String,
    required: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 0,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("product", schemaProduct);
