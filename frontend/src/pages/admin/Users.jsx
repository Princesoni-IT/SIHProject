import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useAsync } from '../../hooks/useAsync.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { userService } from '../../services/userService.js';
import { useToast } from '../../context/ToastContext.jsx';
import PageHeader from '../../components/common/PageHeader.jsx';
import Input from '../../components/common/Input.jsx';
import Select from '../../components/common/Select.jsx';
import Badge from '../../components/common/Badge.jsx';
import Button from '../../components/common/Button.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorState from '../../components/common/ErrorState.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import ConfirmDialog from '../../components/common/ConfirmDialog.jsx';
import { formatDate, timeAgo } from '../../utils/format.js';

const ROLE_LABEL = { citizen: 'Citizen', admin: 'Admin', super_admin: 'Super Admin' };

export default function Users() {
  const { data, status, refetch } = useAsync(() => userService.getAll(), []);
  const toast = useToast();
  const [items, setItems] = useState(null);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const debouncedSearch = useDebounce(search, 250);
  const [pendingAction, setPendingAction] = useState(null); // { user, nextStatus }

  const users = items ?? data ?? [];

  const filtered = useMemo(() => {
    let rows = users;
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.trim().toLowerCase();
      rows = rows.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    if (role) rows = rows.filter((u) => u.role === role);
    return rows;
  }, [users, debouncedSearch, role]);

  async function confirmStatusChange() {
    if (!pendingAction) return;
    const { user, nextStatus } = pendingAction;
    try {
      await userService.updateStatus(user.id, nextStatus);
      setItems(users.map((u) => (u.id === user.id ? { ...u, status: nextStatus } : u)));
      toast.success(`${user.name} is now ${nextStatus.toLowerCase()}.`);
    } catch (err) {
      toast.error(err.message || 'Unable to update user status.');
    } finally {
      setPendingAction(null);
    }
  }

  return (
    <div>
      <PageHeader title="Users" subtitle="Manage citizen and staff accounts" />

      <div className="card-surface p-5">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Select value={role} onChange={(e) => setRole(e.target.value)} className="sm:w-44">
            <option value="">All Roles</option>
            <option value="citizen">Citizen</option>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </Select>
        </div>

        {status === 'loading' && <Loader label="Loading users..." />}
        {status === 'error' && <ErrorState title="Unable to load users." onRetry={refetch} />}
        {status === 'success' && filtered.length === 0 && <EmptyState title="No users found." />}

        {status === 'success' && filtered.length > 0 && (
          <div className="overflow-x-auto -mx-5 px-5">
            <table className="w-full text-sm min-w-[800px]">
              <thead>
                <tr className="text-left text-xs text-slate-500 uppercase tracking-wide border-b border-surface-200">
                  <th className="py-2.5 pr-4 font-medium">Name</th>
                  <th className="py-2.5 pr-4 font-medium">Email</th>
                  <th className="py-2.5 pr-4 font-medium">Phone</th>
                  <th className="py-2.5 pr-4 font-medium">Role</th>
                  <th className="py-2.5 pr-4 font-medium">Status</th>
                  <th className="py-2.5 pr-4 font-medium">Registered</th>
                  <th className="py-2.5 pr-4 font-medium">Last Active</th>
                  <th className="py-2.5 pr-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b border-surface-100 last:border-0 hover:bg-surface-50">
                    <td className="py-3 pr-4 font-medium text-navy-800 whitespace-nowrap">{u.name}</td>
                    <td className="py-3 pr-4 text-slate-500 whitespace-nowrap">{u.email}</td>
                    <td className="py-3 pr-4 text-slate-500 whitespace-nowrap">{u.phone}</td>
                    <td className="py-3 pr-4 whitespace-nowrap">{ROLE_LABEL[u.role]}</td>
                    <td className="py-3 pr-4"><Badge label={u.status} /></td>
                    <td className="py-3 pr-4 text-slate-500 whitespace-nowrap">{formatDate(u.registeredDate)}</td>
                    <td className="py-3 pr-4 text-slate-500 whitespace-nowrap">{timeAgo(u.lastActive)}</td>
                    <td className="py-3 pr-2 whitespace-nowrap">
                      {u.status === 'Active' ? (
                        <Button variant="danger" size="sm" onClick={() => setPendingAction({ user: u, nextStatus: 'Inactive' })}>
                          Deactivate
                        </Button>
                      ) : (
                        <Button variant="secondary" size="sm" onClick={() => setPendingAction({ user: u, nextStatus: 'Active' })}>
                          Activate
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!pendingAction}
        title={pendingAction?.nextStatus === 'Active' ? 'Activate user?' : 'Deactivate user?'}
        message={`${pendingAction?.user?.name} will be marked as ${pendingAction?.nextStatus?.toLowerCase()}.`}
        confirmLabel={pendingAction?.nextStatus === 'Active' ? 'Activate' : 'Deactivate'}
        variant={pendingAction?.nextStatus === 'Active' ? 'primary' : 'danger'}
        onCancel={() => setPendingAction(null)}
        onConfirm={confirmStatusChange}
      />
    </div>
  );
}
