import { useState } from 'react';
import StatCardGrid from '../../components/dashboard/StatCardGrid.jsx';
import RecentComplaints from '../../components/dashboard/RecentComplaints.jsx';
import RainfallCard from '../../components/dashboard/RainfallCard.jsx';
import AlertsPanel from '../../components/dashboard/AlertsPanel.jsx';
import RiskAreasPanel from '../../components/dashboard/RiskAreasPanel.jsx';
import QuickActions from '../../components/dashboard/QuickActions.jsx';
import ComplaintsStatusChart from '../../components/charts/ComplaintsStatusChart.jsx';
import MapView from '../../components/map/MapView.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { dashboardService } from '../../services/dashboardService.js';
import { mapService } from '../../services/mapService.js';
import { reportService } from '../../services/reportService.js';
import Loader from '../../components/common/Loader.jsx';
import ErrorState from '../../components/common/ErrorState.jsx';

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useAsync(() => dashboardService.getStats(), []);
  const { data: locations, status: mapStatus, refetch: refetchMap } = useAsync(() => mapService.getLocations(), []);
  const { data: reports, status: reportsStatus } = useAsync(() => reportService.getSummary(), []);
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex flex-col gap-5">
      <StatCardGrid stats={stats} loading={statsLoading} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 card-surface p-5">
          <h3 className="text-base font-semibold text-navy-900 mb-3">City / Area Map</h3>
          {mapStatus === 'loading' && <Loader label="Loading map data..." />}
          {mapStatus === 'error' && <ErrorState title="Unable to load map data." onRetry={refetchMap} />}
          {mapStatus === 'success' && <MapView locations={locations || []} onSelect={setSelected} />}
        </div>
        <RecentComplaints />
        <RainfallCard />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
        <div className="card-surface p-5 xl:col-span-1">
          <h3 className="text-base font-semibold text-navy-900 mb-3">Complaints Status</h3>
          {reportsStatus === 'loading' && <Loader />}
          {reportsStatus === 'success' && reports && (
            <ComplaintsStatusChart data={reports.statusDistribution} />
          )}
        </div>
        <AlertsPanel />
        <RiskAreasPanel />
        <QuickActions />
      </div>
    </div>
  );
}
