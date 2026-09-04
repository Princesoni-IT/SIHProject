import { useEffect, useState } from 'react';
import Modal from '../common/Modal.jsx';
import Button from '../common/Button.jsx';
import FormField from '../common/FormField.jsx';
import Input from '../common/Input.jsx';
import Select from '../common/Select.jsx';

const SEVERITIES = ['info', 'warning', 'high', 'critical'];

const EMPTY = { title: '', message: '', affectedArea: '', severity: 'warning' };

export default function AlertFormModal({ open, initial, onClose, onSubmit, saving }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initial ? { ...EMPTY, ...initial } : EMPTY);
    setErrors({});
  }, [initial, open]);

  function validate() {
    const next = {};
    if (!form.title.trim()) next.title = 'Title is required.';
    if (!form.message.trim()) next.message = 'Message is required.';
    if (!form.affectedArea.trim()) next.affectedArea = 'Affected area is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  }

  return (
    <Modal open={open} onClose={onClose} title={initial ? 'Edit Alert' : 'Create Alert'} size="md" footer={
      <>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} loading={saving}>{initial ? 'Save Changes' : 'Publish Alert'}</Button>
      </>
    }>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField label="Title" htmlFor="alert-title" error={errors.title} required>
          <Input id="alert-title" value={form.title} invalid={!!errors.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
        </FormField>
        <FormField label="Message" htmlFor="alert-message" error={errors.message} required>
          <textarea
            id="alert-message"
            rows={3}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white outline-none resize-none ${errors.message ? 'border-danger-400' : 'border-surface-200 focus:border-royal-400'} focus:ring-2 focus:ring-royal-50`}
          />
        </FormField>
        <FormField label="Affected Area" htmlFor="alert-area" error={errors.affectedArea} required>
          <Input id="alert-area" value={form.affectedArea} invalid={!!errors.affectedArea} onChange={(e) => setForm((f) => ({ ...f, affectedArea: e.target.value }))} />
        </FormField>
        <FormField label="Severity" htmlFor="alert-severity">
          <Select id="alert-severity" value={form.severity} onChange={(e) => setForm((f) => ({ ...f, severity: e.target.value }))}>
            {SEVERITIES.map((s) => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}
          </Select>
        </FormField>
      </form>
    </Modal>
  );
}
