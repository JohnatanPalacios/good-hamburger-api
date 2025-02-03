const path = require('path');
const { response } = require('express');

const Order = require(path.resolve('./models/Order'));


const listOrders =  async (req, res = response) => {
    try {
      const orders = await Order.find().sort('-createdAt');
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


module.exports = { listOrders };