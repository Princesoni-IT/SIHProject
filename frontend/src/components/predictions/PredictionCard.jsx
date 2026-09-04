import { Droplets, Gauge, Clock, Target } from 'lucide-react';
import Badge from '../common/Badge.jsx';

export default function PredictionCard({ prediction }) {
  const { area, floodProbability, riskLevel, predictedWaterLevel, expectedRainfall, predictionWindow, confidence } = prediction;

  return (
    <div className="card-surface p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">Flood Probability</p>
          <p className="text-3xl font-bold text-navy-900">{floodProbability}%</p>
        </div>
        <Badge label={riskLevel} tone={riskLevel === 'Low' ? 'safe' : riskLevel === 'Medium' ? 'warning' : 'danger'} />
      </div>

      <p className="text-sm font-medium text-navy-800">{area}</p>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <Metric icon={Droplets} label="Predicted Water Level" value={predictedWaterLevel} />
        <Metric icon={Gauge} label="Expected Rainfall" value={expectedRainfall} />
        <Metric icon={Clock} label="Prediction" value={predictionWindow} />
        <Metric icon={Target} label="Confidence" value={`${confidence}%`} />
      </div>

      <div className="w-full h-1.5 rounded-full bg-surface-100 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${floodProbability}%`,
            background:
              riskLevel === 'Low' ? 'var(--color-safe-500)' : riskLevel === 'Medium' ? 'var(--color-warn-500)' : 'var(--color-danger-500)',
          }}
        />
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2">
      <Icon size={15} className="text-royal-400 mt-0.5 shrink-0" />
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="font-medium text-navy-800">{value}</p>
      </div>
    </div>
  );
}
