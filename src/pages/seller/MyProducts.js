import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import { useAuth } from '../../context/AuthContext';
import './MyProducts.css';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      // In real app, get sellerId from user context
      const sellerId = 1; // This should come from user data
      const response = await productService.getProductsBySeller(sellerId);
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await productService.deleteProduct(productId);
      setProducts(products.filter(product => product.id !== productId));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  if (loading) return <div className="loading">Loading your products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="my-products">
      <div className="my-products-header">
        <h1>My Products</h1>
        <p>Manage your listed products and inventory</p>
      </div>

      {products.length === 0 ? (
        <div className="no-products">
          <div className="no-products-content">
            <h3>No Products Listed</h3>
            <p>You haven't listed any products yet. Start selling by adding your first product!</p>
            <button 
              onClick={() => window.location.href = '/add-product'}
              className="add-first-product-btn"
            >
              Add Your First Product
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="products-summary">
            <p>You have <strong>{products.length}</strong> product{products.length !== 1 ? 's' : ''} listed</p>
          </div>

          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  {product.imageURL ? (
                    <img src={product.imageURL} alt={product.name} />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>
                
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price.toFixed(2)}</p>
                  <p className="category">{product.category}</p>
                  <p className="description">{product.description}</p>
                  
                  <div className="product-actions">
                    <button className="edit-btn">
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteProduct(product.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyProducts;