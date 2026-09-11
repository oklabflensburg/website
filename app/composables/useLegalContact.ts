import { legalContactLinks, normalizeLegalContact } from '#shared/utils/legal'

export function useLegalContact() {
  const contact = normalizeLegalContact(useRuntimeConfig().public.legal)
  return { contact, links: legalContactLinks(contact) }
}
