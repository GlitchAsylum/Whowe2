'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

// Dynamically import react-leaflet components with SSR disabled
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface Location {
  city: string;
  state: string;
  country: string;
}

interface GeocodeResult {
  lat: string;
  lon: string;
  display_name: string;
}

export default function MapPage() {
  const searchParams = useSearchParams();
  const location: Location = {
    city: searchParams.get('city') || '',
    state: searchParams.get('state') || '',
    country: searchParams.get('country') || '',
  };
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [locationName, setLocationName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  // Initialize Leaflet and marker icons after mount
  useEffect(() => {
    // Dynamically import Leaflet only when mounted
    import('leaflet').then((L) => {
      // Fix for Leaflet marker icon
      const DefaultIcon = L.icon({
        iconUrl: '/_next/static/media/marker-icon.2b3e1f7b.png',
        iconRetinaUrl: '/_next/static/media/marker-icon-2x.228667a2.png',
        shadowUrl: '/_next/static/media/marker-shadow.9f0f5a34.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      L.Marker.prototype.options.icon = DefaultIcon;
    });

    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        // Construct the address query
        const addressParts = [
          location.city,
          location.state,
          location.country,
        ].filter((part) => part.trim() !== '');
        if (addressParts.length === 0) {
          setError('No valid location provided');
          return;
        }

        const address = addressParts.join(', ');
        const response = await axios.get<GeocodeResult[]>(
          'https://nominatim.openstreetmap.org/search',
          {
            params: {
              q: address,
              format: 'json',
              limit: 1,
            },
            headers: {
              'User-Agent': 'GrokMap/1.0 (your.email@example.com)',
            },
          }
        );

        if (response.data.length > 0) {
          const result = response.data[0];
          setCoordinates([parseFloat(result.lat), parseFloat(result.lon)]);
          setLocationName(result.display_name);
        } else {
          setError('Location not found');
        }
      } catch (err) {
        setError('Failed to fetch location data');
        console.error(err);
      }
    };

    fetchCoordinates();
  }, [location.city, location.state, location.country]);

  // Construct display location string
  const displayLocation = [
    location.city,
    location.state,
    location.country,
  ].filter((part) => part.trim() !== '').join(', ');

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-8 bg-white/6 p-8 rounded-sm shadow-lg">
          <h1 className="text-3xl font-bold text-white text-center">Location Map</h1>
          <div className="text-center text-white/80">Loading map...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 bg-white/6 p-8 rounded-sm shadow-lg">
        <h1 className="text-3xl font-bold text-white text-center">Location Map</h1>
        {error && (
          <div className="text-sm text-red-600 bg-red-100 p-2 rounded-md text-center" role="alert">
            {error}
          </div>
        )}
        {coordinates ? (
          <div className="w-full h-[500px] rounded-md overflow-hidden">
            <MapContainer
              center={coordinates}
              zoom={10}
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={coordinates}>
                <Popup>{locationName || displayLocation}</Popup>
              </Marker>
            </MapContainer>
          </div>
        ) : (
          !error && (
            <div className="text-center text-white/80">Loading map...</div>
          )
        )}
        <div className="text-center text-white/80 mt-4">
          Location: {displayLocation}
        </div>
      </div>
    </div>
  );
}