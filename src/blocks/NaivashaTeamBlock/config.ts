import type { Block } from 'payload'

export const NaivashaTeamBlock: Block = {
  slug: 'naivashaTeamBlock',
  interfaceName: 'NaivashaTeamBlock',
  labels: {
    singular: 'Naivasha Team Block',
    plural: 'Naivasha Team Blocks',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      defaultValue: 'Team',
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Our Naivasha Team',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'During the working process, we perform regular fitting with the client because he is the only person who can feel whether a new suit fits or not.',
      required: true,
    },
    {
      name: 'members',
      type: 'relationship',
      relationTo: 'naivasha-team',
      hasMany: true,
      required: true,
      label: 'Select Team Members',
    },
  ],
}
