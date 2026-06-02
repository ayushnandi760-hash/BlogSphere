import api from './api';

const blogService = {
  getAllBlogs: async () => {
    const response = await api.get('/blogs');
    return response.data; // List of BlogDTOs
  },

  getBlogById: async (id) => {
    const response = await api.get(`/blogs/${id}`);
    return response.data; // BlogDTO
  },

  createBlog: async (title, content, category, coverImage) => {
    const payload = { title, content, category };
    if (coverImage && coverImage.trim() !== '') {
      payload.coverImage = coverImage;
    }
    const response = await api.post('/blogs', payload);
    return response.data; // Created BlogDTO
  },

  updateBlog: async (id, title, content, category, coverImage) => {
    const payload = { title, content, category };
    if (coverImage && coverImage.trim() !== '') {
      payload.coverImage = coverImage;
    }
    const response = await api.put(`/blogs/${id}`, payload);
    return response.data; // Updated BlogDTO
  },

  deleteBlog: async (id) => {
    const response = await api.delete(`/blogs/${id}`);
    return response.data; // MessageResponse
  },

  searchBlogs: async (keyword) => {
    const response = await api.get(`/blogs/search?keyword=${encodeURIComponent(keyword)}`);
    return response.data; // Filtered List of BlogDTOs
  },

  getBlogsByAuthor: async (authorId) => {
    const response = await api.get(`/blogs/author/${authorId}`);
    return response.data; // List of BlogDTOs written by specified author
  },
};

export default blogService;
