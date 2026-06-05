const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/posts-sitemap.xml', '/pages-sitemap.xml', '/services-sitemap.xml', '/*', '/posts/*', '/services/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/*', '/api/*', '/search'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/*', '/api/*', '/search'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/*', '/api/*', '/search'],
      },
      // Allow AI Scrapers (allow crawling on content)
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin/*', '/api/*', '/search'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/admin/*', '/api/*', '/search'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/admin/*', '/api/*', '/search'],
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/admin/*', '/api/*', '/search'],
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/admin/*', '/api/*', '/search'],
      },
      {
        userAgent: 'Omgili',
        allow: '/',
        disallow: ['/admin/*', '/api/*', '/search'],
      },
      {
        userAgent: 'FacebookBot',
        allow: '/',
        disallow: ['/admin/*', '/api/*', '/search'],
      },
      {
        userAgent: 'Bytespider',
        allow: '/',
        disallow: ['/admin/*', '/api/*', '/search'],
      },
      {
        userAgent: 'Diffbot',
        allow: '/',
        disallow: ['/admin/*', '/api/*', '/search'],
      },
      {
        userAgent: 'cohere-ai',
        allow: '/',
        disallow: ['/admin/*', '/api/*', '/search'],
      },
      // Allow real-time search queries by AI assistants (to provide citations/answers)
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/admin/*', '/api/*', '/search'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/admin/*', '/api/*', '/search'],
      },
    ],
    additionalSitemaps: [
      `${SITE_URL}/pages-sitemap.xml`,
      `${SITE_URL}/posts-sitemap.xml`,
      `${SITE_URL}/services-sitemap.xml`
    ],
  },
}

