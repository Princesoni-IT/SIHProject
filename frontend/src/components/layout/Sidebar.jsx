import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  MapPin,
  CloudRain,
  AlertTriangle,
  ClipboardCheck,
  Bell,
  Megaphone,
  BarChart3,
  Users,
  Settings,
  Phone,
  X,
  Gauge,
} from 'lucide-react';
import Logo from '../common/Logo.jsx';
import { EMERGENCY_HELPLINE } from '../../utils/constants.js';

const NAV_ITEMS = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/complaints', label: 'Complaints', icon: ClipboardList },
  { to: '/admin/map', label: 'Map View', icon: MapPin },
  { to: '/admin/rainfall', label: 'Rainfall Data', icon: CloudRain },
  { to: '/admin/risk-areas', label: 'Flood / Risk Areas', icon: AlertTriangle },
  { to: '/admin/predictions', label: 'Predictions', icon: Gauge },
  { to: '/admin/inspections', label: 'Inspections', icon: ClipboardCheck },
  { to: '/admin/alerts', label: 'Messages / Alerts', icon: Bell },
  { to: '/admin/notices', label: 'Circular / Notices', icon: Megaphone },
  { to: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ mobileOpen = false, onClose }) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-navy-950/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-[248px] shrink-0 z-50 flex flex-col
          bg-navy-900 transition-transform duration-200 lg:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: 'linear-gradient(180deg, var(--color-navy-900), var(--color-navy-950))' }}
        aria-label="Primary navigation"
      >
        <div className="flex items-center justify-between px-5 pt-6 pb-5">
          <Logo size="sm" theme="dark" />
          <button
            onClick={onClose}
            className="lg:hidden text-slate-300 hover:text-white"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 flex flex-col gap-0.5 scrollbar-thin">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-royal-600 text-white'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={17} strokeWidth={2} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3">
          <a
            href={`tel:${EMERGENCY_HELPLINE}`}
            className="block rounded-xl p-4"
            style={{ background: 'linear-gradient(135deg, var(--color-danger-600), #8f1f1c)' }}
          >
            <div className="flex items-center gap-2 text-white/90 text-xs font-medium mb-1.5">
              <Phone size={14} />
              Emergency Control Room
            </div>
            <p className="text-white text-2xl font-bold leading-none">{EMERGENCY_HELPLINE}</p>
            <p className="text-white/70 text-xs mt-1">Helpline (24×7)</p>
          </a>
        </div>
      </aside>
    </>
  );
}
