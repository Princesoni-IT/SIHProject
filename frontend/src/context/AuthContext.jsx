import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService.js';
import { AUTH_TOKEN_KEY, ROLES } from '../utils/constants.js';
import { DEMO_MODE } from '../utils/env.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | authenticated | unauthenticated

  const clearSession = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setUser(null);
    setStatus('unauthenticated');
  }, []);

  // Demo mode creates a local admin session so the frontend can be
  // reviewed without a backend or login. Disable VITE_DEMO_MODE when
  // the real authentication API is ready.
  useEffect(() => {
    if (DEMO_MODE) {
      setUser({
        id: 'demo-admin',
        name: 'AquaAlert Admin',
        email: 'admin@aquaalert.demo',
        role: ROLES.ADMIN,
      });
      setStatus('authenticated');
      return;
    }

    // On first load, verify any existing token against the backend.
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      setStatus('unauthenticated');
      return;
    }
    authService
      .me()
      .then((res) => {
        setUser(res.user ?? res);
        setStatus('authenticated');
      })
      .catch(() => {
        clearSession();
      });
  }, [clearSession]);

  // React to 401s raised anywhere in the app (see services/api.js interceptor).
  useEffect(() => {
    const handler = () => clearSession();
    window.addEventListener('aquaalert:unauthorized', handler);
    return () => window.removeEventListener('aquaalert:unauthorized', handler);
  }, [clearSession]);

  const login = useCallback(async (credentials) => {
    const res = await authService.login(credentials);
    // Expected contract: { token, user: { id, name, email, role, ... } }
    if (res.token) localStorage.setItem(AUTH_TOKEN_KEY, res.token);
    setUser(res.user ?? null);
    setStatus('authenticated');
    return res.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      clearSession();
    }
  }, [clearSession]);

  const value = useMemo(
    () => ({ user, status, isAuthenticated: status === 'authenticated', login, logout, setUser }),
    [user, status, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
