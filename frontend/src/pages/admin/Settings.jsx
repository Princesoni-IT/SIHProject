import { useState } from 'react';
import { User, Lock, Bell, SlidersHorizontal } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { authService } from '../../services/authService.js';
import PageHeader from '../../components/common/PageHeader.jsx';
import FormField from '../../components/common/FormField.jsx';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';

const SECTIONS = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'security', label: 'Security', icon: Lock },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'preferences', label: 'Application Preferences', icon: SlidersHorizontal },
];

export default function Settings() {
  const { user, setUser } = useAuth();
  const toast = useToast();
  const [active, setActive] = useState('profile');

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your profile, security and notification preferences" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <nav className="lg:col-span-1 card-surface p-2 h-fit">
          {SECTIONS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium text-left ${
                active === key ? 'bg-royal-50 text-royal-700' : 'text-navy-700 hover:bg-surface-50'
              }`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </nav>

        <div className="lg:col-span-3 card-surface p-6">
          {active === 'profile' && <ProfileSection user={user} setUser={setUser} toast={toast} />}
          {active === 'security' && <SecuritySection toast={toast} />}
          {active === 'notifications' && <NotificationsSection toast={toast} />}
          {active === 'preferences' && <PreferencesSection />}
        </div>
      </div>
    </div>
  );
}

function ProfileSection({ user, setUser, toast }) {
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });
  const [saving, setSaving] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      // Profile updates go through the backend team's user endpoint once available.
      setUser((u) => ({ ...u, ...form }));
      toast.success('Profile updated.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-5 max-w-md">
      <h2 className="text-base font-semibold text-navy-900">Profile</h2>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-royal-100 text-royal-700 flex items-center justify-center font-semibold text-xl">
          {(form.name || 'A').charAt(0).toUpperCase()}
        </div>
        <Button type="button" variant="secondary" size="sm">Change Photo</Button>
      </div>
      <FormField label="Full Name" htmlFor="profile-name">
        <Input id="profile-name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
      </FormField>
      <FormField label="Email" htmlFor="profile-email">
        <Input id="profile-email" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
      </FormField>
      <FormField label="Phone" htmlFor="profile-phone">
        <Input id="profile-phone" type="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
      </FormField>
      <Button type="submit" loading={saving} className="w-fit">Save Changes</Button>
    </form>
  );
}

function SecuritySection({ toast }) {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function validate() {
    const next = {};
    if (!form.current) next.current = 'Current password is required.';
    if (!form.next) next.next = 'New password is required.';
    else if (form.next.length < 8) next.next = 'Password must be at least 8 characters.';
    if (form.confirm !== form.next) next.confirm = 'Passwords do not match.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      await authService.resetPassword({ currentPassword: form.current, password: form.next });
      toast.success('Password changed successfully.');
      setForm({ current: '', next: '', confirm: '' });
    } catch (err) {
      toast.error(err.message || 'Unable to change password.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-md">
      <h2 className="text-base font-semibold text-navy-900">Change Password</h2>
      <FormField label="Current Password" htmlFor="cur-pw" error={errors.current} required>
        <Input id="cur-pw" type="password" value={form.current} invalid={!!errors.current} onChange={(e) => setForm((f) => ({ ...f, current: e.target.value }))} />
      </FormField>
      <FormField label="New Password" htmlFor="new-pw" error={errors.next} required>
        <Input id="new-pw" type="password" value={form.next} invalid={!!errors.next} onChange={(e) => setForm((f) => ({ ...f, next: e.target.value }))} />
      </FormField>
      <FormField label="Confirm New Password" htmlFor="confirm-pw" error={errors.confirm} required>
        <Input id="confirm-pw" type="password" value={form.confirm} invalid={!!errors.confirm} onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))} />
      </FormField>
      <Button type="submit" loading={saving} className="w-fit">Update Password</Button>
    </form>
  );
}

function NotificationsSection({ toast }) {
  const [prefs, setPrefs] = useState({ email: true, sms: true, emergency: true, complaintUpdates: true });

  function toggle(key) {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
    toast.success('Notification preference updated.');
  }

  const ITEMS = [
    { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email.' },
    { key: 'sms', label: 'SMS Notifications', desc: 'Receive updates via text message.' },
    { key: 'emergency', label: 'Emergency Alerts', desc: 'Critical flood and emergency notifications.' },
    { key: 'complaintUpdates', label: 'Complaint Updates', desc: 'Status changes on complaints you manage.' },
  ];

  return (
    <div className="flex flex-col gap-1 max-w-md">
      <h2 className="text-base font-semibold text-navy-900 mb-3">Notifications</h2>
      {ITEMS.map((item) => (
        <label key={item.key} className="flex items-center justify-between py-3 border-b border-surface-100 last:border-0 cursor-pointer">
          <div>
            <p className="text-sm font-medium text-navy-800">{item.label}</p>
            <p className="text-xs text-slate-500">{item.desc}</p>
          </div>
          <input
            type="checkbox"
            checked={prefs[item.key]}
            onChange={() => toggle(item.key)}
            className="w-5 h-5 rounded text-royal-600 border-surface-200 focus:ring-royal-400"
          />
        </label>
      ))}
    </div>
  );
}

function PreferencesSection() {
  return (
    <div className="max-w-md">
      <h2 className="text-base font-semibold text-navy-900 mb-3">Application Preferences</h2>
      <p className="text-sm text-slate-500">
        Additional preferences (language, units, default map view) will appear here as they're supported by the
        backend.
      </p>
    </div>
  );
}
