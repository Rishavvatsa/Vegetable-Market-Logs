const mongoose = require('mongoose');
const express = require("express");
const ObjectId=require("mongodb")
const app = express();
app.use(express.json());
const orderSchema = new mongoose.Schema({
  userId: {
    _id:ObjectId,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model, assuming you have a User model
    required: true,
  },
  products: [
    { 
      
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model, assuming you have a Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Pending'], // You can define other status values as needed
    default: 'Pending', // Set the default status
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
