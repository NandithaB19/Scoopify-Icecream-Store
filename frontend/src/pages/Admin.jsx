import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function Admin() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {

    const isAdmin = localStorage.getItem("isAdmin");

    if (!isAdmin) {
      navigate("/");
      return;
    }

    fetchProducts();
    fetchOrders();

  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  };

  const addProduct = async () => {

    if (!name || !price || !image) {
      alert("Please fill all fields");
      return;
    }

    try {

      await axios.post("/api/products", {
        name,
        basePrice: price,
        image
      });

      alert("Product added successfully!");

      setName("");
      setPrice("");
      setImage("");

      fetchProducts();

    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {

    try {

      await axios.delete(`/api/products/${id}`);

      fetchProducts();

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="p-6 max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Scoopify Admin Panel 🛠️
      </h1>

      <div className="flex gap-4 mb-6">

        <button
          onClick={() => setActiveTab("products")}
          className="bg-pink-500 text-white px-4 py-2 rounded"
        >
          Manage Products
        </button>

        <button
          onClick={() => setActiveTab("add")}
          className="bg-pink-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className="bg-pink-500 text-white px-4 py-2 rounded"
        >
          View Orders
        </button>

      </div>


      {activeTab === "add" && (

        <div className="bg-white p-6 rounded-xl shadow max-w-md">

          <h2 className="text-xl font-semibold mb-4">
            Add New Ice Cream
          </h2>

          <input
            type="text"
            placeholder="Product Name"
            className="border p-2 w-full mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            className="border p-2 w-full mb-3"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="text"
            placeholder="Image URL"
            className="border p-2 w-full mb-3"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <button
            onClick={addProduct}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            Add Product
          </button>

        </div>

      )}


      {activeTab === "products" && (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {products.map((product) => (

            <div
              key={product._id}
              className="bg-white p-4 rounded-xl shadow"
            >

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg"
              />

              <h2 className="text-lg font-semibold mt-2">
                {product.name}
              </h2>

              <p>₹ {product.basePrice}</p>

              <button
                onClick={() => deleteProduct(product._id)}
                className="mt-3 border border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-50"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      )}


      {activeTab === "orders" && (

        <div className="space-y-4">

          {orders.length === 0 && <p>No orders yet.</p>}

          {orders.map((order, index) => (

            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow"
            >

              <p className="font-semibold">
                Order Date: {order.date}
              </p>

              <p>Email: {order.email}</p>

              <p>Total: ₹ {order.total}</p>

              <p className="mt-2 font-medium">
                Items:
              </p>

              {order.items.map((item, i) => (
                <p key={i}>
                  {item.name} × {item.quantity}
                </p>
              ))}

            </div>

          ))}

        </div>

      )}

    </div>

  );
}

export default Admin;