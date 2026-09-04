import api from './api.js';
import { withDemoFallback } from '../utils/demoFallback.js';
import { sampleRiskAreas } from './sampleData.js';

export const riskAreaService = {
  getAll: () => withDemoFallback(() => api.get('/risk-areas'), sampleRiskAreas),
};
