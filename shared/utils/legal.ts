export const requiredLegalFields = [
  'name', 'street', 'houseNumber', 'postalCode', 'city', 'country', 'email',
] as const
export const optionalLegalFields = [
  'phone', 'representedBy', 'registerCourt', 'registerNumber', 'vatId',
  'privacyContactPerson', 'contentResponsible',
] as const
export const legalFields = [...requiredLegalFields, ...optionalLegalFields]
export type LegalField = (typeof legalFields)[number]
export type LegalContact = Record<LegalField, string>

export function legalEnvironmentKey(field: LegalField) {
  return `NUXT_PUBLIC_LEGAL_${field.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase()}`
}

/** Ignore unexpected types and keys; never stringify objects or missing values. */
export function normalizeLegalContact(input: unknown): LegalContact {
  const source = input && typeof input === 'object' ? input as Record<string, unknown> : {}
  return Object.fromEntries(legalFields.map((field) => {
    const value = source[field]
    // Nitro parses numeric environment strings using destr (e.g. house number).
    const numeric = ['houseNumber', 'postalCode', 'phone', 'registerNumber'].includes(field)
      && typeof value === 'number' && Number.isFinite(value)
    return [field, typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : numeric ? String(value) : '']
  })) as LegalContact
}

const emailPattern = /^[a-z0-9.!#$%&'*+/=_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i
const phonePattern = /^\+?[\d ()/.-]+$/
const placeholderPattern = /\b(?:todo|tbd|undefined|null|placeholder|changeme|replace[-_ ]?me|example\w*|muster\w*|beispiel\w*|test|demo)\b|[<>]|\$\{|\{\{|\[(?:your|insert)|(?:^|[@.])(?:localhost|invalid|example|test)(?:$|[./])|@(?:[^@]+\.)?example\.(?:com|org|net)$/i

/** Technical completeness only; cannot establish that a legal identity is true. */
export function validateLegalContact(input: unknown): LegalContact {
  const contact = normalizeLegalContact(input)
  const invalid = new Set<LegalField>()
  for (const field of requiredLegalFields) {
    if (!contact[field]) invalid.add(field)
  }
  for (const field of legalFields) {
    if (contact[field] && placeholderPattern.test(contact[field])) invalid.add(field)
  }
  if (!emailPattern.test(contact.email)) invalid.add('email')
  if (contact.phone && (!phonePattern.test(contact.phone) || contact.phone.replace(/\D/g, '').length < 5)) invalid.add('phone')
  if (/^0+$/.test(contact.postalCode)) invalid.add('postalCode')
  if (invalid.size) {
    // Field names only: this error is safe to include in server startup logs.
    throw new Error(`Invalid legal configuration: ${[...invalid].map(legalEnvironmentKey).join(', ')}`)
  }
  return contact
}

export function legalContactLinks(contact: LegalContact) {
  const [localPart = '', domain = ''] = contact.email.split('@')
  return {
    email: emailPattern.test(contact.email) ? `mailto:${encodeURIComponent(localPart)}@${encodeURIComponent(domain)}` : undefined,
    phone: phonePattern.test(contact.phone) && contact.phone.replace(/\D/g, '').length >= 5
      ? `tel:${contact.phone.replace(/[^\d+]/g, '')}` : undefined,
  }
}
