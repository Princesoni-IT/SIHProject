import api from './api.js';
import { withDemoFallback } from '../utils/demoFallback.js';
import { sampleReports } from './sampleData.js';

export const reportService = {
  getComplaints: () => withDemoFallback(() => api.get('/reports/complaints'), sampleReports),
  getRainfall: () => withDemoFallback(() => api.get('/reports/rainfall'), sampleReports.rainfallTrend),
  getRisk: () => withDemoFallback(() => api.get('/reports/risk'), sampleReports.riskAreas),
  getSummary: () => withDemoFallback(() => api.get('/reports/summary'), sampleReports),
};
