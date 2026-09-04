import { useMemo, useState } from 'react';
import { MapPin, Maximize2 } from 'lucide-react';
import { useAsync } from '../../hooks/useAsync.js';
import { mapService } from '../../services/mapService.js';
import MapView from '../../components/map/MapView.jsx';
import MapFilters from '../../components/map/MapFilters.jsx';
import PageHeader from '../../components/common/PageHeader.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorState from '../../components/common/ErrorState.jsx';
import Badge from '../../components/common/Badge.jsx';

export default function AdminMapView() {
  const { data, status, refetch } = useAsync(() => mapService.getLocations(), []);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);

  const locations = useMemo(() => {
    const all = data || [];
    if (filter === 'all') return all;
    return all.filter((l) => l.type === filter);
  }, [data, filter]);

  return (
    <div>
      <PageHeader
        title="Map View"
        subtitle="Live overview of complaints, waterlogging and flood-risk locations"
        actions={
          <button
            onClick={() => setFullscreen((v) => !v)}
            className="flex items-center gap-1.5 text-sm font-medium text-navy-700 border border-surface-200 rounded-lg px-3 py-2 hover:bg-surface-50"
          >
            <Maximize2 size={14} /> {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        }
      />

      <div className="card-surface p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <MapFilters value={filter} onChange={setFilter} />
        </div>

        {status === 'loading' && <Loader label="Loading map locations..." />}
        {status === 'error' && <ErrorState title="Unable to load map data." onRetry={refetch} />}

        {status === 'success' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2">
              <MapView locations={locations} height={fullscreen ? 640 : 480} onSelect={setSelected} />
            </div>
            <div className="lg:col-span-1">
              <h3 className="text-sm font-semibold text-navy-900 mb-3">
                {selected ? 'Location Details' : `${locations.length} locations`}
              </h3>
              {selected ? (
                <div className="border border-surface-200 rounded-xl p-4">
                  <p className="font-semibold text-navy-900">{selected.title}</p>
                  <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1 mb-3">
                    <MapPin size={13} /> {selected.location}
                  </p>
                  <Badge label={selected.severity === 'high' ? 'High' : selected.severity === 'warning' ? 'Medium' : 'Low'} />
                </div>
              ) : (
                <ul className="flex flex-col divide-y divide-surface-200 max-h-[420px] overflow-y-auto">
                  {locations.map((l) => (
                    <li key={l.id}>
                      <button
                        onClick={() => setSelected(l)}
                        className="w-full text-left py-2.5 hover:bg-surface-50 px-1 rounded"
                      >
                        <p className="text-sm font-medium text-navy-800">{l.title}</p>
                        <p className="text-xs text-slate-500">{l.location}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
