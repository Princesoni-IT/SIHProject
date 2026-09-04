import { ChevronUp, ChevronDown, Eye } from 'lucide-react';
import Badge from '../common/Badge.jsx';
import { formatDate } from '../../utils/format.js';

const COLUMNS = [
  { key: 'id', label: 'ID' },
  { key: 'type', label: 'Complaint' },
  { key: 'location', label: 'Location' },
  { key: 'reportedBy', label: 'Reported By' },
  { key: 'priority', label: 'Priority' },
  { key: 'status', label: 'Status' },
  { key: 'date', label: 'Date' },
];

export default function ComplaintTable({ complaints, onView, sort, onSortChange }) {
  function toggleSort(key) {
    if (sort.key === key) {
      onSortChange({ key, dir: sort.dir === 'asc' ? 'desc' : 'asc' });
    } else {
      onSortChange({ key, dir: 'asc' });
    }
  }

  return (
    <div className="overflow-x-auto -mx-5 px-5">
      <table className="w-full text-sm min-w-[820px]">
        <thead>
          <tr className="text-left text-xs text-slate-500 uppercase tracking-wide border-b border-surface-200">
            {COLUMNS.map((c) => (
              <th key={c.key} className="py-2.5 pr-4 font-medium select-none">
                <button
                  onClick={() => toggleSort(c.key)}
                  className="flex items-center gap-1 hover:text-navy-700"
                >
                  {c.label}
                  {sort.key === c.key && (sort.dir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                </button>
              </th>
            ))}
            <th className="py-2.5 pr-2 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c.id} className="border-b border-surface-100 last:border-0 hover:bg-surface-50">
              <td className="py-3 pr-4 font-medium text-navy-800 whitespace-nowrap">{c.id}</td>
              <td className="py-3 pr-4 text-navy-700 whitespace-nowrap">{c.type}</td>
              <td className="py-3 pr-4 text-slate-500 whitespace-nowrap">{c.location}</td>
              <td className="py-3 pr-4 text-slate-500 whitespace-nowrap">{c.reportedBy}</td>
              <td className="py-3 pr-4"><Badge label={c.priority} /></td>
              <td className="py-3 pr-4"><Badge label={c.status} /></td>
              <td className="py-3 pr-4 text-slate-500 whitespace-nowrap">{formatDate(c.date)}</td>
              <td className="py-3 pr-2">
                <button
                  onClick={() => onView(c)}
                  className="flex items-center gap-1 text-royal-600 hover:text-royal-700 font-medium"
                  aria-label={`View complaint ${c.id}`}
                >
                  <Eye size={14} /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
