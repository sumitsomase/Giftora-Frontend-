import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './SellerDashboard.css';

const SellerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="seller-dashboard">
      <div className="dashboard-header">
        <h1>Seller Dashboard</h1>
        <p>Welcome, {user?.email}! Manage your products and grow your business.</p>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-number">0</p>
          <p className="stat-label">Listed items</p>
        </div>
        
        <div className="stat-card">
          <h3>Orders</h3>
          <p className="stat-number">0</p>
          <p className="stat-label">Total orders</p>
        </div>
        
        <div className="stat-card">
          <h3>Revenue</h3>
          <p className="stat-number">$0.00</p>
          <p className="stat-label">Total earnings</p>
        </div>
      </div>
      
      <div className="dashboard-actions">
        <div className="action-card">
          <div className="action-icon">➕</div>
          <h3>Add New Product</h3>
          <p>List a new product for sale in the marketplace</p>
          <Link to="/add-product" className="action-btn">
            Add Product
          </Link>
        </div>
        
        <div className="action-card">
          <div className="action-icon">📦</div>
          <h3>My Products</h3>
          <p>Manage your existing products and inventory</p>
          <Link to="/my-products" className="action-btn">
            View Products
          </Link>
        </div>
        
        <div className="action-card">
          <div className="action-icon">📊</div>
          <h3>Sales Analytics</h3>
          <p>View your sales performance and insights</p>
          <button className="action-btn disabled" disabled>
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;