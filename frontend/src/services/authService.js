import api from './api.js';

// All calls resolve to res.data. Errors are normalized by the interceptor
// in api.js — callers get { status, message, details }.

export const authService = {
  login: (payload) => api.post('/auth/login', payload).then((r) => r.data),
  register: (payload) => api.post('/auth/register', payload).then((r) => r.data),
  sendOtp: (payload) => api.post('/auth/send-otp', payload).then((r) => r.data),
  verifyOtp: (payload) => api.post('/auth/verify-otp', payload).then((r) => r.data),
  sendEmailVerification: (payload) => api.post('/auth/send-email-verification', payload).then((r) => r.data),
  verifyEmail: (payload) => api.post('/auth/verify-email', payload).then((r) => r.data),
  forgotPassword: (payload) => api.post('/auth/forgot-password', payload).then((r) => r.data),
  resetPassword: (payload) => api.post('/auth/reset-password', payload).then((r) => r.data),
  me: () => api.get('/auth/me').then((r) => r.data),
  logout: () => api.post('/auth/logout').then((r) => r.data),
};
