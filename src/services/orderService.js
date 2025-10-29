import api from './api';

export const orderService = {
  createOrder: (orderData) => 
    api.post('/api/orders', orderData),
  
  getUserOrders: (userId) => 
    api.get(`/api/orders/user/${userId}`),
};