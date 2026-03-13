const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  toppings: [
    {
      name: String,
      price: Number,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);