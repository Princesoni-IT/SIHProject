import { CloudRain, Droplet, Thermometer, Wind } from 'lucide-react';
import { useAsync } from '../../hooks/useAsync.js';
import { rainfallService } from '../../services/rainfallService.js';
import { reportService } from '../../services/reportService.js';
import PageHeader from '../../components/common/PageHeader.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorState from '../../components/common/ErrorState.jsx';
import RainfallChart from '../../components/charts/RainfallChart.jsx';
import ChartCard from '../../components/charts/ChartCard.jsx';
import StatCard from '../../components/dashboard/StatCard.jsx';

export default function RainfallData() {
  const { data, status, refetch } = useAsync(() => rainfallService.getToday(), []);
  const { data: reports, status: trendStatus } = useAsync(() => reportService.getRainfall(), []);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Rainfall Data" subtitle="Live and historical rainfall readings across the city" />

      {status === 'loading' && <Loader label="Loading rainfall data..." />}
      {status === 'error' && <ErrorState title="Unable to load rainfall data." onRetry={refetch} />}

      {status === 'success' && data && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Current Rainfall" value={`${data.current} mm`} icon={CloudRain} tone="royal" />
            <StatCard title="Max (24hrs)" value={`${data.max24h} mm`} icon={Droplet} tone="danger" />
            <StatCard title="Min (24hrs)" value={`${data.min24h} mm`} icon={Droplet} tone="safe" />
            <StatCard title="Humidity" value={`${data.humidity}%`} icon={Thermometer} tone="warn" />
          </div>

          <div className="card-surface p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-royal-50 flex items-center justify-center">
                <CloudRain size={24} className="text-royal-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Current Condition</p>
                <p className="text-lg font-semibold text-navy-900">{data.condition}</p>
              </div>
              <div className="ml-auto flex items-center gap-2 text-sm text-slate-500">
                <Wind size={15} /> {data.windSpeed} km/h wind
              </div>
            </div>
          </div>
        </>
      )}

      <ChartCard title="7-Day Rainfall Trend" subtitle="Millimeters of rainfall recorded per day">
        {trendStatus === 'loading' && <Loader />}
        {trendStatus === 'success' && <RainfallChart data={reports || []} />}
      </ChartCard>

      <div className="card-surface p-5 text-sm text-slate-500">
        This page displays rainfall and forecast data supplied by the backend/ML prediction service via{' '}
        <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">GET /api/rainfall/today</code>. Live sensor
        feeds and forecast models will populate this view once connected.
      </div>
    </div>
  );
}
