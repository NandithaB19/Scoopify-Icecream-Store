import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState({});
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  const toggleWishlist = async (productId) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/login");
      return;
    }

    try {
      await axios.post("/api/wishlist/toggle", {
        userId,
        productId,
      });


      if (wishlistItems.includes(productId)) {
        setWishlistItems(wishlistItems.filter((id) => id !== productId));
      } else {
        setWishlistItems([...wishlistItems, productId]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTopping = (productId, topping) => {
    setSelectedToppings((prev) => {
      const current = prev[productId] || [];

      const exists = current.find((t) => t._id === topping._id);

      let updated;

      if (exists) {
        updated = current.filter((t) => t._id !== topping._id);
      } else {
        updated = [...current, topping];
      }

      return {
        ...prev,
        [productId]: updated,
      };
    });
  };

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) return;

        const res = await axios.get(`/api/wishlist?userId=${userId}`);

        const ids = res.data.map((item) => item.product._id);

        setWishlistItems(ids);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-6">
        Scoopify Ice Creams 🍨
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover rounded-xl mb-4"
            />

            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">₹ {product.basePrice}</p>

            <p className="mt-2 font-medium">Toppings:</p>

            {product.toppings.map((topping) => (
              <label key={topping._id} className="block">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={() => toggleTopping(product._id, topping)}
                />
                {topping.name} (+₹{topping.price})
              </label>
            ))}

            <div className="flex items-center mt-3 gap-2">
              <button
                onClick={() => {
                  const userId = localStorage.getItem("userId");

                  if (!userId) {
                    navigate("/login");
                    return;
                  }

                  addToCart({
                    ...product,
                    selectedToppings: selectedToppings[product._id] || [],
                  });
                }}
                className="bg-white border border-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-50"
              >
                Add to Cart
              </button>

              <button
                onClick={() => toggleWishlist(product._id)}
                className="text-2xl hover:scale-110 hover:text-red-500 transition transform duration-150"
              >
                {wishlistItems.includes(product._id) ? "❤️" : "🤍"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;