import api from './api';

const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data; // Returns User session payload: token, id, name, email, role, profileImage
  },

  register: async (name, email, password, profileImage) => {
    const payload = { name, email, password };
    if (profileImage && profileImage.trim() !== '') {
      payload.profileImage = profileImage;
    }
    const response = await api.post('/auth/register', payload);
    return response.data; // Returns MessageResponse: success notification text
  },
};

export default authService;
