import { Field } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const seoFields: Field[] = [
  OverviewField({
    titlePath: 'meta.title',
    descriptionPath: 'meta.description',
    imagePath: 'meta.image',
  }),
  MetaTitleField({
    hasGenerateFn: true,
  }),
  MetaImageField({
    relationTo: 'media',
  }),
  MetaDescriptionField({}),
  PreviewField({
    // if the `generateUrl` function is configured
    hasGenerateFn: true,

    // field paths to match the target field for data
    titlePath: 'meta.title',
    descriptionPath: 'meta.description',
  }),
  {
    name: 'location',
    type: 'group',
    label: 'Location / Geo-targeting',
    admin: {
      description: 'Specify geographical targeting metadata.',
    },
    fields: [
      {
        name: 'latitude',
        type: 'text',
        admin: {
          placeholder: 'e.g. -0.303099',
        },
      },
      {
        name: 'longitude',
        type: 'text',
        admin: {
          placeholder: 'e.g. 36.061386',
        },
      },
      {
        name: 'placeName',
        type: 'text',
        label: 'Place Name (City/Region)',
        admin: {
          placeholder: 'e.g. Nakuru, Kenya',
        },
      },
    ],
  },
  {
    name: 'robots',
    type: 'group',
    label: 'Robots Directives',
    admin: {
      description: 'Manage indexing directives for search engine crawlers.',
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'noIndex',
            type: 'checkbox',
            label: 'No Index (Prevent search engines from indexing)',
            defaultValue: false,
          },
          {
            name: 'noFollow',
            type: 'checkbox',
            label: 'No Follow (Prevent search engines from following links)',
            defaultValue: false,
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'noArchive',
            type: 'checkbox',
            label: 'No Archive (Do not cache / show cached link)',
            defaultValue: false,
          },
          {
            name: 'noImageIndex',
            type: 'checkbox',
            label: 'No Image Index (Do not index images on this page)',
            defaultValue: false,
          },
        ],
      },
      {
        name: 'canonicalURL',
        type: 'text',
        label: 'Canonical URL Override',
        admin: {
          description: 'Provide an absolute URL if this page is a duplicate of another.',
        },
      },
    ],
  },
  {
    name: 'socialOverrides',
    type: 'group',
    label: 'Social Media Overrides (OG & Twitter)',
    admin: {
      description: 'Override general SEO metadata specifically for Facebook/OpenGraph and Twitter.',
    },
    fields: [
      {
        name: 'ogTitle',
        type: 'text',
        label: 'OpenGraph Title Override',
      },
      {
        name: 'ogDescription',
        type: 'textarea',
        label: 'OpenGraph Description Override',
      },
      {
        name: 'twitterCard',
        type: 'select',
        label: 'Twitter Card Type',
        options: [
          { label: 'Summary', value: 'summary' },
          { label: 'Summary with Large Image', value: 'summary_large_image' },
          { label: 'App', value: 'app' },
          { label: 'Player', value: 'player' },
        ],
        defaultValue: 'summary_large_image',
      },
      {
        name: 'twitterTitle',
        type: 'text',
        label: 'Twitter Title Override',
      },
      {
        name: 'twitterDescription',
        type: 'textarea',
        label: 'Twitter Description Override',
      },
    ],
  },
  {
    name: 'customMetaTags',
    type: 'array',
    label: 'Custom Meta Tags',
    admin: {
      description: 'Define custom meta tags (e.g., custom og:title, theme-color, verify tokens, etc.)',
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'select',
            options: [
              { label: 'name (e.g. twitter:site, theme-color)', value: 'name' },
              { label: 'property (e.g. og:title, fb:app_id)', value: 'property' },
              { label: 'http-equiv (e.g. refresh)', value: 'http-equiv' },
            ],
            required: true,
            defaultValue: 'name',
          },
          {
            name: 'key',
            type: 'text',
            label: 'Key Name',
            required: true,
          },
          {
            name: 'content',
            type: 'text',
            label: 'Content Value',
            required: true,
          },
        ],
      },
    ],
  },
  {
    name: 'jsonLD',
    type: 'textarea',
    label: 'Custom JSON-LD (Structured Data)',
    admin: {
      description: 'Provide valid JSON-LD structured data. Wrap the JSON object inside <script type="application/ld+json"> tag contents.',
      rows: 6,
    },
  },
]
