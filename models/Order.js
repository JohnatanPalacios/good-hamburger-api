const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    sandwichId: {
      type: Schema.Types.ObjectId,
      ref: "Sandwich",
      required: true,
    },
    extras: [
      {
        type: Schema.Types.ObjectId,
        ref: "Extra",
        required: true,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

orderSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Order", orderSchema);
