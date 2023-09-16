const Order = require('../models/orderModel');
const Product=require("../models/ProductModel");
// Create a new order
exports.createOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    const doc = await order.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};
// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort('-createdAt');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

// Get orders by user ID
exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId }).sort('-createdAt');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders for user' });
  }
};
