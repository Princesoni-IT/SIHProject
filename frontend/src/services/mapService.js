import api from './api.js';
import { withDemoFallback } from '../utils/demoFallback.js';
import { sampleMapLocations, sampleRiskAreas, sampleComplaints } from './sampleData.js';

export const mapService = {
  getLocations: () => withDemoFallback(() => api.get('/map/locations'), sampleMapLocations),
  getRiskAreas: () => withDemoFallback(() => api.get('/risk-areas'), sampleRiskAreas),
  getComplaintsMap: () => withDemoFallback(() => api.get('/complaints/map'), sampleComplaints),
};
