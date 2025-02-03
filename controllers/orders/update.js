const path = require('path');
const { response } = require("express");

const Order = require(path.resolve('./models/Order'));
const { calculateTotal } = require("./calculateTotal");

const updateOrder = async (req, res = response) => {
  try {
    const { sandwichId, extras } = req.body;
    const { total, discount } = await calculateTotal({ sandwichId, extras });
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        sandwichId,
        extras,
        totalAmount: total,
        discount: discount,
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { updateOrder };
