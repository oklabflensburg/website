import { validateLegalContact } from '#shared/utils/legal'

export default defineNitroPlugin(() => {
  // Compile-time dev flag: setting NODE_ENV on a built server cannot bypass this.
  // Content's internal SQL prerender runs during build without deployment config.
  if (import.meta.dev || import.meta.prerender) return
  // Nitro rethrows synchronous plugin failures before the node-server listens.
  validateLegalContact(useRuntimeConfig().public.legal)
})
