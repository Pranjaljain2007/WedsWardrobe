import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import './Orders.css'; // optional styling

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        const token = await user.getIdToken();
        const res = await axios.get('${import.meta.env.VITE_BACKEND_URL}/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setOrders(res.data.orders);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="orders-container">
      <h2>MY ORDERS</h2>
      {orders.length === 0 ? (
        <div className="empty-orders">
          <p>No orders placed yet</p>
          <button className="continue-btn2" onClick={() => window.location.href = "/"}>
            CONTINUE SHOPPING
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div key={index} className="order-card">
              <p><strong>Order #{index + 1}</strong> - {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Status: {order.status}</p>
              <p>Total: ₹{order.totalAmount}</p>
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>{item.name} × {item.quantity}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
