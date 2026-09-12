import { createHash } from 'node:crypto'
import { site } from '../../shared/config/site'

export const securityHeaders = {
  'referrer-policy': 'strict-origin-when-cross-origin',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'permissions-policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'cross-origin-opener-policy': 'same-origin',
} as const

function hash(source: string) {
  return `'sha256-${createHash('sha256').update(source).digest('base64')}'`
}

export function contentSecurityPolicy(html?: { head: string[], body: string[], bodyAppend: string[], bodyPrepend: string[] }) {
  const scriptHashes = new Set<string>()
  const styleHashes = new Set<string>()
  const attributeHashes = new Set<string>()
  if (html) {
    // These are Nuxt/Unhead's trusted tag slots, not rendered Content bodies.
    // Never authorize arbitrary script elements found inside page content.
    for (const chunk of [...html.head, ...html.bodyAppend]) {
      for (const [, attributes, source] of chunk.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\b[^>]*>/gi)) {
        if (source && !/\bsrc\s*=|\btype=["']application\/(?:ld\+)?json["']/i.test(attributes!)) scriptHashes.add(hash(source))
      }
      for (const [, source] of chunk.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style\b[^>]*>/gi)) styleHashes.add(hash(source!))
    }
    // Vue v-show and NuxtRouteAnnouncer emit inline style attributes. Authorize
    // their exact rendered values, without enabling arbitrary inline styles.
    for (const chunk of [...html.head, ...html.bodyPrepend, ...html.body, ...html.bodyAppend]) {
      for (const [, source] of chunk.matchAll(/\bstyle="([^"]*)"/g)) attributeHashes.add(hash(source!))
    }
  }
  const analyticsOrigin = new URL(site.analytics.script).origin
  return [
    "default-src 'self'",
    `script-src 'self' 'wasm-unsafe-eval' ${analyticsOrigin} ${[...scriptHashes].join(' ')}`.trim(),
    "script-src-attr 'none'",
    `style-src 'self' ${[...styleHashes].join(' ')}`.trim(),
    attributeHashes.size ? `style-src-attr 'unsafe-hashes' ${[...attributeHashes].join(' ')}` : "style-src-attr 'none'",
    `connect-src 'self' ${analyticsOrigin}`,
    "img-src 'self'",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'none'",
    "frame-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
  ].join('; ')
}
