const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
try {

const { name, basePrice, image } = req.body;

const product = new Product({
name,
basePrice,
image
});

await product.save();

res.json({ message: "Product added successfully" });

} catch (error) {
res.status(500).json({ message: "Failed to add product" });
}
};

exports.getProducts = async (req, res) => {
try {

const products = await Product.find();
res.json(products);

} catch (error) {
res.status(500).json({ message: "Failed to fetch products" });
}
};

exports.deleteProduct = async (req, res) => {
try {

await Product.findByIdAndDelete(req.params.id);

res.json({ message: "Product deleted successfully" });

} catch (error) {
res.status(500).json({ message: "Failed to delete product" });
}
};