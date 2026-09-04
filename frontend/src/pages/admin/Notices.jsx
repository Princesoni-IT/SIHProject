import { useState } from 'react';
import { Plus, Edit2, Archive, Trash2 } from 'lucide-react';
import { useAsync } from '../../hooks/useAsync.js';
import { noticeService } from '../../services/noticeService.js';
import { useToast } from '../../context/ToastContext.jsx';
import PageHeader from '../../components/common/PageHeader.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorState from '../../components/common/ErrorState.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import ConfirmDialog from '../../components/common/ConfirmDialog.jsx';
import Modal from '../../components/common/Modal.jsx';
import FormField from '../../components/common/FormField.jsx';
import Input from '../../components/common/Input.jsx';
import Select from '../../components/common/Select.jsx';
import { formatDate } from '../../utils/format.js';

const EMPTY = { title: '', description: '', targetAudience: '', area: '', priority: 'Medium', publishedDate: '', expiryDate: '' };

export default function Notices() {
  const { data, status, refetch } = useAsync(() => noticeService.getAll(), []);
  const toast = useToast();
  const [items, setItems] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(null);

  const notices = items ?? data ?? [];

  function openCreate() {
    setEditing(null);
    setForm(EMPTY);
    setErrors({});
    setFormOpen(true);
  }

  function openEdit(n) {
    setEditing(n);
    setForm(n);
    setErrors({});
    setFormOpen(true);
  }

  function validate() {
    const next = {};
    if (!form.title.trim()) next.title = 'Title is required.';
    if (!form.description.trim()) next.description = 'Description is required.';
    if (!form.targetAudience.trim()) next.targetAudience = 'Target audience is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      if (editing) {
        await noticeService.update(editing.id, form);
        setItems(notices.map((n) => (n.id === editing.id ? { ...n, ...form } : n)));
        toast.success('Notice updated.');
      } else {
        const created = await noticeService.create(form);
        const newNotice = { id: created?.id || `NOT-${Date.now()}`, ...form, status: 'Published' };
        setItems([newNotice, ...notices]);
        toast.success('Notice published.');
      }
      setFormOpen(false);
    } catch (err) {
      toast.error(err.message || 'Unable to save notice.');
    } finally {
      setSaving(false);
    }
  }

  function archiveNotice(n) {
    noticeService
      .update(n.id, { status: 'Archived' })
      .then(() => {
        setItems(notices.map((x) => (x.id === n.id ? { ...x, status: 'Archived' } : x)));
        toast.success('Notice archived.');
      })
      .catch((err) => toast.error(err.message || 'Unable to archive notice.'));
  }

  async function handleRemove() {
    if (!removing) return;
    try {
      await noticeService.remove(removing.id);
      setItems(notices.filter((n) => n.id !== removing.id));
      toast.success('Notice deleted.');
    } catch (err) {
      toast.error(err.message || 'Unable to delete notice.');
    } finally {
      setRemoving(null);
    }
  }

  return (
    <div>
      <PageHeader
        title="Circular / Notices"
        subtitle="Publish notices and circulars for citizens and staff"
        actions={<Button icon={Plus} onClick={openCreate}>New Notice</Button>}
      />

      {status === 'loading' && <Loader label="Loading notices..." />}
      {status === 'error' && <ErrorState title="Unable to load notices." onRetry={refetch} />}
      {status === 'success' && notices.length === 0 && <EmptyState title="No notices published yet." />}

      {status === 'success' && notices.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {notices.map((n) => (
            <div key={n.id} className="card-surface p-5 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Badge label={n.priority} />
                <Badge label={n.status} />
              </div>
              <p className="font-semibold text-navy-900">{n.title}</p>
              <p className="text-sm text-slate-500">{n.description}</p>
              <div className="text-xs text-slate-400 flex flex-wrap gap-x-4 gap-y-1 mt-1">
                <span>Audience: {n.targetAudience}</span>
                <span>Area: {n.area}</span>
                <span>Published: {formatDate(n.publishedDate)}</span>
                <span>Expires: {formatDate(n.expiryDate)}</span>
              </div>
              <div className="flex gap-2 mt-2 pt-3 border-t border-surface-200">
                <Button variant="secondary" size="sm" icon={Edit2} onClick={() => openEdit(n)}>Edit</Button>
                <Button variant="secondary" size="sm" icon={Archive} onClick={() => archiveNotice(n)} disabled={n.status === 'Archived'}>Archive</Button>
                <Button variant="danger" size="sm" icon={Trash2} onClick={() => setRemoving(n)} className="ml-auto">Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? 'Edit Notice' : 'New Notice'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setFormOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} loading={saving}>{editing ? 'Save Changes' : 'Publish'}</Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField label="Title" htmlFor="notice-title" error={errors.title} required>
            <Input id="notice-title" value={form.title} invalid={!!errors.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          </FormField>
          <FormField label="Description" htmlFor="notice-desc" error={errors.description} required>
            <textarea
              id="notice-desc"
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white outline-none resize-none ${errors.description ? 'border-danger-400' : 'border-surface-200 focus:border-royal-400'} focus:ring-2 focus:ring-royal-50`}
            />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Target Audience" htmlFor="notice-audience" error={errors.targetAudience} required>
              <Input id="notice-audience" value={form.targetAudience} invalid={!!errors.targetAudience} onChange={(e) => setForm((f) => ({ ...f, targetAudience: e.target.value }))} />
            </FormField>
            <FormField label="Area" htmlFor="notice-area">
              <Input id="notice-area" value={form.area} onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))} />
            </FormField>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <FormField label="Priority" htmlFor="notice-priority">
              <Select id="notice-priority" value={form.priority} onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}>
                <option>Low</option><option>Medium</option><option>High</option>
              </Select>
            </FormField>
            <FormField label="Published Date" htmlFor="notice-pub">
              <Input id="notice-pub" type="date" value={form.publishedDate} onChange={(e) => setForm((f) => ({ ...f, publishedDate: e.target.value }))} />
            </FormField>
            <FormField label="Expiry Date" htmlFor="notice-exp">
              <Input id="notice-exp" type="date" value={form.expiryDate} onChange={(e) => setForm((f) => ({ ...f, expiryDate: e.target.value }))} />
            </FormField>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!removing}
        title="Delete notice?"
        message={`"${removing?.title}" will be permanently deleted.`}
        confirmLabel="Delete"
        variant="danger"
        onCancel={() => setRemoving(null)}
        onConfirm={handleRemove}
      />
    </div>
  );
}
