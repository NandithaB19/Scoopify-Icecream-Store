import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../api/axios";

function Navbar({ cart, isLoggedIn, setIsLoggedIn }) {
  const [wishlistCount, setWishlistCount] = useState(0);
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) return;

        const res = await axios.get(`/api/wishlist?userId=${userId}`);

        setWishlistCount(res.data.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWishlist();

    const interval = setInterval(fetchWishlist, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");

    setIsLoggedIn(false);

    window.location.href = "/";
  };

  return (
    <div className="bg-pink-200 text-pink-600 p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
      <h1 className="text-xl font-bold">Scoopify 🍦</h1>

      <div className="space-x-6">
       <Link to="/" className="hover:underline">Home</Link>
       <Link to="/products" className="hover:underline">Products</Link>

        <Link to="/wishlist" className="hover:underline">
          Wishlist ❤️ ({wishlistCount})
        </Link>

        <Link to="/cart" className="hover:underline">
          Cart ({cart.length})
        </Link>

        <Link to="/orders" className="hover:underline">
          Recent Orders
        </Link>

        {!isLoggedIn && (
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        )}

        {!isLoggedIn && (
          <Link to="/register" className="hover:underline">
            Register
          </Link>
        )}

        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
