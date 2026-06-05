// config.ts
import type { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'ctaBlock',
  interfaceName: 'CTABlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      required: false,
    },
  ],
  labels: {
    singular: 'CTA Section',
    plural: 'CTA Sections',
  },
}

export default CTABlock
