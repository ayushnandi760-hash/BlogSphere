import axios from 'axios';

// In production (Vercel), VITE_API_BASE_URL points to the Render backend URL.
// In local dev, Vite proxies all /api requests to localhost:8080 (see vite.config.js).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: automatically append active Authorization JWT
api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem('blogsphere_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user && user.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch (e) {
        console.error('Error reading token from localStorage', e);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: automatically handles auth errors (like expired tokens)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the server returns a 401 Unauthorized, we clear outdated sessions
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('blogsphere_user');
      // If we are on a protected route, redirect to login
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
