import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useAsync } from '../../hooks/useAsync.js';
import { inspectionService } from '../../services/inspectionService.js';
import { useToast } from '../../context/ToastContext.jsx';
import PageHeader from '../../components/common/PageHeader.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import Select from '../../components/common/Select.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorState from '../../components/common/ErrorState.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Modal from '../../components/common/Modal.jsx';
import FormField from '../../components/common/FormField.jsx';
import Input from '../../components/common/Input.jsx';
import { formatDate } from '../../utils/format.js';

const STATUSES = ['Scheduled', 'Pending', 'Completed'];
const TABS = ['All', ...STATUSES];

export default function Inspections() {
  const { data, status, refetch } = useAsync(() => inspectionService.getAll(), []);
  const toast = useToast();
  const [items, setItems] = useState(null);
  const [tab, setTab] = useState('All');
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ location: '', officer: '', date: '' });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const inspections = items ?? data ?? [];
  const filtered = useMemo(
    () => (tab === 'All' ? inspections : inspections.filter((i) => i.status === tab)),
    [inspections, tab]
  );

  function updateStatus(id, newStatus) {
    inspectionService
      .update(id, { status: newStatus })
      .then(() => {
        setItems(inspections.map((i) => (i.id === id ? { ...i, status: newStatus } : i)));
        toast.success('Inspection status updated.');
      })
      .catch((err) => toast.error(err.message || 'Unable to update inspection.'));
  }

  function validate() {
    const next = {};
    if (!form.location.trim()) next.location = 'Location is required.';
    if (!form.officer.trim()) next.officer = 'Assigned officer is required.';
    if (!form.date) next.date = 'Date is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      const created = await inspectionService.create(form);
      const newInspection = { id: created?.id || `INS-${Date.now()}`, ...form, status: 'Scheduled' };
      setItems([newInspection, ...inspections]);
      toast.success('Inspection scheduled.');
      setFormOpen(false);
      setForm({ location: '', officer: '', date: '' });
    } catch (err) {
      toast.error(err.message || 'Unable to schedule inspection.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Inspections"
        subtitle="Scheduled, pending and completed field inspections"
        actions={<Button icon={Plus} onClick={() => setFormOpen(true)}>Schedule Inspection</Button>}
      />

      <div className="flex gap-2 mb-4">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              tab === t ? 'bg-royal-600 text-white border-royal-600' : 'bg-white text-navy-700 border-surface-200 hover:bg-surface-50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="card-surface p-5">
        {status === 'loading' && <Loader label="Loading inspections..." />}
        {status === 'error' && <ErrorState title="Unable to load inspections." onRetry={refetch} />}
        {status === 'success' && filtered.length === 0 && <EmptyState title="No inspections found." />}
        {status === 'success' && filtered.length > 0 && (
          <div className="overflow-x-auto -mx-5 px-5">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="text-left text-xs text-slate-500 uppercase tracking-wide border-b border-surface-200">
                  <th className="py-2.5 pr-4 font-medium">ID</th>
                  <th className="py-2.5 pr-4 font-medium">Location</th>
                  <th className="py-2.5 pr-4 font-medium">Officer</th>
                  <th className="py-2.5 pr-4 font-medium">Date</th>
                  <th className="py-2.5 pr-4 font-medium">Status</th>
                  <th className="py-2.5 pr-2 font-medium">Update</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((i) => (
                  <tr key={i.id} className="border-b border-surface-100 last:border-0 hover:bg-surface-50">
                    <td className="py-3 pr-4 font-medium text-navy-800 whitespace-nowrap">{i.id}</td>
                    <td className="py-3 pr-4 text-navy-700 whitespace-nowrap">{i.location}</td>
                    <td className="py-3 pr-4 text-slate-500 whitespace-nowrap">{i.officer}</td>
                    <td className="py-3 pr-4 text-slate-500 whitespace-nowrap">{formatDate(i.date)}</td>
                    <td className="py-3 pr-4"><Badge label={i.status} /></td>
                    <td className="py-3 pr-2">
                      <Select value={i.status} onChange={(e) => updateStatus(i.id, e.target.value)} className="!py-1.5 !text-xs w-32">
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title="Schedule Inspection"
        footer={
          <>
            <Button variant="secondary" onClick={() => setFormOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} loading={saving}>Schedule</Button>
          </>
        }
      >
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <FormField label="Location" htmlFor="ins-location" error={errors.location} required>
            <Input id="ins-location" value={form.location} invalid={!!errors.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
          </FormField>
          <FormField label="Assigned Officer" htmlFor="ins-officer" error={errors.officer} required>
            <Input id="ins-officer" value={form.officer} invalid={!!errors.officer} onChange={(e) => setForm((f) => ({ ...f, officer: e.target.value }))} />
          </FormField>
          <FormField label="Date" htmlFor="ins-date" error={errors.date} required>
            <Input id="ins-date" type="date" value={form.date} invalid={!!errors.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
          </FormField>
        </form>
      </Modal>
    </div>
  );
}
