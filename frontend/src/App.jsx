import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Cart from "./pages/Cart";
import toast from "react-hot-toast";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import Success from "./pages/Success";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Footer from "./components/Footer";
import Wishlist from "./pages/Wishlist";
import Admin from "./pages/Admin";

function App() {

const [cart, setCart] = useState([]);

const userId = localStorage.getItem("userId");

useEffect(() => {
if (userId) {
const savedCart = localStorage.getItem(`cart_${userId}`);
if (savedCart) {
setCart(JSON.parse(savedCart));
}
}
}, [userId]);

const [isLoggedIn, setIsLoggedIn] = useState(
localStorage.getItem("isLoggedIn") === "true",
);

useEffect(() => {
if (userId) {
localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
}
}, [cart, userId]);

const addToCart = (product) => {
const existingIndex = cart.findIndex((item) => item._id === product._id);

if (existingIndex !== -1) {
const updatedCart = [...cart];
updatedCart[existingIndex].quantity += 1;
setCart(updatedCart);
} else {
setCart([...cart, { ...product, quantity: 1 }]);
}

toast.success("Added to cart 🛒");
};

const removeFromCart = (index) => {
const updatedCart = cart.filter((_, i) => i !== index);
setCart(updatedCart);
};

const increaseQty = (index) => {
const updatedCart = [...cart];
updatedCart[index].quantity += 1;
setCart(updatedCart);
};

const decreaseQty = (index) => {
const updatedCart = [...cart];

if (updatedCart[index].quantity > 1) {
updatedCart[index].quantity -= 1;
setCart(updatedCart);
}
};

return (
<div className="min-h-screen bg-pink-50 flex flex-col">
<Navbar
cart={cart}
isLoggedIn={isLoggedIn}
setIsLoggedIn={setIsLoggedIn}
/>
<Toaster position="top-right" />

<div className="flex-grow">
<Routes>
<Route path="/" element={<Home />} />
<Route
path="/products"
element={<Products addToCart={addToCart} />}
/>
<Route
path="/cart"
element={
<Cart
cart={cart}
setCart={setCart}
removeFromCart={removeFromCart}
increaseQty={increaseQty}
decreaseQty={decreaseQty}
/>
}
/>

<Route
path="/login"
element={<Login setIsLoggedIn={setIsLoggedIn} />}
/>

<Route path="/register" element={<Register />} />

<Route path="/orders" element={<Orders />} />

<Route path="/success" element={<Success />} />

<Route path="/wishlist" element={<Wishlist addToCart={addToCart} />} />

<Route path="/admin" element={<Admin />} />

</Routes>
</div>

<Footer />

</div>
);
}

export default App;