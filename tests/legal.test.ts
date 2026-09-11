import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { legalContactLinks, legalEnvironmentKey, legalFields, normalizeLegalContact, optionalLegalFields, requiredLegalFields, validateLegalContact } from '../shared/utils/legal'
import { legalFixture } from './fixtures/legal'

describe('legal runtime configuration', () => {
  it('normalizes whitespace without coercing absent values or exposing unknown keys', () => {
    const normalized = normalizeLegalContact({ name: '  Küstenlabor\n Prüfverein  ', email: null, phone: true, secret: 'private', city: {} })
    expect(normalized.name).toBe(legalFixture.name)
    expect(normalized.email).toBe('')
    expect(normalized.phone).toBe('')
    expect(normalized.city).toBe('')
    expect(normalized).not.toHaveProperty('secret')
    expect(Object.values(normalizeLegalContact(undefined))).toEqual(legalFields.map(() => ''))
  })

  it('handles Nitro numeric env parsing while preserving string postal codes with leading zeros', () => {
    const contact = normalizeLegalContact({ houseNumber: 42, postalCode: '01234', registerNumber: 123, phone: Infinity })
    expect(contact.houseNumber).toBe('42')
    expect(contact.postalCode).toBe('01234')
    expect(contact.registerNumber).toBe('123')
    expect(contact.phone).toBe('')
  })

  it('accepts a complete fictional identity with empty optional fields', () => {
    expect(validateLegalContact(legalFixture)).toEqual(legalFixture)
    for (const field of optionalLegalFields) expect(legalFixture[field]).toBe('')
  })

  it.each(requiredLegalFields)('requires %s without disclosing other configured values', (field) => {
    expect(() => validateLegalContact({ ...legalFixture, [field]: ' ' })).toThrow(
      `Invalid legal configuration: ${legalEnvironmentKey(field)}`,
    )
  })

  it.each(['TODO', 'undefined', 'null', 'Example Civic Lab', 'Exampletown', 'Musterstraße', '${LEGAL_NAME}', '{{name}}', '<name>', 'Beispielverein'])('rejects placeholder %s', (name) => {
    expect(() => validateLegalContact({ ...legalFixture, name })).toThrow('NUXT_PUBLIC_LEGAL_NAME')
  })

  it.each(['legal@example.invalid', 'legal@example.com', 'legal@sub.example.org', 'legal@civic.test', 'invalid', 'a@b.de?subject=oops', 'a@b.de\r\nBcc:c@d.de'])('rejects unsafe or example email %s', (email) => {
    expect(() => validateLegalContact({ ...legalFixture, email })).toThrow('NUXT_PUBLIC_LEGAL_EMAIL')
    expect(() => validateLegalContact({ ...legalFixture, email })).not.toThrow(email)
  })

  it('rejects placeholder optional fields and malformed phone links', () => {
    expect(() => validateLegalContact({ ...legalFixture, representedBy: 'TODO' })).toThrow('NUXT_PUBLIC_LEGAL_REPRESENTED_BY')
    expect(() => validateLegalContact({ ...legalFixture, phone: 'javascript:alert(1)' })).toThrow('NUXT_PUBLIC_LEGAL_PHONE')
    expect(legalContactLinks(normalizeLegalContact({ email: 'a@b.de?bcc=evil', phone: 'javascript:1' }))).toEqual({ email: undefined, phone: undefined })
  })

  it('derives escaped email and normalized phone links', () => {
    const contact = normalizeLegalContact({ ...legalFixture, email: 'legal+web@kuestenlabor-pruefverein.de', phone: '+49 (0) 123 / 456-78' })
    expect(legalContactLinks(contact)).toEqual({ email: 'mailto:legal%2Bweb@kuestenlabor-pruefverein.de', phone: 'tel:+49012345678' })
  })

  it('keeps encoded characters in the mailbox distinct from the address separator', () => {
    const contact = normalizeLegalContact({ ...legalFixture, email: 'legal%40web@kuestenlabor-pruefverein.de' })
    expect(legalContactLinks(contact).email).toBe('mailto:legal%2540web@kuestenlabor-pruefverein.de')
  })

  it('documents every field and keeps the development example unfit for production', () => {
    const example = readFileSync('.env.example', 'utf8')
    const fields = [...example.matchAll(/^(NUXT_PUBLIC_LEGAL_\w+)="(.*)"$/gm)]
    expect(fields.map((match) => match[1]).sort()).toEqual(legalFields.map(legalEnvironmentKey).sort())
    const values = Object.fromEntries(fields.map((match) => [match[1], match[2]]))
    const contact = Object.fromEntries(legalFields.map((field) => [field, values[legalEnvironmentKey(field)]]))
    expect(() => validateLegalContact(contact)).toThrow('Invalid legal configuration:')
  })

  it('keeps translated legal prose in Content and runtime identity out of Markdown', () => {
    for (const locale of ['de', 'da', 'en']) {
      for (const key of ['impressum', 'datenschutz']) {
        const source = readFileSync(`content/${locale}/pages/${key}.md`, 'utf8')
        expect(source.match(/::legal-details/g)).toHaveLength(1)
        expect(source).toContain('noindex: true')
        expect(source).not.toMatch(/TODO|undefined|mailto:|NUXT_PUBLIC_|\S+@\S+/)
        expect(source).not.toContain(legalFixture.name)
      }
    }
  })
})
