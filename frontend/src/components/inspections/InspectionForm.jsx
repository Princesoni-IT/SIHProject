import { useState } from 'react';
import FormField from '../common/FormField.jsx';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';

export default function InspectionForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(
    initial || { location: '', officer: '', date: '', status: 'Scheduled' }
  );
  const [errors, setErrors] = useState({});

  function validate() {
    const next = {};
    if (!form.location.trim()) next.location = 'Location is required.';
    if (!form.officer.trim()) next.officer = 'Assigned officer is required.';
    if (!form.date) next.date = 'Date is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <FormField label="Location" htmlFor="location" error={errors.location} required>
        <Input
          id="location"
          value={form.location}
          invalid={!!errors.location}
          onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
          placeholder="e.g. Sector 5 Drainage Line"
        />
      </FormField>
      <FormField label="Assigned Officer" htmlFor="officer" error={errors.officer} required>
        <Input
          id="officer"
          value={form.officer}
          invalid={!!errors.officer}
          onChange={(e) => setForm((f) => ({ ...f, officer: e.target.value }))}
          placeholder="e.g. Insp. R. Sharma"
        />
      </FormField>
      <FormField label="Date" htmlFor="date" error={errors.date} required>
        <Input
          id="date"
          type="date"
          value={form.date}
          invalid={!!errors.date}
          onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
        />
      </FormField>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" loading={loading}>Save Inspection</Button>
      </div>
    </form>
  );
}
