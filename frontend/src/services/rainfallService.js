import api from './api.js';
import { withDemoFallback } from '../utils/demoFallback.js';
import { sampleRainfall } from './sampleData.js';

export const rainfallService = {
  getToday: () => withDemoFallback(() => api.get('/rainfall/today'), sampleRainfall),
};
