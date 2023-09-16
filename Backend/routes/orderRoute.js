// Import necessary libraries and models
const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

// Create a route for creating an order
router.post('/create-order', async (req, res) => {
  try {
    // Extract the user ID and cart items from the request body
    const { userId, products, totalAmount } = req.body;
console.log(products)
    // Create a new order document
    const order = new Order({
      userId,
      products,
      totalAmount,
      paymentStatus: 'Paid', // You can set the initial payment status here
    });
 console.log(order);
    // Save the order to MongoDB
    await order.save();

    // You can also update other relevant information or trigger any necessary actions here

    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

module.exports = router;
