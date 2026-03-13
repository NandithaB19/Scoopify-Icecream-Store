const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    const order = await Order.create({
      user: req.user.id,
      items: cart.items,
      totalAmount,
    });

    cart.items = [];
    await cart.save();

    res.json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};