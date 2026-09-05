import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/landing/landing";
import Login from "./pages/auth/login";
import Registration from "./pages/auth/registration";
import UserDashboard from "./pages/user/userdashboard";
import AdminDashboard from "./pages/admin/admindashboard";
import VoiceComplain from "./pages/user/voicecomplain";
import { UserProtectedRoute, AdminProtectedRoute } from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public & Auth Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        {/* Protected User Routes */}
        <Route element={<UserProtectedRoute />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/voice-complain" element={<VoiceComplain />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;