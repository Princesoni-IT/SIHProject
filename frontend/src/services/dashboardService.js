import api from './api.js';
import { withDemoFallback } from '../utils/demoFallback.js';
import { sampleStats } from './sampleData.js';

export const dashboardService = {
  getStats: () => withDemoFallback(() => api.get('/dashboard/stats'), sampleStats),
};
