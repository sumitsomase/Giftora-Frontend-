import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import SellerDashboard from './pages/seller/SellerDashboard';
import ProductCatalog from './pages/buyer/ProductCatalog';
import Cart from './pages/buyer/Cart';
import OrderHistory from './pages/buyer/OrderHistory';
import AddProduct from './pages/seller/AddProduct';
import MyProducts from './pages/seller/MyProducts';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Buyer Routes */}
              <Route path="/buyer-dashboard" element={
                <ProtectedRoute requiredRole="BUYER">
                  <BuyerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/products" element={
                <ProtectedRoute requiredRole="BUYER">
                  <ProductCatalog />
                </ProtectedRoute>
              } />
              <Route path="/cart" element={
                <ProtectedRoute requiredRole="BUYER">
                  <Cart />
                </ProtectedRoute>
              } />
              <Route path="/orders" element={
                <ProtectedRoute requiredRole="BUYER">
                  <OrderHistory />
                </ProtectedRoute>
              } />
              
              {/* Seller Routes */}
              <Route path="/seller-dashboard" element={
                <ProtectedRoute requiredRole="SELLER">
                  <SellerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/add-product" element={
                <ProtectedRoute requiredRole="SELLER">
                  <AddProduct />
                </ProtectedRoute>
              } />
              <Route path="/my-products" element={
                <ProtectedRoute requiredRole="SELLER">
                  <MyProducts />
                </ProtectedRoute>
              } />
              
              {/* Default Route */}
              <Route path="/" element={<Navigate to="/login" />} />
              
              {/* Fallback */}
              <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;