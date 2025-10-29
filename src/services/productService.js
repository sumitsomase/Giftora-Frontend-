import api from './api';

export const productService = {
  getAllProducts: () => 
    api.get('/api/products'),
  
  getProductsBySeller: (sellerId) => 
    api.get(`/api/products/seller/${sellerId}`),
  
  addProduct: (productData) => 
    api.post('/api/products', productData),
  
  deleteProduct: (id) => 
    api.delete(`/api/products/${id}`),
};