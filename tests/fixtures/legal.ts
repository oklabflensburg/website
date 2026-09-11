import { legalEnvironmentKey, normalizeLegalContact, type LegalContact } from '../../shared/utils/legal'

// Entirely invented, never an operator record. Plausible syntax exercises the
// production gate without a test bypass; validation cannot verify real identity.
export const legalFixture = normalizeLegalContact({
  name: 'Küstenlabor Prüfverein',
  street: 'Hafenweg',
  houseNumber: '42',
  postalCode: '12345',
  city: 'Küstenstadt',
  country: 'Deutschland',
  email: 'kontakt@kuestenlabor-pruefverein.de',
  hostingProviderName: 'Wolkenhafen Rechenbetrieb',
  hostingProviderStreet: 'Dünenallee',
  hostingProviderHouseNumber: '7',
  hostingProviderPostalCode: '23456',
  hostingProviderCity: 'Wolkenstadt',
  hostingProviderCountry: 'Deutschland',
  hostingDpa: true,
})

export function legalFixtureEnvironment(overrides: Partial<Record<keyof LegalContact, string | boolean>> = {}) {
  return {
    // Prevent inherited parent-object config from contaminating the fixtures.
    NUXT_PUBLIC: '{}',
    NUXT_PUBLIC_LEGAL: '{}',
    ...Object.fromEntries(Object.entries({ ...legalFixture, ...overrides }).map(([field, value]) => [
      legalEnvironmentKey(field as keyof LegalContact), String(value),
    ])),
  }
}
