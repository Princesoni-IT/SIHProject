import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar.jsx';
import Header from '../components/layout/Header.jsx';

export default function AdminLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-surface-50">
      <Sidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col">
        <Header onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex-1 px-4 lg:px-8 py-6">
          <Outlet />
        </main>
        <footer className="text-center text-xs text-slate-400 py-6">
          © {new Date().getFullYear()} AquaAlert. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
