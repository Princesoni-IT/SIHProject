import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import ProtectedRoute, { RoleRedirect } from './components/auth/ProtectedRoute.jsx';
import { ROLES } from './utils/constants.js';

import AuthLayout from './layouts/AuthLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';

import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import OtpVerification from './pages/auth/OtpVerification.jsx';
import EmailVerification from './pages/auth/EmailVerification.jsx';
import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import ResetPassword from './pages/auth/ResetPassword.jsx';
import AuthLoading from './pages/auth/AuthLoading.jsx';
import Unauthorized from './pages/auth/Unauthorized.jsx';

import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import Complaints from './pages/admin/Complaints.jsx';
import AdminMapView from './pages/admin/AdminMapView.jsx';
import RainfallData from './pages/admin/RainfallData.jsx';
import RiskAreas from './pages/admin/RiskAreas.jsx';
import Predictions from './pages/admin/Predictions.jsx';
import Inspections from './pages/admin/Inspections.jsx';
import Alerts from './pages/admin/Alerts.jsx';
import Notices from './pages/admin/Notices.jsx';
import Reports from './pages/admin/Reports.jsx';
import Users from './pages/admin/Users.jsx';
import Settings from './pages/admin/Settings.jsx';
import Messages from './pages/admin/Messages.jsx';


import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Root: send visitors to the right place based on session state */}
            <Route path="/" element={<RoleRedirect />} />

            {/* Auth flow */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-otp" element={<OtpVerification />} />
              <Route path="/verify-email" element={<EmailVerification />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>
            <Route path="/auth-loading" element={<AuthLoading />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Admin + Super Admin */}
            <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]} />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/complaints" element={<Complaints />} />
                <Route path="/admin/map" element={<AdminMapView />} />
                <Route path="/admin/rainfall" element={<RainfallData />} />
                <Route path="/admin/risk-areas" element={<RiskAreas />} />
                <Route path="/admin/predictions" element={<Predictions />} />
                <Route path="/admin/inspections" element={<Inspections />} />
                <Route path="/admin/alerts" element={<Alerts />} />
                <Route path="/admin/messages" element={<Messages />} />
                <Route path="/admin/notices" element={<Notices />} />
                <Route path="/admin/reports" element={<Reports />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/settings" element={<Settings />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

