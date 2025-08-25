import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    name: "",
    qty: "",
    price: "",
    mode: "BUY",
  });

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/allOrders");
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Create a new order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/newOrder", newOrder);
      setNewOrder({ name: "", qty: "", price: "", mode: "BUY" }); // reset form
      fetchOrders(); // refresh orders after placing new one
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  // Delete an order
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/order/${id}`);
      fetchOrders();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">🧾 Your Orders</h2>

      {/* Place New Order Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">Place New Order</h5>
          <form className="row g-3" onSubmit={handlePlaceOrder}>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Stock Symbol"
                value={newOrder.name}
                onChange={(e) => setNewOrder({ ...newOrder, name: e.target.value })}
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Quantity"
                value={newOrder.qty}
                onChange={(e) => setNewOrder({ ...newOrder, qty: e.target.value })}
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={newOrder.price}
                onChange={(e) => setNewOrder({ ...newOrder, price: e.target.value })}
                required
              />
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={newOrder.mode}
                onChange={(e) => setNewOrder({ ...newOrder, mode: e.target.value })}
              >
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
              </select>
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-success w-100">
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Orders History</h5>
          {orders.length === 0 ? (
            <p className="text-muted">No orders found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Stock</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Mode</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, idx) => (
                    <tr key={order._id}>
                      <td>{idx + 1}</td>
                      <td className="fw-bold">{order.name}</td>
                      <td>{order.qty}</td>
                      <td>₹{order.price}</td>
                      <td
                        style={{
                          color: order.mode === "BUY" ? "green" : "red",
                          fontWeight: "bold",
                        }}
                      >
                        {order.mode}
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(order._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
