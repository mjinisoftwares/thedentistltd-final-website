import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'type',
      type: 'radio',
      defaultValue: 'upload',
      options: [
        { label: 'Media Upload', value: 'upload' },
        { label: 'Video Link', value: 'video' },
      ],
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'upload' || !siblingData?.type,
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL (e.g. YouTube, Vimeo)',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'video',
      },
    },
    {
      name: 'videoTitle',
      type: 'text',
      label: 'Video Title (SEO)',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'video',
        description: 'Providing a title helps with accessibility and SEO.',
      },
    },
    {
      name: 'videoDescription',
      type: 'textarea',
      label: 'Video Description (SEO)',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'video',
        description: 'Provide a short description for search engines.',
      },
    },
  ],
}
