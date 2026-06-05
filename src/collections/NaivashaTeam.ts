import { CollectionConfig } from 'payload'

export const NaivashaTeam: CollectionConfig = {
  slug: 'naivasha-team',
  access: {},
  admin: {
    defaultColumns: ['name', 'position', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'position',
      type: 'text',
      required: true,
    },
    {
      name: 'Branch',
      type: 'text',
    },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
