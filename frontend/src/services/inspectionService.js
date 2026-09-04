import api from './api.js';
import { withDemoFallback } from '../utils/demoFallback.js';
import { sampleInspections } from './sampleData.js';

export const inspectionService = {
  getAll: () => withDemoFallback(() => api.get('/inspections'), sampleInspections),
  create: (payload) => api.post('/inspections', payload).then((r) => r.data),
  update: (id, payload) => api.patch(`/inspections/${id}`, payload).then((r) => r.data),
};
