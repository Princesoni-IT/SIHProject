import { DEMO_MODE } from './env.js';

// Wraps a real API call. In demo mode, if the backend isn't reachable yet
// (network error, 404, 500...) it falls back to bundled sample data so the
// UI can still be built/reviewed. Once VITE_DEMO_MODE=false this fallback
// never triggers and errors propagate normally to the UI's error state.
export async function withDemoFallback(requestFn, sampleData) {
  try {
    const response = await requestFn();
    return response.data;
  } catch (error) {
    if (DEMO_MODE) {
      // eslint-disable-next-line no-console
      console.warn('[demo mode] API call failed, using sample data:', error.message);
      return sampleData;
    }
    throw error;
  }
}
