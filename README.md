# OK Lab Flensburg – Open Data, Civic Tech, GIS & Open Source

[![Website](https://img.shields.io/badge/Website-oklabflensburg.de-0b4f80)](https://oklabflensburg.de)
[![Code for Germany](https://img.shields.io/badge/Network-Code%20for%20Germany-0b4f80)](https://codefor.de/flensburg/)
[![License: CC0 1.0](https://img.shields.io/badge/License-CC0%201.0-success.svg)](LICENSE)

**OK Lab Flensburg** ist eine offene Civic-Tech-Community für **Open Data, GIS, Geodaten, Open Source und digitale Stadtentwicklung in Flensburg und Schleswig-Holstein**. Wir entwickeln ehrenamtlich freie digitale Werkzeuge, Karten, WebGIS-Anwendungen und Datenprojekte, die öffentliche Informationen leichter zugänglich, verständlich und nutzbar machen.

Die Website unter **[oklabflensburg.de](https://oklabflensburg.de)** stellt das Lab, seine Projekte, Veranstaltungen, Blogbeiträge und Möglichkeiten zum digitalen Ehrenamt vor. Sie ist auf **Deutsch, Dänisch und Englisch** verfügbar.

- 🌐 **Website:** [oklabflensburg.de](https://oklabflensburg.de)
- 🗺️ **Projekte:** [oklabflensburg.de/projekte](https://oklabflensburg.de/projekte)
- 💻 **GitHub:** [github.com/oklabflensburg](https://github.com/oklabflensburg)
- 🐘 **Fediverse:** [@oklabflensburg@norden.social](https://norden.social/@oklabflensburg)
- 🌍 **Netzwerk:** [Code for Germany](https://codefor.de/flensburg/)

## Über das OK Lab Flensburg

Das OK Lab Flensburg bringt Menschen zusammen, die sich für **offene Daten, Softwareentwicklung, Geoinformatik, OpenStreetMap, Stadtentwicklung, Datenanalyse und digitale Gemeingüter** interessieren. Programmieren ist keine Voraussetzung: Auch Beiträge zu Datenrecherche, Dokumentation, Übersetzungen, UX, Design, Tests und Öffentlichkeitsarbeit sind willkommen.

Unsere Projekte beschäftigen sich unter anderem mit:

- offenen kommunalen und regionalen Daten,
- interaktiven Karten und WebGIS,
- GIS, Geodaten und OpenStreetMap,
- Stadtplanung und Stadtentwicklung,
- Umwelt-, Sozial-, Bildungs- und Kulturdaten,
- Open-Source-Software und offenen Schnittstellen,
- digitalem Ehrenamt und Civic Tech.

Das OK Lab Flensburg ist Teil des **Code-for-Germany-Netzwerks**. Träger ist **DatenSindDaten e.V.**

## Projekte

Auf der Website werden zahlreiche Open-Data- und Civic-Tech-Projekte aus Flensburg und Schleswig-Holstein dokumentiert. Dazu gehören unter anderem:

- **Open City Planner** – offenes WebGIS für urbane Daten und Stadtanalyse,
- **Kulturbytes** – digitale Plattform rund um Kulturveranstaltungen,
- **Denkmalkarte Schleswig-Holstein** – offene Kartendarstellung von Kulturdenkmalen,
- **Biotopkarte Schleswig-Holstein** – räumlicher Zugang zu Biotop- und Umweltdaten,
- **Flurstücksauskunft Schleswig-Holstein** – Kartenanwendung für Flurstücke,
- **Open Data API** – maschinenlesbarer Zugang zu offenen Daten,
- **Badestellenkarte**, **Bildungsatlas**, **Kitafinder**, **Nahverkehrskarte**, **Notfallkarte** und weitere Kartenprojekte.

➡️ **[Alle Projekte ansehen](https://oklabflensburg.de/projekte)**

## Mitmachen

Das OK Lab Flensburg ist offen für neue Mitwirkende. Besonders hilfreich sind Kenntnisse oder Interesse in Bereichen wie **GIS/Geoinformatik, PostgreSQL/PostGIS, Webentwicklung, OpenStreetMap, Datenanalyse, Open Data, Barrierefreiheit, UX und Dokumentation**.

➡️ **[Mehr über Mitmachen und digitales Ehrenamt](https://oklabflensburg.de/mitmachen)**

## Dieses Repository

Dieses Repository enthält den Quellcode der offiziellen Website **[oklabflensburg.de](https://oklabflensburg.de)**.

### Tech Stack

- Nuxt 4
- Vue 3
- TypeScript
- Tailwind CSS 4
- Nuxt Content 3
- Nuxt i18n
- Nuxt Image
- Nitro / Node.js SSR
- Vitest
- Playwright
- CodeQL

Die Website wird serverseitig gerendert, verwendet Nuxt Content als kanonische Inhaltsquelle und unterstützt lokalisierte URLs, Canonical URLs, hreflang, Sitemap, RSS, OpenGraph und strukturierte Daten.

## Architektur

Eine kanonische Nuxt-4-Anwendung mit Vue 3, TypeScript, Tailwind CSS 4, `@nuxtjs/i18n`, Nuxt Content 3 und Nuxt Image. Node-Server mit SSR, kein Onepager. Das Designsystem liegt in `app/assets/css/main.css`. Keine UI-Bibliothek. Nutzungsstatistik über die angegebene Plausible-Instanz; siehe [Analytics](docs/analytics.md).

- `app/`: gemeinsame Komponenten, Seiten und SEO.
- `content/`: einzige Quelle für Projekte, Blog, redaktionelle Seiten, Team und zusätzliche Events.
- `i18n/locales/`: ausschließlich UI-Texte in DE/DA/EN.
- `shared/config/site.ts`: Organisation, Domain, allgemeiner Lab-Kontakt (`site.contact.email`) und regelmäßiges Treffen.
- `shared/config/content.ts`: gemeinsame Content-Schemas; `content.config.ts`: Collections und Dateiquellen.
- `server/routes/`: RSS, Sitemap und robots.txt aus derselben Konfiguration und denselben Collections.
- `public/`: lokale Bilder, Marken und Schrift.

Weiterführende Dokumentation:

- [Lokalisierte Routen und SEO](docs/localized-routing.md)
- [Analytics](docs/analytics.md)
- [Branding](docs/brand.md)
- [HTTP-Sicherheitsheader](docs/security-headers.md)
- [Legal-Konfiguration](docs/legal-configuration.md)
- [Abhängigkeiten](docs/dependencies.md)
- [Migration und entfernte Implementierungen](docs/migration.md)
- [Offene redaktionelle Angaben](docs/editorial-todos.md)

## Entwicklung

Voraussetzungen:

- Node.js **22.22 oder neuer**
- pnpm **12.3.4**

Nuxt Content nutzt den nativen SQLite-Treiber von Node; eine zusätzliche Datenbankinstallation ist für die Website nicht notwendig.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

## Build und Tests

```sh
pnpm peers check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

Vitest prüft unter anderem Content-Schemas, Übersetzungsidentitäten, UI-Locale-Parität, Pagination, XML-Escaping und Zeitberechnungen. Playwright prüft Pflichtseiten in allen drei Sprachen, Navigation, mobile Bedienung, SEO, SSR/Hydration und axe-Barrierefreiheit.

GitHub Actions führt dieselben zentralen Prüfungen aus. [Website CI](.github/workflows/ci.yml) deckt Installation, Peer-Checks, Lint, Typecheck, Tests, Build und Playwright ab; [CodeQL](.github/workflows/codeql.yml) analysiert JavaScript und TypeScript.

## Sprachen und Routing

Nuxt i18n verwaltet Sprache und Routing:

- Deutsch: `/`
- Dänisch: `/da`
- Englisch: `/en`

Beispiele für lokalisierte Projektpfade:

- `/projekte`
- `/da/projekter`
- `/en/projects`

Die zentrale Routenmatrix liegt in `shared/config/site.ts`. Projekte und Blogbeiträge werden über `locale` und lokalisierte `slug`-Werte geladen; `translationKey` verbindet Übersetzungen derselben Ressource. Editorial-Seiten verwenden `locale` und `translationKey` und erhalten ihre öffentlichen Pfade ausschließlich über `routePaths`.

Canonical URLs, OpenGraph, strukturierte Daten, hreflang und Sitemap verwenden dieselbe abgeleitete Übersetzungsstruktur. Details stehen in [docs/localized-routing.md](docs/localized-routing.md).

## Projekt hinzufügen

Pro Sprache eine Datei unter `content/{de,da,en}/projects/<translationKey>.md` anlegen.

```yaml
---
title: Bestätigter Projektname
description: Eine konkrete Beschreibung des tatsächlichen Projekts.
locale: de
slug: bestaetigter-slug
translationKey: bestaetigter-slug
status: development
featured: false
categories: [environment]
technologies: [PostGIS]
image: /images/projects/bestaetigter-slug.svg
imageAlt: Eine konkrete Beschreibung des grafischen Symbols in der Sprache dieser Datei
links:
  website: https://example.org
  github: https://github.com/organisation/repository
source: https://example.org/projektquelle
---
```

Danach den Markdown-Inhalt mit Zweck, Datenquellen und Einstiegsmöglichkeiten ergänzen. Nur verifizierte Projekte anlegen. Statuswerte: `development`, `seeking-contributors`, `completed`, `unknown`.

Jedes Projekt benötigt ein passendes SVG-Signet unter `public/images/projects/<translationKey>.svg` und einen lokalisierten `imageAlt`. Das Logo- und Signet-System ist in [docs/project-logo-system.md](docs/project-logo-system.md) dokumentiert.

## Blogbeitrag schreiben

Datei `content/{de,da,en}/blog/<slug>.md`:

```yaml
---
title: Titel
description: Zusammenfassung des Beitrags.
locale: de
slug: beitrags-slug
translationKey: beitrags-slug
date: '2026-09-10'
updated: '2026-09-10'
authors: [Bestätigte Autorenschaft]
tags: [Open Data]
draft: true
---
```

Nach redaktioneller Freigabe `draft: false` setzen. Unveröffentlichte und zukünftige Beiträge erscheinen nicht in Übersichten, Detailrouten, Sitemap oder RSS. RSS ist unter `/rss.xml?lang=de` sowie für `da` und `en` verfügbar.

## Event hinzufügen

Bestätigte Einzeltermine werden in `content/{de,da,en}/events/<slug>.yml` gepflegt. Pflichtfelder sind `locale`, `slug`, `title`, `description`, `kind`, `start`, `end`, `location`, `address`, `url` und `status`.

Das regelmäßige Treffen wird ausschließlich in `shared/config/site.ts` gepflegt.

## Teammitglied hinzufügen

Mit Zustimmung eine YAML-Datei in `content/team/` anlegen. Unterstützte Felder sind `name`, optional `github` und lokaler `avatar`, übersetzte `role`- und `bio`-Objekte, zusätzliche Links und `consent: true`.

Teamdaten werden nicht automatisch aus GitHub übernommen.

## Deployment

Nitro setzt die [HTTP-Sicherheitsheader einschließlich CSP](docs/security-headers.md); der HTTPS-Reverse-Proxy übernimmt TLS, HTTPS-Weiterleitung und HSTS.

Betreiberangaben für Impressum und Datenschutz werden über `NUXT_PUBLIC_LEGAL_*` konfiguriert. Echte Produktionswerte gehören nicht in Git oder CI-Logs. Details stehen in [docs/legal-configuration.md](docs/legal-configuration.md).

```sh
pnpm build
HOST=0.0.0.0 PORT=3000 node --env-file=.env .output/server/index.mjs
```

Die Anwendung wird als Nitro-Node-Server hinter einem HTTPS-Reverse-Proxy betrieben. SSR, RSS, Sitemap und Bildoptimierung benötigen den Server; reines statisches Datei-Hosting ist nicht vorgesehen.

## Externe Links

Externe HTTP(S)-Links öffnen über `SiteLink.vue` in einem neuen Tab mit `noopener noreferrer`; zusätzliche Werte wie `rel="me"` bleiben erhalten. `shared/utils/links.ts` vergleicht die Ziel-Origin mit `site.url`. Nuxt Content nutzt dieselbe Regel in `ProseA.vue`; interne und gleichursprüngliche absolute Links bleiben im selben Tab.

## Mitentwickeln

Feature-Branch erstellen, Änderungen klein und nachvollziehbar halten, passende Prüfungen ausführen und einen Pull Request öffnen. Verbindliche Vorgaben stehen in [AGENTS.md](AGENTS.md).

Beiträge sind nicht nur als Code willkommen: Auch Datenprüfung, Übersetzungen, UX, Barrierefreiheit, Dokumentation, Recherche und Tests helfen dem Projekt.

## Lizenz und Quellen

- Quellcode: [CC0 1.0](LICENSE)
- Manrope: [SIL Open Font License](OFL.txt)
- Projektbeschreibungen, soweit von [Code for Germany](https://codefor.de/flensburg/) adaptiert: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

Vorhandene Marken und Projektbilder behalten ihre ursprünglichen Rechte; die Code-Lizenz ist keine zusätzliche Markenlizenz.
