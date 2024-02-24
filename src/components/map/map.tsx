import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import useMap from '../../hooks/useMap';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import { City } from '../../types/offer';

type PointType = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type MapProps = {
  city: City;
  points: PointType[];
  selectedPoint: PointType;
  className:string;
  mapHeight?:string;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [20, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [20, 40],
});

function Map({city, points, selectedPoint, className, mapHeight}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const height = mapHeight ? mapHeight : '100%';

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        leaflet.marker({
          lat: point.latitude,
          lng: point.longitude,
        },{
          icon: (point.latitude === selectedPoint.latitude && point.longitude === selectedPoint.longitude)
            ? currentCustomIcon
            : defaultCustomIcon,
        })
          .addTo(map);
      });

      return () => {
        map.eachLayer((layer) => {
          if (layer instanceof leaflet.Marker) {
            layer.remove();
          }
        });
      };
    }
  }, [map, points, selectedPoint]);

  return (
    <section className={`${className} map`}
      style={{height: height}}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
