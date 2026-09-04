import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, Menu, LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { notificationService } from '../../services/notificationService.js';
import { timeAgo } from '../../utils/format.js';

const PAGE_TITLES = {
  '/admin/dashboard': ['Dashboard', 'Welcome back'],
  '/admin/complaints': ['Complaints', 'Track and resolve citizen-reported issues'],
  '/admin/map': ['Map View', 'Live city-wide risk and complaint overview'],
  '/admin/rainfall': ['Rainfall Data', 'Live and historical rainfall readings'],
  '/admin/risk-areas': ['Flood / Risk Areas', 'Areas currently monitored for flood risk'],
  '/admin/messages': ['Messages', 'Notifications, system messages and emergency alerts'],
  '/admin/predictions': ['Flood Predictions', 'ML-generated flood risk forecasts'],
  '/admin/inspections': ['Inspections', 'Scheduled, pending and completed inspections'],
  '/admin/alerts': ['Messages / Alerts', 'Manage active alerts and notifications'],
  '/admin/notices': ['Circular / Notices', 'Publish notices for citizens and staff'],
  '/admin/reports': ['Reports', 'City-wide analytics and trends'],
  '/admin/users': ['Users', 'Manage citizen and staff accounts'],
  '/admin/settings': ['Settings', 'Manage your profile and preferences'],
  '/citizen/dashboard': ['My Dashboard', 'Stay informed and report issues nearby'],
  '/citizen/report': ['Report an Issue', 'Tell us what you\'re seeing in your area'],
  '/citizen/complaints': ['My Complaints', 'Track the status of issues you\'ve reported'],
  '/citizen/map': ['Map View', 'Flood risk and complaints near you'],
  '/citizen/alerts': ['Alerts', 'Active alerts and advisories for your area'],
  '/citizen/settings': ['Settings', 'Manage your profile and preferences'],
};

export default function Header({ onMenuClick, searchPlaceholder }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [pageTitle, pageSubtitle] = PAGE_TITLES[location.pathname] || ['AquaAlert', ''];
  const title = pageTitle;
  const subtitle = location.pathname === '/admin/dashboard' || location.pathname === '/citizen/dashboard'
    ? `${pageSubtitle}, ${user?.name?.split(' ')[0] || 'Admin'}`
    : pageSubtitle;
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  const { data: notifications } = useAsync(() => notificationService.getAll(), []);
  const unreadCount = (notifications || []).filter((n) => !n.read).length;

  useEffect(() => {
    function onClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const roleLabel = user?.role === 'super_admin' ? 'Super Admin' : user?.role === 'admin' ? 'Admin' : 'Citizen';
  const displayName = user?.name || 'Admin';

  return (
    <header className="sticky top-0 z-30 bg-surface-50/95 backdrop-blur border-b border-surface-200">
      <div className="flex items-center gap-3 px-4 lg:px-8 py-4">
        <button onClick={onMenuClick} className="lg:hidden text-navy-800" aria-label="Open menu">
          <Menu size={22} />
        </button>

        <div className="mr-auto">
          <h1 className="text-lg lg:text-xl font-semibold text-navy-900">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>

        <div className="hidden md:flex items-center relative w-64 lg:w-80">
          <Search size={16} className="absolute left-3.5 text-slate-400" />
          <input
            type="search"
            placeholder={searchPlaceholder || 'Search complaints, locations...'}
            aria-label="Search"
            className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border border-surface-200 bg-white outline-none focus:border-royal-400 focus:ring-2 focus:ring-royal-50"
          />
        </div>

        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-100 text-navy-700"
            aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-danger-500 text-white text-[10px] font-semibold rounded-full min-w-[17px] h-[17px] flex items-center justify-center px-1">
                {unreadCount}
              </span>
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 card-surface py-2 max-h-96 overflow-y-auto">
              <p className="px-4 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Notifications</p>
              {(notifications || []).length === 0 && (
                <p className="px-4 py-4 text-sm text-slate-500">You're all caught up.</p>
              )}
              {(notifications || []).slice(0, 6).map((n) => (
                <div key={n.id} className="px-4 py-2.5 hover:bg-surface-50 flex gap-2">
                  <span
                    className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${n.read ? 'bg-transparent' : 'bg-royal-500'}`}
                  />
                  <div>
                    <p className="text-sm font-medium text-navy-800 leading-snug">{n.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{timeAgo(n.time)}</p>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  setNotifOpen(false);
                  navigate(user?.role === 'citizen' ? '/citizen/alerts' : '/admin/messages');
                }}
                className="w-full text-center text-sm text-royal-600 font-medium py-2 mt-1 hover:bg-surface-50"
              >
                View all
              </button>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-lg hover:bg-surface-100"
            aria-haspopup="true"
            aria-expanded={profileOpen}
          >
            <div className="w-9 h-9 rounded-full bg-royal-100 text-royal-700 flex items-center justify-center font-semibold text-sm">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <p className="text-sm font-semibold text-navy-900">{displayName}</p>
              <p className="text-xs text-slate-500">{roleLabel}</p>
            </div>
            <ChevronDown size={15} className="text-slate-400 hidden sm:block" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-52 card-surface py-1.5">
              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate('/admin/settings');
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-navy-700 hover:bg-surface-50"
              >
                <User size={15} /> Profile
              </button>
              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate('/admin/settings');
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-navy-700 hover:bg-surface-50"
              >
                <Settings size={15} /> Settings
              </button>
              <div className="h-px bg-surface-200 my-1.5" />
              <button
                onClick={logout}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-danger-600 hover:bg-red-50"
              >
                <LogOut size={15} /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
