import api from './api.js';
import { withDemoFallback } from '../utils/demoFallback.js';
import { samplePredictions } from './sampleData.js';

export const predictionService = {
  getAll: () => withDemoFallback(() => api.get('/predictions'), samplePredictions),
  getByArea: (areaId) =>
    withDemoFallback(
      () => api.get(`/predictions/${areaId}`),
      samplePredictions.find((p) => p.areaId === areaId) || null
    ),
};
