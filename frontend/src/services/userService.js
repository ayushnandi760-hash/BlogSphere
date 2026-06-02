import api from './api';

const userService = {
  getUserProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data; // UserDTO
  },

  updateUserProfile: async (name, profileImage, password) => {
    const payload = { name };
    if (profileImage && profileImage.trim() !== '') {
      payload.profileImage = profileImage;
    }
    if (password && password.trim() !== '') {
      payload.password = password;
    }
    const response = await api.put('/users/profile', payload);
    return response.data; // Updated UserDTO
  },
};

export default userService;
