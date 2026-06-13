import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to standardise error handling
const handleError = (error, defaultMessage) => {
  const message = error.response?.data?.message || error.message || defaultMessage;
  throw new Error(message);
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  } catch (error) {
    handleError(error, 'Login failed');
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await api.post('/api/auth/register', { username, email, password });
    return response.data;
  } catch (error) {
    handleError(error, 'Registration failed');
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await api.put('/api/auth/change-password', { currentPassword, newPassword });
    return response.data;
  } catch (error) {
    handleError(error, 'Change password failed');
  }
};

export const getMe = async () => {
  try {
    const response = await api.get('/api/auth/me');
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to fetch user profile');
  }
};

export const logout = async () => {
  try {
    const response = await api.post('/api/auth/logout');
    return response.data;
  } catch (error) {
    handleError(error, 'Logout failed');
  }
};

export default api;