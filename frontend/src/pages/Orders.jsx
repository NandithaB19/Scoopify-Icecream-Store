import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Orders() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

  const userEmail = localStorage.getItem("userEmail");

  const orders = allOrders
    .filter((order) => order.email === userEmail)
    .reverse();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Order History 📦</h1>

      {orders.length === 0 && <p className="mt-4">No orders yet</p>}

      {orders.map((order, index) => (
        <div key={index} className="border p-4 mt-4 rounded bg-white shadow">
          <p>
            <strong>Date:</strong> {order.date}
          </p>

          {order.items.map((item, i) => (
            <p key={i}>
              {item.name} x {item.quantity}
            </p>
          ))}

          <p className="font-bold mt-2">Total: ₹{order.total}</p>
        </div>
      ))}
    </div>
  );
}

export default Orders;
