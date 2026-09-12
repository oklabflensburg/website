import { site } from '../config/site'

function httpUrl(href: string | undefined, base: string) {
  if (!href) return undefined
  try {
    const url = new URL(href, base)
    return ['http:', 'https:'].includes(url.protocol) ? url : undefined
  } catch {
    return undefined
  }
}

export function isExternalUrl(href?: string, base: string = site.url) {
  const url = httpUrl(href, base)
  return !!url && url.origin !== new URL(base).origin
}

// Only complete internal routes enter Markdown's translation lookup. Relative
// links and fragment-only links retain their current-document semantics.
export function internalLinkPath(href?: string) {
  if (!href || !/^(?:\/|https?:)/i.test(href)) return undefined
  const url = httpUrl(href, site.url)
  if (!url || isExternalUrl(href)) return undefined
  return url.pathname + url.search + url.hash
}

export function linkAttributes(href?: string, rel?: string) {
  const external = isExternalUrl(href)
  const tokens = (rel ?? '').split(/\s+/).filter((token) => token && !['opener', 'noopener', 'noreferrer'].includes(token.toLowerCase()))
  if (external) tokens.push('noopener', 'noreferrer')
  return { target: external ? '_blank' : undefined, rel: [...new Set(tokens)].join(' ') || undefined }
}
