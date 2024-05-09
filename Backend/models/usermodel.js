const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,

  image: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  phone: { type: String },
});

module.exports = mongoose.model("user", userSchema);
