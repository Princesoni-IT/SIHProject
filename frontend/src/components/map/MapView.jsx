import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MapMarker from './MapMarker.jsx';
import MapLegend from './MapLegend.jsx';

const DEFAULT_CENTER = [25.612, 85.101]; // City center placeholder — replace once backend supplies real geodata

export default function MapView({ locations = [], height = 420, center = DEFAULT_CENTER, zoom = 12, onSelect, showLegend = true }) {
  return (
    <div className="relative rounded-xl overflow-hidden border border-surface-200" style={{ height }}>
      <MapContainer center={center} zoom={zoom} zoomControl={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        {locations.map((loc) => (
          <MapMarker key={loc.id} location={loc} onSelect={onSelect} />
        ))}
      </MapContainer>
      {showLegend && <MapLegend />}
    </div>
  );
}
