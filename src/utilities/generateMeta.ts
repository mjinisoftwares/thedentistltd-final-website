import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/dentist.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: any
}): Promise<Metadata> => {
  const { doc } = args

  if (!doc) {
    return {
      title: 'The Dentist Ltd',
    }
  }

  const meta = doc.meta || {}
  const ogImage = getImageURL(meta.image)

  // Title & Description resolution
  const title = meta.title ? `${meta.title} | The Dentist Ltd` : 'The Dentist Ltd'
  const description = meta.description || ''

  // Robots directives
  const robotsConfig = meta.robots || {}
  const noIndex = !!robotsConfig.noIndex
  const noFollow = !!robotsConfig.noFollow
  const noArchive = !!robotsConfig.noArchive
  const noImageIndex = !!robotsConfig.noImageIndex
  const canonicalOverride = robotsConfig.canonicalURL

  // Social Overrides
  const social = meta.socialOverrides || {}
  const ogTitleResolved = social.ogTitle || title
  const ogDescriptionResolved = social.ogDescription || description
  const twitterTitleResolved = social.twitterTitle || title
  const twitterDescriptionResolved = social.twitterDescription || description
  const twitterCardResolved = social.twitterCard || 'summary_large_image'

  // Location / Geo-targeting
  const location = meta.location || {}
  const latitude = location.latitude
  const longitude = location.longitude
  const placeName = location.placeName

  // Custom Meta Tags & Geo mapping
  const otherMeta: Record<string, string> = {}

  if (latitude && longitude) {
    otherMeta['geo.position'] = `${latitude};${longitude}`
    otherMeta['ICBM'] = `${latitude}, ${longitude}`
    otherMeta['og:latitude'] = latitude
    otherMeta['og:longitude'] = longitude
  }
  if (placeName) {
    otherMeta['geo.placename'] = placeName
  }

  // Parse Custom Meta Tags defined by editor
  if (Array.isArray(meta.customMetaTags)) {
    meta.customMetaTags.forEach((tag: { type: string; key: string; content: string }) => {
      if (tag.key && tag.content) {
        otherMeta[tag.key] = tag.content
      }
    })
  }

  // Construct Robots Metadata
  const robots: Metadata['robots'] = {
    index: !noIndex,
    follow: !noFollow,
    nocache: noArchive,
    googleBot: {
      index: !noIndex,
      follow: !noFollow,
      noimageindex: noImageIndex,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }

  // Construct Alternates (Canonical Link)
  const serverUrl = getServerSideURL()
  const slugPath = Array.isArray(doc.slug) ? doc.slug.join('/') : doc.slug || ''
  
  let canonicalUrl = `${serverUrl}/${slugPath}`
  if (slugPath === 'home' || !slugPath) {
    canonicalUrl = serverUrl
  } else if (doc.collection === 'posts') {
    canonicalUrl = `${serverUrl}/posts/${slugPath}`
  } else if (doc.collection === 'services') {
    canonicalUrl = `${serverUrl}/services/${slugPath}`
  }
  
  if (canonicalOverride) {
    canonicalUrl = canonicalOverride
  }

  const alternates = {
    canonical: canonicalUrl,
  }

  return {
    title,
    description,
    robots,
    alternates,
    openGraph: mergeOpenGraph({
      title: ogTitleResolved,
      description: ogDescriptionResolved,
      images: ogImage ? [{ url: ogImage }] : undefined,
      url: canonicalUrl,
    }),
    twitter: {
      card: twitterCardResolved as any,
      title: twitterTitleResolved,
      description: twitterDescriptionResolved,
      images: ogImage ? [ogImage] : undefined,
    },
    other: otherMeta,
  }
}

