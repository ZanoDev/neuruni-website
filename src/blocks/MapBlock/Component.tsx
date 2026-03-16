'use client'

import type { MapBlock as MapBlockProps } from '@/payload-types'

// import for the map, using leaflet library for open street map embedding
import dynamic from 'next/dynamic'

const OSMap = dynamic(() => import('./OSMap'), {
  ssr: false,
})

export const MapBlock: React.FC<MapBlockProps> = (props) => {
  const { position, zoom } = props

  // leaflet inverts lat and lng, so is needed to specify the reverse order of usage
  const leafletPosition: [number, number] = [position[1], position[0]]

  return <OSMap position={leafletPosition} zoom={zoom}></OSMap>
}
