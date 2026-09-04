import api from './api.js';
import { withDemoFallback } from '../utils/demoFallback.js';
import { sampleUsers } from './sampleData.js';

export const userService = {
  getAll: () => withDemoFallback(() => api.get('/users'), sampleUsers),
  updateStatus: (id, status) => api.patch(`/users/${id}/status`, { status }).then((r) => r.data),
};
