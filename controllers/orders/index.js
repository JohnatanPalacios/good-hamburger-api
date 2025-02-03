const { listOrders } = require('./list');
const { createOrder } = require('./create');
const { updateOrder } = require('./update');
const { deleteOrder } = require('./delete');

module.exports = {
  listOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};