const Wishlist = require("../models/Wishlist");

const addToWishlist = async (req, res) => {
  try {

    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: "Missing userId or productId" });
    }

    const existing = await Wishlist.findOne({
      user: userId,
      product: productId
    });

    if (existing) {
      return res.json(existing);
    }

    const item = new Wishlist({
      user: userId,
      product: productId
    });

    await item.save();

    res.json(item);

  } catch (error) {
    console.log("Wishlist error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getWishlist = async (req, res) => {
  try {

    const userId = req.query.userId;

    if (!userId) {
      return res.json([]);
    }

    const wishlist = await Wishlist.find({ user: userId })
      .populate("product");

    res.json(wishlist);

  } catch (error) {
    console.log("Wishlist fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addToWishlist,
  getWishlist
};