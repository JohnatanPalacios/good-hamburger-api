const path = require('path');
const { response } = require('express');

const Order = require(path.resolve('./models/Order'));


const deleteOrder = async (req, res = response) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


module.exports = { deleteOrder };
