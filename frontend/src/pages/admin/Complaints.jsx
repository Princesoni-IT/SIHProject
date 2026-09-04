import { useMemo, useState } from 'react';
import { useAsync } from '../../hooks/useAsync.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { complaintService } from '../../services/complaintService.js';
import ComplaintFilters from '../../components/complaints/ComplaintFilters.jsx';
import ComplaintTable from '../../components/complaints/ComplaintTable.jsx';
import ComplaintDetails from '../../components/complaints/ComplaintDetails.jsx';
import Pagination from '../../components/complaints/Pagination.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorState from '../../components/common/ErrorState.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import PageHeader from '../../components/common/PageHeader.jsx';

const PAGE_SIZE = 6;

export default function Complaints() {
  const { data, status, refetch } = useAsync(() => complaintService.getAll(), []);
  const [filters, setFilters] = useState({ search: '', status: '', priority: '', date: '' });
  const debouncedSearch = useDebounce(filters.search, 250);
  const [sort, setSort] = useState({ key: 'date', dir: 'desc' });
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [items, setItems] = useState(null);

  const source = items ?? data ?? [];

  const filtered = useMemo(() => {
    let rows = source;
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.trim().toLowerCase();
      rows = rows.filter(
        (c) =>
          c.type.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          c.reportedBy.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q)
      );
    }
    if (filters.status) rows = rows.filter((c) => c.status === filters.status);
    if (filters.priority) rows = rows.filter((c) => c.priority === filters.priority);
    if (filters.date) rows = rows.filter((c) => c.date.slice(0, 10) === filters.date);

    rows = [...rows].sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sort.dir === 'asc' ? cmp : -cmp;
    });
    return rows;
  }, [source, debouncedSearch, filters.status, filters.priority, filters.date, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleFiltersChange(next) {
    setFilters(next);
    setPage(1);
  }

  function handleUpdated(updatedComplaint) {
    setItems((prev) => (prev ?? source).map((c) => (c.id === updatedComplaint.id ? updatedComplaint : c)));
    setSelected(updatedComplaint);
  }

  return (
    <div>
      <PageHeader title="Complaints" subtitle="Track, filter and resolve citizen-reported issues" />

      <div className="card-surface p-5">
        <ComplaintFilters filters={filters} onChange={handleFiltersChange} />

        {status === 'loading' && <Loader label="Loading complaints..." />}
        {status === 'error' && <ErrorState title="Unable to load complaints." onRetry={refetch} />}
        {status === 'success' && filtered.length === 0 && (
          <EmptyState title="No complaints found." message="Try adjusting your filters or search terms." />
        )}
        {status === 'success' && filtered.length > 0 && (
          <>
            <ComplaintTable complaints={paged} onView={setSelected} sort={sort} onSortChange={setSort} />
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </>
        )}
      </div>

      <ComplaintDetails complaint={selected} onClose={() => setSelected(null)} onUpdated={handleUpdated} />
    </div>
  );
}
