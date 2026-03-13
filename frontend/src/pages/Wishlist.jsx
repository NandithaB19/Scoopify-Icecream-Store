import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

function Wishlist({ addToCart }) {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`/api/wishlist?userId=${userId}`);
        setWishlist(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (id) => {
    try {
      await axios.delete(`/api/wishlist/${id}`);
      setWishlist((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-pink-600 mb-6">My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-full h-56 object-cover rounded-xl mb-4"
              />

              <h2 className="text-xl font-semibold">{item.product.name}</h2>

              <p className="text-gray-700 mb-3">₹ {item.product.basePrice}</p>

              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    addToCart({
                      ...item.product,
                      selectedToppings: [],
                    })
                  }
                  className="bg-white border border-yellow-500 text-black px-4 py-1 rounded hover:bg-yellow-50"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="border border-red-500 text-red-500 px-4 py-1 rounded hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
