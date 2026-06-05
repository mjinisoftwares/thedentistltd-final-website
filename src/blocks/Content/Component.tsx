'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'

import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export const ContentBlock: React.FC<ContentBlockProps> = ({
  sectionTitle,
  sectionSubtitle,
  cardStyle = 'soft',
  columns,
}) => {
  const colsSpanClasses: Record<string, string> = {
    full: 'lg:col-span-12',
    half: 'lg:col-span-6',
    oneThird: 'lg:col-span-4',
    twoThirds: 'lg:col-span-8',
  }

  const cardStyles: Record<string, string> = {
    none: '',

    soft: `
      bg-card/70
      backdrop-blur-xl
      border
      border-border/60
      shadow-sm
      hover:shadow-xl
      hover:border-primary/20
    `,

    bordered: `
      bg-background
      border
      border-border
      shadow-sm
      hover:shadow-lg
      hover:border-primary/20
    `,

    elevated: `
      bg-background
      border
      border-border/70
      shadow-lg
      hover:shadow-2xl
      hover:border-primary/30
    `,
  }

  return (
    <section className="relative overflow-hidden border-t border-border py-20 md:py-28 lg:py-32">
      <div className="container">
        {(sectionTitle || sectionSubtitle) && (
          <div className="mx-auto mb-12 max-w-4xl text-center lg:mb-4">
            {sectionTitle && <h2 className="text-4xl font-bold leading-normal ">{sectionTitle}</h2>}

            {sectionSubtitle && (
              <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {sectionSubtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {columns?.map((col, index) => {
            const { size, richText, enableLink, link, enableImage, image } = col

            const safeSize = size || 'oneThird'
            const safeCardStyle = cardStyle || 'soft'

            return (
              <motion.div
                key={index}
                custom={index}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className={cn('col-span-1', colsSpanClasses[safeSize])}
              >
                <div
                  className={cn(
                    'group relative h-full overflow-hidden rounded-3xl transition-all duration-500',
                    'p-6 md:p-8 lg:p-10',
                    cardStyles[safeCardStyle],
                    safeCardStyle !== 'none' && 'hover:-translate-y-2 hover:scale-[1.01]',
                  )}
                >
                  {/* Hover Glow */}
                  {safeCardStyle !== 'none' && (
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
                    </div>
                  )}

                  <div className="relative z-10 flex h-full flex-col">
                    {/* Image */}
                    {enableImage && image && (
                      <div className="mb-8 overflow-hidden rounded-2xl border border-border/50">
                        <Media
                          resource={image}
                          className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}

                    {/* Content */}
                    {richText && (
                      <RichText
                        data={richText}
                        enableGutter={false}
                        className={cn(
                          `
                          prose max-w-none dark:prose-invert

                          prose-headings:tracking-tight
                          prose-headings:text-foreground

                          prose-h1:mb-4
                          prose-h1:text-3xl
                          prose-h1:font-bold
                          md:prose-h1:text-4xl

                          prose-h2:mb-4
                          prose-h2: leading-normal
                          prose-h2:text-2xl
                          prose-h2:font-semibold
                          md:prose-h2:text-3xl

                          prose-h3:mb-3
                          prose-h3:text-2xl
                          prose-h3:font-semibold
                          prose-h3:text-primary
                          md:prose-h3:text-3xl

                          prose-p:mb-4
                          prose-p:text-base
                          prose-p:leading-relaxed
                          prose-p:text-muted-foreground

                          prose-ul:my-4
                          prose-ul:space-y-2

                          prose-li:text-muted-foreground
                          prose-li:leading-relaxed

                          prose-strong:text-foreground

                          [&_a]:font-medium
                          [&_a]:text-primary
                          [&_a]:no-underline
                          [&_a]:transition-colors
                          hover:[&_a]:text-primary/80
                          `,
                        )}
                      />
                    )}

                    {/* Link */}
                    {enableLink && link && (
                      <div className="mt-auto pt-8">
                        <div className="border-t border-border/50 pt-6">
                          <CMSLink
                            {...link}
                            className="
                              inline-flex
                              items-center
                              gap-2
                              font-medium
                              text-primary
                              transition-all
                              duration-300
                              hover:gap-3
                            "
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
