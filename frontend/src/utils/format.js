export function formatNumber(n) {
  if (n === null || n === undefined) return '—';
  return new Intl.NumberFormat('en-IN').format(n);
}

export function timeAgo(dateString) {
  if (!dateString) return '—';
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffMin = Math.round(diffMs / 60000);
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hr ago`;
  const diffDay = Math.round(diffHr / 24);
  return `${diffDay} d ago`;
}

export function formatDate(dateString, opts) {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('en-IN', opts || { day: '2-digit', month: 'short', year: 'numeric' });
}
