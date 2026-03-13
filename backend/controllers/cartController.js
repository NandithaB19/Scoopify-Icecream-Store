const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.addToCart = async (req, res) => {
  try {
    const { productId, toppings } = req.body;

    const product = await Product.findById(productId);

    const selectedToppings = product.toppings.filter(t =>
      toppings.includes(t.name)
    );

    const toppingsTotal = selectedToppings.reduce(
      (sum, t) => sum + t.price,
      0
    );

    const totalPrice = product.basePrice + toppingsTotal;

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [],
      });
    }

    cart.items.push({
      product: product._id,
      selectedToppings,
      totalPrice,
    });

    await cart.save();

    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};