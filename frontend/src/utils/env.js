// Central place to read Vite environment variables.
// Keep all import.meta.env access here so the rest of the app
// never touches env vars directly.

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Demo mode lets every page render meaningful sample data when the
// backend/ML endpoints aren't reachable yet (e.g. during frontend-only
// development). It must be explicitly enabled and should be turned off
// once real APIs are connected.
export const DEMO_MODE = String(import.meta.env.VITE_DEMO_MODE).toLowerCase() === 'true';
