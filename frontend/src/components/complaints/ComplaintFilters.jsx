import { Search } from 'lucide-react';
import Input from '../common/Input.jsx';
import Select from '../common/Select.jsx';
import { COMPLAINT_STATUS, COMPLAINT_PRIORITY } from '../../utils/constants.js';

export default function ComplaintFilters({ filters, onChange }) {
  function set(key, value) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Search by complaint, location, or reporter..."
          value={filters.search}
          onChange={(e) => set('search', e.target.value)}
          className="pl-10"
          aria-label="Search complaints"
        />
      </div>
      <Select value={filters.status} onChange={(e) => set('status', e.target.value)} className="sm:w-40" aria-label="Filter by status">
        <option value="">All Statuses</option>
        {COMPLAINT_STATUS.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </Select>
      <Select value={filters.priority} onChange={(e) => set('priority', e.target.value)} className="sm:w-40" aria-label="Filter by priority">
        <option value="">All Priorities</option>
        {COMPLAINT_PRIORITY.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </Select>
      <Input
        type="date"
        value={filters.date}
        onChange={(e) => set('date', e.target.value)}
        className="sm:w-44"
        aria-label="Filter by date"
      />
    </div>
  );
}
