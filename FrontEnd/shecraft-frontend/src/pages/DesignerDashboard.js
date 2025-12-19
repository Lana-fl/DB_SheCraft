import React, { useEffect, useState } from "react";
import "../styles/designerdashboard.css";

const DesignerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch orders for the logged-in designer
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const designerID = localStorage.getItem("designerID");
      if (!designerID) throw new Error("Designer not logged in");

      const res = await fetch(`http://localhost:5000/api/orders/customer/${designerID}`);
      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Mark an order as completed
  const completeOrder = async (orderID) => {
    try {
      const designerID = localStorage.getItem("designerID");
      if (!designerID) throw new Error("Designer not logged in");

      const res = await fetch(`http://localhost:5000/api/orders/${orderID}/complete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ designerID }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to complete order");
      }

      // Refresh orders after completing
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="designer-dashboard">
      <h1>Designer Dashboard</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer ID</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Order Date</th>
                <th>Completion Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderID}>
                  <td>{order.orderID}</td>
                  <td>{order.customerID}</td>
                  <td>{order.qty}</td>
                  <td>${order.price}</td>
                  <td
                    className={order.status === "completed" ? "status-completed" : "status-pending"}
                  >
                    {order.status}
                  </td>
                  <td>{new Date(order.orderDate).toLocaleString()}</td>
                  <td>{order.completionDate ? new Date(order.completionDate).toLocaleString() : "N/A"}</td>
                  <td>
                    {order.status === "pending" && (
                      <button
                        className="complete-btn"
                        onClick={() => completeOrder(order.orderID)}
                      >
                        Complete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DesignerDashboard;
