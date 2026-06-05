import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { JsonLd } from '@/components/JsonLd'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    type,
    videoUrl,
    videoTitle,
    videoDescription,
    staticImage,
    disableInnerContainer,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  const isVideo = type === 'video' && videoUrl

  // Basic utility to convert common YouTube/Vimeo links to embed links if needed
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/')
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'www.youtube.com/embed/')
    }
    if (url.includes('vimeo.com/')) {
      return url.replace('vimeo.com/', 'player.vimeo.com/video/')
    }
    return url
  }

  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)
    return match ? match[1] : null
  }

  let schemaData = null
  if (isVideo && videoTitle) {
    const ytId = getYoutubeId(videoUrl as string)
    schemaData = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": videoTitle,
      "description": videoDescription || videoTitle,
      "thumbnailUrl": [
        ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : "https://via.placeholder.com/1280x720.png?text=Video"
      ],
      "uploadDate": "2024-01-01T08:00:00+08:00",
      "embedUrl": getEmbedUrl(videoUrl as string)
    }
  }

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {schemaData && <JsonLd code={JSON.stringify(schemaData)} />}
      {isVideo ? (
        <div className={cn('relative w-full overflow-hidden rounded-[0.8rem] aspect-video border border-border', imgClassName)}>
          <iframe
            src={getEmbedUrl(videoUrl as string)}
            title={(videoTitle as string) || 'Video player'}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        (media || staticImage) && (
          <Media
            imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
            resource={media as any}
            src={staticImage}
          />
        )
      )}
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
