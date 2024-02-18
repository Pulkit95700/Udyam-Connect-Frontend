import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = () => {
  const center = [51.505, -0.09]; // Coordinates for the map center

  return (
    <MapContainer center={center} zoom={1} style={{ height: '100px', width: '100px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Add a marker with a popup */}
      <Marker position={center}>
        <Popup>
          A sample marker on the map.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;