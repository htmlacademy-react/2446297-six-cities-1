import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import useMap from '../../hooks/useMap';
import { URL_MARKER_DEFAULT } from '../../const';

type CityType = {
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  name: string;
};

type PointType = {
  latitude: number;
  longitude: number;
  zoom: number;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({city, points}: { city: CityType; points: PointType[] }): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  //const currentCustomIcon = leaflet.icon({
  //  iconUrl: URL_MARKER_CURRENT,
  //  iconSize: [40, 40],
  //  iconAnchor: [20, 40],
  //});

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        leaflet.marker({
          lat: point.latitude,
          lng: point.longitude,
        },{
          icon: defaultCustomIcon,
        })
          .addTo(map);
      });
    }
  }, [map, points]);

  return (
    <section className="cities__map map"
      style={{height: '100%'}}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
