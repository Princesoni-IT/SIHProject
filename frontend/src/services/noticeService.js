import api from './api.js';
import { withDemoFallback } from '../utils/demoFallback.js';
import { sampleNotices } from './sampleData.js';

export const noticeService = {
  getAll: () => withDemoFallback(() => api.get('/notices'), sampleNotices),
  create: (payload) => api.post('/notices', payload).then((r) => r.data),
  update: (id, payload) => api.patch(`/notices/${id}`, payload).then((r) => r.data),
  remove: (id) => api.delete(`/notices/${id}`).then((r) => r.data),
};
