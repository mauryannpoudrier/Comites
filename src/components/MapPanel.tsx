import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Topic } from '../types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Props {
  topics: Topic[];
}

export function MapPanel({ topics }: Props) {
  if (!topics.length) {
    return null;
  }

  const center = topics[0].location
    ? [topics[0].location.latitude, topics[0].location.longitude]
    : [48.108, -77.797];

  return (
    <section className="card map-card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Cartographie</p>
          <h2>Points géographiques</h2>
        </div>
      </div>
      <MapContainer center={center as [number, number]} zoom={12} style={{ height: '320px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {topics
          .filter((topic) => topic.location)
          .map((topic) => (
            <Marker key={topic.id} position={[topic.location!.latitude, topic.location!.longitude]} icon={icon}>
              <Popup>
                <strong>{topic.title}</strong>
                <p>{topic.location?.label}</p>
                {topic.resolutionNumber && <p>Résolution: {topic.resolutionNumber}</p>}
                {topic.commentaryNumber && <p>Commentaire: {topic.commentaryNumber}</p>}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </section>
  );
}
