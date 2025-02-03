const path = require('path');
const { response } = require("express");
const Order = require(path.resolve('./models/Order'));
const { calculateTotal } = require("./calculateTotal");

const createOrder = async (req, res = response) => {
    try {
        const { sandwichId, extras } = req.body;
        const { total, discount } = await calculateTotal({ sandwichId, extras });
        const order = new Order({
            sandwichId,
            extras,
            totalAmount: total,
            discountPercentage: discount
        });

        await order.save();

        res.status(201).json(order);
    } catch (error) {
        console.error("Error al crear la orden:", error);
        res.status(400).json({ 
            error: error.message 
        });
    }
};

module.exports = { createOrder };