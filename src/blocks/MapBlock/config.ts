import type { Block } from 'payload'

export const MapBlock: Block = {
  slug: 'mapBlock',
  interfaceName: 'MapBlock',
  fields: [
    {
      name: 'position',
      label: 'Posizione',
      type: 'point',
      required: true,
    },
    {
      name: 'zoom',
      label: 'Zoom (min 0, max 19, consigliato 17)',
      type: 'number',
      required: true,
    },
  ],
}
