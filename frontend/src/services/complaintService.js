import api from './api.js';
import { withDemoFallback } from '../utils/demoFallback.js';
import { sampleComplaints } from './sampleData.js';

export const complaintService = {
  getRecent: () => withDemoFallback(() => api.get('/complaints/recent'), sampleComplaints.slice(0, 5)),
  getAll: (params) => withDemoFallback(() => api.get('/complaints', { params }), sampleComplaints),
  getById: (id) =>
    withDemoFallback(
      () => api.get(`/complaints/${id}`),
      sampleComplaints.find((c) => c.id === id) || null
    ),
  updateStatus: (id, status) => api.patch(`/complaints/${id}/status`, { status }).then((r) => r.data),
  assignOfficer: (id, officer) => api.patch(`/complaints/${id}/assign`, { officer }).then((r) => r.data),
};
