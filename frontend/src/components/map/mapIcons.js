import L from 'leaflet';

// Leaflet's default marker images don't resolve correctly under Vite bundling,
// so severity markers are rendered as colored divIcons instead of image pins.
const COLORS = {
  high: '#e0453f',
  warning: '#ea9a1e',
  normal: '#17a869',
  emergency: '#e0453f',
};

export function severityIcon(severity) {
  const color = COLORS[severity] || COLORS.normal;
  return L.divIcon({
    className: '',
    html: `<span style="
      display:block;width:22px;height:22px;border-radius:50% 50% 50% 0;
      background:${color};transform:rotate(-45deg);
      border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.35);
    "></span>`,
    iconSize: [22, 22],
    iconAnchor: [11, 22],
    popupAnchor: [0, -22],
  });
}
