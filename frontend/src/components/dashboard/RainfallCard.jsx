import { Link } from 'react-router-dom';
import { CloudRain, Droplet, Thermometer, Wind, ArrowRight } from 'lucide-react';
import { useAsync } from '../../hooks/useAsync.js';
import { rainfallService } from '../../services/rainfallService.js';
import Loader from '../common/Loader.jsx';
import ErrorState from '../common/ErrorState.jsx';

export default function RainfallCard() {
  const { data, status, refetch } = useAsync(() => rainfallService.getToday(), []);

  return (
    <div className="card-surface p-5 h-full">
      <h3 className="text-base font-semibold text-navy-900 mb-3">Rainfall Data (Today)</h3>

      {status === 'loading' && <Loader label="Loading rainfall data..." />}
      {status === 'error' && <ErrorState title="Unable to load rainfall data." onRetry={refetch} />}

      {status === 'success' && data && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-royal-50 flex items-center justify-center shrink-0">
              <CloudRain size={22} className="text-royal-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900 leading-none">
                {data.current} <span className="text-base font-medium text-slate-500">{data.unit}</span>
              </p>
              <p className="text-sm text-slate-500 mt-1">{data.condition}</p>
            </div>
          </div>

          <dl className="flex flex-col divide-y divide-surface-200 text-sm">
            <Row icon={Droplet} label="Max (24hrs)" value={`${data.max24h} mm`} />
            <Row icon={Droplet} label="Min (24hrs)" value={`${String(data.min24h).padStart(2, '0')} mm`} />
            <Row icon={Thermometer} label="Humidity" value={`${data.humidity} %`} />
            <Row icon={Wind} label="Wind Speed" value={`${data.windSpeed} km/h`} />
          </dl>

          <Link
            to="/admin/rainfall"
            className="mt-4 pt-3 border-t border-surface-200 text-sm font-medium text-royal-600 hover:text-royal-700 flex items-center gap-1"
          >
            View Detailed Forecast <ArrowRight size={14} />
          </Link>
        </>
      )}
    </div>
  );
}

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-2 first:pt-0">
      <span className="flex items-center gap-2 text-slate-500">
        <Icon size={14} className="text-royal-400" />
        {label}
      </span>
      <span className="font-medium text-navy-800">{value}</span>
    </div>
  );
}
