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

      const res = await fetch(`/api/orders/customer/${designerID}`);
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

  const completeOrder = async (orderID) => {
    try {
      const designerID = localStorage.getItem("designerID");

      const res = await fetch(`/api/orders/${orderID}/complete`, {
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
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Qty</th>
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
                <td>{order.price}</td>
                <td>{order.status}</td>
                <td>{order.orderDate}</td>
                <td>{order.completionDate || "N/A"}</td>
                <td>
                  {order.status === "pending" && (
                    <button onClick={() => completeOrder(order.orderID)}>
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DesignerDashboard;
