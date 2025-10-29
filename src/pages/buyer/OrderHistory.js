import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import { useAuth } from '../../context/AuthContext';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      // Note: You'll need to get actual user ID from your backend
      // This is a placeholder - replace with actual user ID logic
      const userId = 1; // This should come from user context or API
      const response = await orderService.getUserOrders(userId);
      setOrders(response.data);
    } catch (error) {
      console.error('Error loading orders:', error);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'PENDING':
        return '#f39c12';
      case 'COMPLETED':
        return '#27ae60';
      case 'CANCELLED':
        return '#e74c3c';
      case 'SHIPPED':
        return '#3498db';
      default:
        return '#7f8c8d';
    }
  };

  if (loading) return <div className="loading">Loading orders...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="order-history">
      <h1>My Orders</h1>
      <p className="orders-subtitle">Track your order history and status</p>
      
      {orders.length === 0 ? (
        <div className="no-orders">
          <h3>No Orders Yet</h3>
          <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
          <button 
            onClick={() => window.location.href = '/products'}
            className="shop-now-btn"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">
                    {new Date(order.orderDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <span 
                  className="status"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status || 'PENDING'}
                </span>
              </div>
              
              <div className="order-details">
                <div className="detail-row">
                  <strong>Product ID:</strong>
                  <span>{order.productId}</span>
                </div>
                <div className="detail-row">
                  <strong>User ID:</strong>
                  <span>{order.userId}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;