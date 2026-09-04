import { useAsync } from '../../hooks/useAsync.js';
import { predictionService } from '../../services/predictionService.js';
import PageHeader from '../../components/common/PageHeader.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorState from '../../components/common/ErrorState.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import PredictionCard from '../../components/predictions/PredictionCard.jsx';

// This page only renders predictions returned by the ML/backend service —
// no prediction logic lives in the frontend. See GET /api/predictions.
export default function Predictions() {
  const { data, status, refetch } = useAsync(() => predictionService.getAll(), []);

  return (
    <div>
      <PageHeader title="Flood Predictions" subtitle="ML-generated flood risk forecasts for monitored areas" />

      {status === 'loading' && <Loader label="Loading predictions..." />}
      {status === 'error' && <ErrorState title="Unable to load predictions." onRetry={refetch} />}
      {status === 'success' && (!data || data.length === 0) && (
        <EmptyState title="No predictions available." message="The prediction service hasn't returned any forecasts yet." />
      )}

      {status === 'success' && data && data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {data.map((p) => (
            <PredictionCard key={p.areaId} prediction={p} />
          ))}
        </div>
      )}
    </div>
  );
}
