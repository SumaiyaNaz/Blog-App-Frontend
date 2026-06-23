import api from './api';

export const blogService = {
  getAllBlogs: async () => {
    const response = await api.get('/blog/');
    return response.data;
  },
  getBlogById: async (id) => {
    const response = await api.get(`/blog/${id}`);
    return response.data;
  },
  getUserBlogs: async () => {
  
    const response = await api.get('/blog/my-blogs');
    return response.data;
  },
  createBlog: async (formData) => {
    const response = await api.post('/blog/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  updateBlog: async (id, formData) => {
    const response = await api.put(`/blog/update/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  deleteBlog: async (id) => {
    const response = await api.delete(`/blog/delete/${id}`);
    return response.data;
  }
};