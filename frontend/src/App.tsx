import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/landing/landing";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;