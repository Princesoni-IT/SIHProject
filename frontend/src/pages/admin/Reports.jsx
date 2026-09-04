import { useAsync } from '../../hooks/useAsync.js';
import { reportService } from '../../services/reportService.js';
import PageHeader from '../../components/common/PageHeader.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorState from '../../components/common/ErrorState.jsx';
import ChartCard from '../../components/charts/ChartCard.jsx';
import ComplaintsChart from '../../components/charts/ComplaintsChart.jsx';
import ComplaintsStatusChart from '../../components/charts/ComplaintsStatusChart.jsx';
import RiskChart from '../../components/charts/RiskChart.jsx';
import RainfallChart from '../../components/charts/RainfallChart.jsx';
import ResolvedPendingChart from '../../components/charts/ResolvedPendingChart.jsx';
import EmergencyAlertsChart from '../../components/charts/EmergencyAlertsChart.jsx';
import AreaWiseChart from '../../components/charts/AreaWiseChart.jsx';
import Button from '../../components/common/Button.jsx';
import { Download } from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';

export default function Reports() {
  const { data, status, refetch } = useAsync(() => reportService.getSummary(), []);
  const toast = useToast();

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="City-wide analytics on complaints, rainfall and risk trends"
        actions={
          <Button
            variant="secondary"
            icon={Download}
            onClick={() => toast.info('Report export will call the backend export endpoint once available.')}
          >
            Export
          </Button>
        }
      />

      {status === 'loading' && <Loader label="Loading reports..." />}
      {status === 'error' && <ErrorState title="Unable to load reports." onRetry={refetch} />}

      {status === 'success' && data && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <ChartCard title="Complaints Over Time" subtitle="Daily complaint volume, last 7 days">
            <ComplaintsChart data={data.complaintsOverTime} />
          </ChartCard>

          <ChartCard title="Complaint Status Distribution" subtitle="Current breakdown by status">
            <ComplaintsStatusChart data={data.statusDistribution} />
          </ChartCard>

          <ChartCard title="Flood-Risk Areas" subtitle="Relative risk score by area">
            <RiskChart data={data.riskAreas} />
          </ChartCard>

          <ChartCard title="Rainfall Trend" subtitle="Daily rainfall, last 7 days">
            <RainfallChart data={data.rainfallTrend} />
          </ChartCard>

          <ChartCard title="Resolved vs Pending Complaints" subtitle="Monthly comparison">
            <ResolvedPendingChart data={data.resolvedVsPending} />
          </ChartCard>

          <ChartCard title="Emergency Alerts" subtitle="Alerts issued per month">
            <EmergencyAlertsChart data={data.emergencyAlerts} />
          </ChartCard>

          <ChartCard title="Area-wise Complaints" subtitle="Total complaints by ward" className="xl:col-span-2">
            <AreaWiseChart data={data.areaWiseComplaints} />
          </ChartCard>
        </div>
      )}
    </div>
  );
}
