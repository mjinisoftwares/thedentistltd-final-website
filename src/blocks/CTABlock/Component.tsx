// WhyChooseUsBlockComponent.tsx
import React from 'react'
import Cta from '@/components/CTA'

// Define the props for this block, matching the config.
export type CTABlockProps = {
  heading?: string
  id?: string
}

const CTABlock: React.FC<CTABlockProps> = ({ id }) => {
  return (
    <section id={`block-${id}`}>
      {/* {heading && <h2 className="text-2xl font-semibold mb-4 text-center">{heading}</h2>} */}
      <Cta />
    </section>
  )
}

export default CTABlock
