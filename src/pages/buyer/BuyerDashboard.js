import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './BuyerDashboard.css';

const BuyerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="buyer-dashboard">
      <div className="dashboard-header">
        <h1>Welcome to Your Dashboard, {user?.email}!</h1>
        <p>Start exploring amazing gifts and products</p>
      </div>
      
      <div className="dashboard-actions">
        <div className="action-card">
          <h3>Browse Products</h3>
          <p>Explore our wide range of products</p>
          <Link to="/products" className="action-btn">
            Shop Now
          </Link>
        </div>
        
        <div className="action-card">
          <h3>Your Cart</h3>
          <p>Review items in your shopping cart</p>
          <Link to="/cart" className="action-btn">
            View Cart
          </Link>
        </div>
        
        <div className="action-card">
          <h3>Order History</h3>
          <p>Track your previous orders</p>
          <Link to="/orders" className="action-btn">
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;