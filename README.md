# OK Lab Flensburg Website

Mehrsprachige Nuxt-4-Website des OK Lab Flensburg. Sie stellt reale Civic-Tech- und Open-Data-Projekte vor und erleichtert neuen ehrenamtlichen Contributor aus GIS, PostGIS, OpenStreetMap, Python/FastAPI sowie Nuxt/TypeScript den Einstieg.

## Tech-Stack

- Nuxt 4, Vue 3 und TypeScript
- `@nuxtjs/i18n` 10 mit lazy geladenen Übersetzungen
- Tailwind CSS 4 und die vorhandene Manrope-Schrift
- Vitest für Struktur-, Routing- und Datenlogiktests
- statische Generierung über Nitro

Erforderlich sind Node.js 22 und pnpm 10.

## Lokal entwickeln

```bash
corepack enable
pnpm install
pnpm dev
```

Qualitätsprüfungen:

```bash
pnpm typecheck
pnpm test
pnpm generate
```

Das statische Ergebnis liegt anschließend in `.output/public`.

## Sprachen und Routen

Deutsch (`de`) ist die Fallback- und Standardsprache. Alle Sprachen haben bewusst ein URL-Präfix:

- `/de`, `/da`, `/en`
- `/de/mitwirkende`, `/da/bidragsydere`, `/en/contributors`

`/` wird serverseitig beziehungsweise im statischen Hosting mit Status 301 auf `/de` weitergeleitet. Die Übersetzungen liegen getrennt in `i18n/locales/`; `i18n/i18n.config.ts` enthält die Vue-i18n-Konfiguration. Der Sprachumschalter nutzt die von Nuxt i18n erzeugte Entsprechung der aktuellen Route und speichert die Auswahl in einem datensparsamen First-Party-Cookie.

## Inhalte

Strukturierte Projekte und Technologiepfade liegen typisiert in `app/data/projects.ts`. Die Projekt-Slugs sind sprachunabhängig. Bilder, Logos und die Manrope-Webfonts aus der früheren Parcel-Seite bleiben erhalten. Die vorhandenen Rechtstexte unter `src/` werden als Legacy-Public-Assets unter `/legacy/` ausgeliefert und wurden nicht inhaltlich verändert.

## Contributor-Daten aktualisieren

Die Website fragt GitHub nicht im Browser ab. `scripts/update-contributors.ts` ermittelt öffentliche Commit-Autor:innen aus den in `contributors.config.json` ausgewählten OK-Lab-Repositories für einen rollierenden Zeitraum von 24 Monaten. Das Ergebnis wird lokal nach `app/data/contributors.json` geschrieben.

```bash
pnpm contributors:update
```

Ohne Token gelten die öffentlichen GitHub-API-Limits. Optional kann ein Token ausschließlich für das lokale Skript gesetzt werden:

```bash
cp .env.example .env
# GITHUB_TOKEN in der Shell laden und dann das Skript ausführen
```

Der Token darf niemals `NUXT_PUBLIC_` heißen und wird weder in den Client-Build noch in die JSON-Datei oder Logs geschrieben. Schlägt ein API-Aufruf fehl oder ergibt er keine gültigen Personen, bleibt die letzte gültige lokale Datei unverändert.

Datenschutzregeln:

- nur öffentliche GitHub-Logins, Anzeigenamen, Profil-/Avatar-URLs und Repository-Zuordnungen;
- keine Commit-E-Mail-Adressen oder Daten außerhalb des öffentlichen GitHub-Profils;
- Deduplizierung ohne Beachtung der Groß-/Kleinschreibung;
- Ausschluss von Dependabot, Renovate, GitHub Actions, Copilot und weiteren Bot-Logins;
- `exclude` in `contributors.config.json` dient Opt-outs, `manual` dokumentierten Ergänzungen und `featured` der redaktionellen Auswahl;
- Korrekturen und Opt-outs können per Kontaktmail oder Issue angefordert werden.

Die Zahl der Beiträge wird technisch gespeichert, aber nicht als Rangliste angezeigt. Featured-Einträge stehen zuerst, danach wird neutral nach Login sortiert.

## Deployment und CI

GitHub Actions installiert mit Node.js 22 und `pnpm install --frozen-lockfile`, führt Typecheck und Tests aus und generiert anschließend die statische Website. Das Hosting muss `.output/public` veröffentlichen und die generierte Root-Weiterleitung ausliefern. Lighthouse und CodeQL beobachten die Nuxt-/TypeScript-Dateien.

## Noch offen

- Projektstatus und externe Ziele sollten redaktionell regelmäßig mit GitHub und codefor.de abgeglichen werden.
- Die erhaltenen deutschen Rechtstexte stammen aus der Parcel-Seite und sollten juristisch sowie technisch separat geprüft und langfristig in das Nuxt-Layout migriert werden.
- Dänische Fachformulierungen sollten nach Möglichkeit von einer muttersprachlichen Person gegengelesen werden.
