import { contentSecurityPolicy, securityHeaders } from '../utils/security'

export default defineNitroPlugin((nitro) => {
  if (import.meta.dev || import.meta.prerender) return

  // Runs before middleware/route handlers, covering assets, APIs and redirects.
  nitro.hooks.hook('request', (event) => {
    setHeaders(event, { ...securityHeaders, 'content-security-policy': contentSecurityPolicy() })
  })
  nitro.hooks.hook('render:html', (html, { event }) => {
    setHeader(event, 'content-security-policy', contentSecurityPolicy(html))
  })
})
