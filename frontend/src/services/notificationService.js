import api from './api.js';
import { withDemoFallback } from '../utils/demoFallback.js';
import { sampleNotifications } from './sampleData.js';

export const notificationService = {
  getAll: () => withDemoFallback(() => api.get('/notifications'), sampleNotifications),
  markRead: (id) => api.patch(`/notifications/${id}/read`).then((r) => r.data),
};
