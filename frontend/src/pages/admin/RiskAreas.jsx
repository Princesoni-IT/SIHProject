import { useMemo, useState } from 'react';
import { useAsync } from '../../hooks/useAsync.js';
import { riskAreaService } from '../../services/riskAreaService.js';
import PageHeader from '../../components/common/PageHeader.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorState from '../../components/common/ErrorState.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Badge from '../../components/common/Badge.jsx';
import Select from '../../components/common/Select.jsx';
import MapView from '../../components/map/MapView.jsx';
import { RISK_LEVELS } from '../../utils/constants.js';
import { formatNumber, formatDate } from '../../utils/format.js';

export default function RiskAreas() {
  const { data, status, refetch } = useAsync(() => riskAreaService.getAll(), []);
  const [riskFilter, setRiskFilter] = useState('');

  const filtered = useMemo(() => {
    const all = data || [];
    return riskFilter ? all.filter((a) => a.riskLevel === riskFilter) : all;
  }, [data, riskFilter]);

  const mapLocations = filtered.map((a) => ({
    id: a.id,
    lat: a.lat,
    lng: a.lng,
    title: a.area,
    location: `${a.riskLevel} Risk`,
    severity: a.riskLevel === 'Low' ? 'normal' : a.riskLevel === 'Medium' ? 'warning' : 'high',
  }));

  return (
    <div>
      <PageHeader
        title="Flood / Risk Areas"
        subtitle="Areas currently monitored for waterlogging and flood risk"
        actions={
          <Select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} className="w-40">
            <option value="">All Risk Levels</option>
            {RISK_LEVELS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </Select>
        }
      />

      {status === 'loading' && <Loader label="Loading risk areas..." />}
      {status === 'error' && <ErrorState title="Unable to load risk areas." onRetry={refetch} />}

      {status === 'success' && (
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
          <div className="xl:col-span-3 card-surface p-5">
            {filtered.length === 0 ? (
              <EmptyState title="No risk areas match this filter." />
            ) : (
              <div className="overflow-x-auto -mx-5 px-5">
                <table className="w-full text-sm min-w-[720px]">
                  <thead>
                    <tr className="text-left text-xs text-slate-500 uppercase tracking-wide border-b border-surface-200">
                      <th className="py-2.5 pr-4 font-medium">Area</th>
                      <th className="py-2.5 pr-4 font-medium">Risk Level</th>
                      <th className="py-2.5 pr-4 font-medium">Water Level</th>
                      <th className="py-2.5 pr-4 font-medium">Rainfall</th>
                      <th className="py-2.5 pr-4 font-medium">Population Affected</th>
                      <th className="py-2.5 pr-4 font-medium">Last Updated</th>
                      <th className="py-2.5 pr-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((a) => (
                      <tr key={a.id} className="border-b border-surface-100 last:border-0 hover:bg-surface-50">
                        <td className="py-3 pr-4 font-medium text-navy-800 whitespace-nowrap">{a.area}</td>
                        <td className="py-3 pr-4"><Badge label={`${a.riskLevel}`} tone={a.riskLevel === 'Low' ? 'safe' : a.riskLevel === 'Medium' ? 'warning' : 'danger'} /></td>
                        <td className="py-3 pr-4 text-slate-500 whitespace-nowrap">{a.waterLevel}</td>
                        <td className="py-3 pr-4 text-slate-500 whitespace-nowrap">{a.rainfall}</td>
                        <td className="py-3 pr-4 text-slate-500 whitespace-nowrap">{formatNumber(a.populationAffected)}</td>
                        <td className="py-3 pr-4 text-slate-500 whitespace-nowrap">{formatDate(a.lastUpdated)}</td>
                        <td className="py-3 pr-2"><Badge label={a.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="xl:col-span-2 card-surface p-5">
            <h3 className="text-base font-semibold text-navy-900 mb-3">Risk Map</h3>
            <MapView locations={mapLocations} height={420} />
          </div>
        </div>
      )}
    </div>
  );
}
