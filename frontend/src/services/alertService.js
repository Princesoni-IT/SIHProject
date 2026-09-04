import api from './api.js';
import { withDemoFallback } from '../utils/demoFallback.js';
import { sampleAlerts } from './sampleData.js';

export const alertService = {
  getAll: () => withDemoFallback(() => api.get('/alerts'), sampleAlerts),
  create: (payload) => api.post('/alerts', payload).then((r) => r.data),
  update: (id, payload) => api.patch(`/alerts/${id}`, payload).then((r) => r.data),
  deactivate: (id) => api.delete(`/alerts/${id}`).then((r) => r.data),
};
