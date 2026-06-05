import React from 'react'

type JsonLdProps = {
  code?: string | null
}

export function JsonLd({ code }: JsonLdProps) {
  if (!code) return null

  let cleanedCode = code.trim()

  // Safely extract the inner JSON string if the user mistakenly wrapped it in <script> tags
  if (cleanedCode.startsWith('<script')) {
    const match = cleanedCode.match(/<script[^>]*>([\s\S]*?)<\/script>/i)
    if (match && match[1]) {
      cleanedCode = match[1].trim()
    }
  }

  // Validate JSON syntax to avoid breaking the client/SSR render
  try {
    JSON.parse(cleanedCode)
  } catch (error) {
    console.error('Invalid JSON-LD format in SEO settings:', error)
    return null
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: cleanedCode }}
    />
  )
}
