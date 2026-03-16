'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'

type MapProps = {
  position: [number, number]
  zoom: number
}

export default function Map({ position, zoom }: MapProps) {
  return (
    <MapContainer
      key={zoom}
      center={position}
      zoom={zoom}
      className="h-[700px] w-[60%] mx-auto rounded-xl border-4 border-gray-500 overflow-hidden"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>NeurUni Social Club</Popup>
      </Marker>
    </MapContainer>
  )
}
