import { useState } from 'react';
import { Plus, Edit2, PowerOff, MapPin } from 'lucide-react';
import { useAsync } from '../../hooks/useAsync.js';
import { alertService } from '../../services/alertService.js';
import { useToast } from '../../context/ToastContext.jsx';
import PageHeader from '../../components/common/PageHeader.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorState from '../../components/common/ErrorState.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import ConfirmDialog from '../../components/common/ConfirmDialog.jsx';
import AlertFormModal from '../../components/alerts/AlertFormModal.jsx';
import { timeAgo } from '../../utils/format.js';

export default function Alerts() {
  const { data, status, refetch } = useAsync(() => alertService.getAll(), []);
  const toast = useToast();
  const [items, setItems] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deactivating, setDeactivating] = useState(null);
  const [saving, setSaving] = useState(false);

  const alerts = items ?? data ?? [];

  async function handleSubmit(form) {
    setSaving(true);
    try {
      if (editing) {
        await alertService.update(editing.id, form);
        setItems(alerts.map((a) => (a.id === editing.id ? { ...a, ...form } : a)));
        toast.success('Alert updated.');
      } else {
        const created = await alertService.create(form);
        const newAlert = { id: created?.id || `AL-${Date.now()}`, ...form, time: new Date().toISOString(), status: 'Active' };
        setItems([newAlert, ...alerts]);
        toast.success('Alert published.');
      }
      setFormOpen(false);
      setEditing(null);
    } catch (err) {
      toast.error(err.message || 'Unable to save alert.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDeactivate() {
    if (!deactivating) return;
    try {
      await alertService.deactivate(deactivating.id);
      setItems(alerts.map((a) => (a.id === deactivating.id ? { ...a, status: 'Deactivated' } : a)));
      toast.success('Alert deactivated.');
    } catch (err) {
      toast.error(err.message || 'Unable to deactivate alert.');
    } finally {
      setDeactivating(null);
    }
  }

  return (
    <div>
      <PageHeader
        title="Messages / Alerts"
        subtitle="Manage active alerts and citizen notifications"
        actions={
          <Button icon={Plus} onClick={() => { setEditing(null); setFormOpen(true); }}>
            Create Alert
          </Button>
        }
      />

      {status === 'loading' && <Loader label="Loading alerts..." />}
      {status === 'error' && <ErrorState title="Unable to load alerts." onRetry={refetch} />}
      {status === 'success' && alerts.length === 0 && <EmptyState title="No alerts yet." message="Create your first alert to notify citizens." />}

      {status === 'success' && alerts.length > 0 && (
        <div className="flex flex-col gap-3">
          {alerts.map((a) => (
            <div key={a.id} className="card-surface p-5 flex flex-col sm:flex-row sm:items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge label={a.severity} tone={a.severity === 'critical' || a.severity === 'high' ? 'danger' : a.severity === 'warning' ? 'warning' : 'info'} />
                  <Badge label={a.status} />
                </div>
                <p className="font-semibold text-navy-900">{a.title}</p>
                <p className="text-sm text-slate-500 mt-1">{a.message}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {a.affectedArea}</span>
                  <span>{timeAgo(a.time)}</span>
                </div>
              </div>
              <div className="flex sm:flex-col gap-2 shrink-0">
                <Button variant="secondary" size="sm" icon={Edit2} onClick={() => { setEditing(a); setFormOpen(true); }}>
                  Edit
                </Button>
                <Button variant="secondary" size="sm" icon={PowerOff} onClick={() => setDeactivating(a)} disabled={a.status === 'Deactivated'}>
                  Deactivate
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AlertFormModal
        open={formOpen}
        initial={editing}
        saving={saving}
        onClose={() => { setFormOpen(false); setEditing(null); }}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={!!deactivating}
        title="Deactivate alert?"
        message={`This will deactivate "${deactivating?.title}". Citizens will no longer see it as active.`}
        confirmLabel="Deactivate"
        variant="danger"
        onCancel={() => setDeactivating(null)}
        onConfirm={handleDeactivate}
      />
    </div>
  );
}
