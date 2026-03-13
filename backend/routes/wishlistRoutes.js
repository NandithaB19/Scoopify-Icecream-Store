const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");

const {
  addToWishlist,
  getWishlist
} = require("../controllers/wishlistController");

router.post("/", addToWishlist);
router.get("/", getWishlist);


router.delete("/:id", async (req, res) => {
  try {

    await Wishlist.findByIdAndDelete(req.params.id);

    res.json({ message: "Item removed from wishlist" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error removing item" });
  }
});

router.post("/toggle", async (req, res) => {
  try {

    const { userId, productId } = req.body;

    const existing = await Wishlist.findOne({
      user: userId,
      product: productId
    });

    if (existing) {
      await Wishlist.findByIdAndDelete(existing._id);
      return res.json({ message: "Removed from wishlist" });
    }

    const item = new Wishlist({
      user: userId,
      product: productId
    });

    await item.save();

    res.json({ message: "Added to wishlist" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;