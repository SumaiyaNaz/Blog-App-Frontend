import api from './api';

export const authService = {
  register: async (data) => {
    const response = await api.post('/auth/user', data);
    return response.data;
  },
  login: async (data) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
  getProfile: async (id) => {
    const response = await api.get(`/auth/user/${id}`);
    return response.data;
  },
  updateProfile: async (id, data) => {
    const response = await api.put(`/auth/user/${id}`, data);
    return response.data;
  }
};