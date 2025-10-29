import api from './api';

export const userService = {
  getUserByEmail: (email) => 
    api.get(`/api/users/${email}`),
  
  getAllUsers: () => 
    api.get('/api/users'),
};