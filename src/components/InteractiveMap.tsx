import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapStay {
  id: number;
  name: string;
  type: string;
  location: string;
  price: number;
  rating: number;
  img: string;
  lat: number;
  lng: number;
}

export const defaultMapStays: MapStay[] = [
  {
    id: 2,
    type: 'Chalet',
    name: 'Alpine Ridge Chalet',
    location: 'Chamonix, France',
    price: 749,
    rating: 4.8,
    img: 'location01.png',
    lat: 45.9237,
    lng: 6.8694,
  },
  {
    id: 1,
    type: 'Lodge',
    name: 'Northern Lights Lodge',
    location: 'Abisko, Sweden',
    price: 569,
    rating: 4.9,
    img: 'location01.png',
    lat: 46.035,
    lng: 7.18,
  },
  {
    id: 3,
    type: 'Chalet',
    name: 'Glacier Edge Chalet',
    location: 'Zermatt, Switzerland',
    price: 899,
    rating: 5.0,
    img: 'location02.png',
    lat: 45.9765,
    lng: 7.7491,
  },
  {
    id: 4,
    type: 'Retreat',
    name: 'Nordic Forest Retreat',
    location: 'Rovaniemi, Finland',
    price: 319,
    rating: 4.7,
    img: 'location01.png',
    lat: 45.87,
    lng: 7.02,
  },
  {
    id: 5,
    type: 'Cabin',
    name: 'The Snowy Pine Cabin',
    location: 'Lapland, Finland',
    price: 289,
    rating: 4.9,
    img: 'location01.png',
    lat: 45.83,
    lng: 7.42,
  },
];

export default function InteractiveMap({
  stays = defaultMapStays,
  className = '',
}: {
  stays?: MapStay[];
  className?: string;
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Initialize Leaflet map
    const map = L.map(mapContainerRef.current, {
      center: [45.95, 7.3],
      zoom: 10,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    mapInstanceRef.current = map;

    // CartoDB Voyager Tile Layer
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }
    ).addTo(map);

    // Add Stay Price Markers
    const bounds: [number, number][] = [];

    stays.forEach((s) => {
      bounds.push([s.lat, s.lng]);

      const priceIcon = L.divIcon({
        className: 'custom-map-price-marker',
        html: `
          <div style="
            background: #ffffff;
            color: #071D36;
            font-weight: 700;
            font-size: 12px;
            padding: 5px 12px;
            border-radius: 9999px;
            box-shadow: 0 4px 14px rgba(0,0,0,0.22);
            border: 1px solid rgba(0,0,0,0.08);
            cursor: pointer;
            white-space: nowrap;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            letter-spacing: -0.2px;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          " onmouseover="this.style.background='#071D36'; this.style.color='#ffffff'; this.style.transform='scale(1.1)';" onmouseout="this.style.background='#ffffff'; this.style.color='#071D36'; this.style.transform='scale(1)';">
            €${s.price}
          </div>
        `,
        iconSize: [60, 28],
        iconAnchor: [30, 14],
      });

      const marker = L.marker([s.lat, s.lng], { icon: priceIcon }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: inherit; width: 195px; padding: 2px;">
          <div style="width: 100%; height: 96px; border-radius: 10px; overflow: hidden; margin-bottom: 8px;">
            <img src="/images/${s.img}" style="width: 100%; height: 100%; object-fit: cover;" alt="${s.name}" />
          </div>
          <div style="font-size: 11px; color: #8896a6; font-weight: 500;">${s.type} · ${s.location}</div>
          <div style="font-size: 13px; font-weight: 700; color: #071D36; margin: 2px 0;">${s.name}</div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px;">
            <span style="font-weight: 700; font-size: 13px; color: #071D36;">€${s.price} <span style="font-size: 11px; font-weight: 400; color: #8896a6;">/night</span></span>
            <a href="/stays/${s.id}" style="color: #0284c7; font-weight: 600; font-size: 11px; text-decoration: underline;">View</a>
          </div>
        </div>
      `);
    });

    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
    }

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [stays]);

  return (
    <div
      ref={mapContainerRef}
      className={`w-full h-full z-10 ${className}`}
      style={{ minHeight: '460px' }}
    />
  );
}
