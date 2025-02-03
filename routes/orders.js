/*
    Routs for sandwiches
    host + /api/orders
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { orderValidator } = require("../middlewares/validators/orders");

const router = Router();

const {
  listOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("./../controllers/orders");

router.get("/", listOrders);
router.post(
  "/",
  [
    check("sandwichId", "The sandwichId is required").not().isEmpty(),
    check("extras", "The extras must be an array").isArray(),
    orderValidator,
  ],
  createOrder
);
router.put(
  "/:id",
  [
    check("sandwichId", "The sandwichId is required").not().isEmpty(),
    check("extras", "The extras must be an array").isArray(),
    orderValidator,
  ],
  updateOrder
);
router.delete("/:id", deleteOrder);

module.exports = router;
