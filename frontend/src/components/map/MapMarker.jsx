import { Marker, Popup } from 'react-leaflet';
import { severityIcon } from './mapIcons.js';

export default function MapMarker({ location, onSelect }) {
  const { lat, lng, title, location: place, severity } = location;
  return (
    <Marker
      position={[lat, lng]}
      icon={severityIcon(severity)}
      eventHandlers={{ click: () => onSelect?.(location) }}
    >
      <Popup>
        <div className="text-sm">
          <p className="font-semibold text-navy-900">{title}</p>
          <p className="text-slate-500">{place}</p>
        </div>
      </Popup>
    </Marker>
  );
}
