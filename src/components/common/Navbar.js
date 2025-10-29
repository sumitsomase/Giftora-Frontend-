import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Giftora</Link>
      </div>
      
      <div className="nav-links">
        {user ? (
          <>
            <span className="welcome">Welcome, {user.email} ({user.role})</span>
            
            {user.role === 'BUYER' && (
              <>
                <Link to="/buyer-dashboard">Dashboard</Link>
                <Link to="/products">Products</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/orders">My Orders</Link>
              </>
            )}
            
            {user.role === 'SELLER' && (
              <>
                <Link to="/seller-dashboard">Dashboard</Link>
                <Link to="/add-product">Add Product</Link>
                <Link to="/my-products">My Products</Link>
              </>
            )}
            
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;