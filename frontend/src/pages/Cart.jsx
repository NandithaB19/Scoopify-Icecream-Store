import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Cart({ cart, setCart, removeFromCart, increaseQty, decreaseQty }) {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const total = cart.reduce((sum, item) => {
    const toppingsTotal = item.selectedToppings
      ? item.selectedToppings.reduce((tSum, t) => tSum + t.price, 0)
      : 0;

    return sum + (item.basePrice + toppingsTotal) * item.quantity;
  }, 0);

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      items: cart,
      total: total,
      date: new Date().toLocaleString(),
      email: localStorage.getItem("userEmail"),
    };

    existingOrders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(existingOrders));

    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));

    navigate("/success");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Cart 🛒</h1>

      {cart.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-semibold mb-4">
            Your cart is empty 🛒
          </h2>

          <button
            onClick={() => navigate("/products")}
            className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
          >
            Browse Ice Creams
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            {cart.map((item, index) => {
              const toppingsTotal = item.selectedToppings
                ? item.selectedToppings.reduce((tSum, t) => tSum + t.price, 0)
                : 0;

              const subtotal =
                (item.basePrice + toppingsTotal) * item.quantity;

              return (
                <div
                  key={index}
                  className="flex items-center gap-6 bg-white p-4 rounded-xl shadow mb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">
                      {item.name}
                    </h2>

                    <p className="text-gray-600">
                      ₹ {item.basePrice}
                    </p>

                    {item.selectedToppings &&
                      item.selectedToppings.map((topping, i) => (
                        <p key={i} className="text-sm text-gray-500">
                          + {topping.name}
                        </p>
                      ))}

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQty(index)}
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                      >
                        -
                      </button>

                      <span className="font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(index)}
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(index)}
                      className="mt-3 border border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="font-semibold text-lg">
                    ₹ {subtotal}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white p-6 rounded-xl shadow w-full md:w-72 h-fit">
            <h2 className="text-xl font-bold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-2">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between font-semibold text-lg mb-4">
              <span>Total</span>
              <span>₹ {total}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;