# OK Lab Flensburg

Die Website des OK Lab Flensburg: offene Daten, freie Software und Civic Tech für Flensburg und Schleswig-Holstein. Der Trägerverein ist DatenSindDaten e.V. Die Website richtet sich an interessierte Menschen und ehrenamtliche Contributor; Programmieren ist keine Voraussetzung.

## Architektur

Eine kanonische Nuxt-4-Anwendung mit Vue 3, TypeScript, Tailwind CSS 4, `@nuxtjs/i18n`, Nuxt Content 3 und Nuxt Image. Node-Server mit SSR, kein Onepager. Das Designsystem liegt in `app/assets/css/main.css`. Keine UI-Bibliothek und keine externen Tracker.

- `app/`: gemeinsame Komponenten, Seiten und SEO.
- `content/`: einzige Quelle für Projekte, Blog, redaktionelle Seiten, Team und zusätzliche Events.
- `i18n/locales/`: ausschließlich UI-Texte in DE/DA/EN.
- `shared/config/site.ts`: Organisation, Domain, Kontakt und regelmäßiges Treffen.
- `shared/config/content.ts`: gemeinsame Content-Schemas; `content.config.ts`: Collections und Dateiquellen.
- `server/routes/`: RSS, Sitemap und robots.txt aus derselben Konfiguration und denselben Collections.
- `public/`: tatsächlich verwendete lokale Bilder, Marken und Schrift.

[Migration und entfernte Implementierungen](docs/migration.md) · [Offene redaktionelle Angaben](docs/editorial-todos.md)

## Entwicklung

Node.js **22.22 oder neuer**, pnpm **10.15.1**. Vite 8 ist als gemeinsamer Peer für Nuxt, Tailwind und Vitest festgelegt. Nuxt Content nutzt den nativen SQLite-Treiber von Node; keine zusätzliche Datenbankinstallation nötig.

```sh
corepack enable
pnpm install
pnpm dev
```

## Build und Tests

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

Vitest 5 prüft Schemas, Content-Vollständigkeit, Locale-Parität, Pagination, XML-Escaping und Sommer-/Winterzeit der Treffen. Playwright startet den Production Server auf Port 3100 und prüft alle Pflichtseiten in drei Sprachen, Navigation, mobile Bedienung, Filter, SEO, SSR/Hydration und axe-Barrierefreiheit. Screenshots liegen in `docs/screenshots/`, Testberichte in `playwright-report/`. Der Workflow [Website CI](.github/workflows/ci.yml) installiert Chromium mit Systemabhängigkeiten und lädt Berichte als Artefakte hoch; [CodeQL](.github/workflows/codeql.yml) prüft JavaScript/TypeScript. GitHub Actions wurde am 10.09.2026 auf Repository-Ebene wieder aktiviert. Beide bestehenden Workflows prüfen Pull Requests gegen `main`; konkrete Ergebnisse müssen am jeweiligen PR-Head kontrolliert werden. Ursache und Wiederherstellung sind im [CI-Audit](docs/ci-audit.md) dokumentiert.

## Sprachen und Routing

Nur Nuxt i18n verwaltet die Sprache. Deutsch liegt unter `/`, Dänisch unter `/da`, Englisch unter `/en`; die Pfadsegmente bleiben bewusst sprachübergreifend gleich. Beispiele: `/projekte`, `/da/projekte`, `/en/projekte`. Der Sprachwechsel erhält auch Detailseiten. Kein Spracherkennungscookie und keine parallele Locale-Implementierung.

Die Nuxt-Routen umfassen Startseite, Projekte mit Details, Mitmachen, Über uns, Team, Verein, Veranstaltungen, Blog mit Beiträgen, Kontakt, Impressum, Datenschutz und Code of Conduct. Die gemeinsame `[page].vue` rendert ausschließlich die explizit freigegebenen redaktionellen Slugs; unbekannte URLs liefern 404. Inhalte werden über `locale` und `slug` abgefragt. Interne Markdown-Links werden über `ProseA` lokalisiert. Sämtliche Übersetzungen eines Eintrags verwenden denselben Slug.

## Kanonische Organisationsmarke

`shared/config/site.ts` definiert `site.logo`: `/brand/oklabflensburg-logo.png`. Die Datei ist die unveränderte PNG aus dem offiziellen Organisationsrepository. `AppLogo.vue` verwendet sie für Header, Footer und Projekt-Absender; Projekt-Signets bleiben eigenständige Identitäten. Die Marke enthält bereits Schrift und erhält keine zusätzliche Text-Wortmarke.

`pnpm brand:generate` leitet daraus ICO-/PNG-Favicons, Apple-Touch-Icon, die allgemeine Social Card und gebrandete Projekt-Social-Cards ab. `pnpm build` führt diesen Schritt automatisch aus. Projektzuordnungen kommen aus Nuxt Content. Nach Änderungen am Logo oder an Projekt-Signets die Ableitungen vor Tests neu erzeugen und zusammen mit der Quelle einchecken. Alle Blogbeiträge nutzen dieselbe gebrandete Standardvorschau; optionale Artikelbilder bleiben Inhaltsbilder.

Quelle, Prüfsumme, Markenrollen und Audit: [docs/brand.md](docs/brand.md).

## Projekt hinzufügen

Pro Sprache eine Datei `content/{de,da,en}/projects/<slug>.md` erstellen. Das sind Übersetzungen derselben kanonischen Content-Quelle, keine zusätzlichen Datensysteme.

```yaml
---
title: Bestätigter Projektname
description: Eine konkrete Beschreibung des tatsächlichen Projekts.
locale: de
slug: bestaetigter-slug
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

Danach Markdown mit Zweck, Datenquellen und Einstiegsmöglichkeiten. Nur verifizierte Projekte anlegen. Statuswerte: `development`, `seeking-contributors`, `completed`, `unknown`. Neue Kategorie-Schlüssel in allen drei UI-Dateien ergänzen. Jedes Projekt braucht ein eigenes, textfreies SVG-Signet unter `public/images/projects/<slug>.svg` (1024 × 1024 px, `viewBox="0 0 128 128"`) und einen beschreibenden, lokalisierten `imageAlt`. Bilder und Alt-Texte sind Pflichtfelder. Keine Fotos, Screenshots oder Platzhalter. Keine zweite Liste in Vue oder JSON. Palette, Raster, Symbolkonzepte und Review stehen in [docs/project-logo-system.md](docs/project-logo-system.md). Die Karten zeigen die vollständigen Signets mit `object-fit: contain`; die Social-Vorschau kombiniert dieselbe SVG-Quelle mit der kanonischen Organisationsmarke als PNG.

## Blogbeitrag schreiben

Datei `content/{de,da,en}/blog/<slug>.md`:

```yaml
---
title: Titel
description: Zusammenfassung des Beitrags.
locale: de
slug: beitrags-slug
date: '2026-09-10'
updated: '2026-09-10'
authors: [Bestätigte Autorenschaft]
tags: [Open Data]
draft: true
---
```

Optional `image`. Nach redaktioneller Freigabe `draft: false` setzen. Unveröffentlichte und zukünftige Beiträge erscheinen weder in Übersichten noch in Detailrouten, Sitemap oder RSS. Pagination umfasst sechs Beiträge pro Seite, Themenfilter nutzt `?tag=…`. RSS: `/rss.xml?lang=de` (auch `da`, `en`). Keine zweite Blog-Engine.

## Event hinzufügen

Nur bestätigte Einzeltermine in `content/{de,da,en}/events/<slug>.yml` speichern. Pflichtfelder: `locale`, `slug`, `title`, `description`, `kind`, `start`, `end`, `location`, `address`, `url`, `status`. Zeitangaben sind ISO 8601 mit explizitem Offset, z.B. `2027-01-20T18:00:00+01:00`; dieses Beispiel ist keine Terminankündigung. Optional `registrationUrl`. `kind`: `meetup`, `open-data-day`, `workshop`, `talk`, `hackathon`, `community`; `status`: `scheduled`, `cancelled`, `postponed`. Vergangene Termine bleiben als solche sichtbar, abgesagte Termine behalten ihren Status.

Das regelmäßige Treffen wird ausschließlich in `shared/config/site.ts` gepflegt. Der nächste reguläre Termin für strukturierte Daten berücksichtigt die Zeitzone Europe/Berlin. Feiertagsausnahmen müssen organisatorisch geprüft und angekündigt werden.

## Teammitglied hinzufügen

Mit Zustimmung eine YAML-Datei in `content/team/` anlegen. Felder: `name`, optional `github` und lokaler `avatar`-Pfad, `role: { de, da, en }`, `bio: { de, da, en }`, `links: [{ label, url }]`, `consent: true`. Zustimmung im Review nachvollziehbar bestätigen, keine privaten Belege veröffentlichen. Es gibt keine automatische Übernahme von GitHub-Mitgliedern und keine zweite Teamliste.

## Deployment

```sh
pnpm build
HOST=0.0.0.0 PORT=3000 node .output/server/index.mjs
```

Die gesamte `.output/` als Node-Anwendung betreiben, hinter einem HTTPS-Reverse-Proxy für `oklabflensburg.de`. Prozess benötigt einen beschreibbaren Arbeitsbereich für die Content-SQLite-Datenbank `.data/`; Inhalte werden beim Build eingebunden. Build und Runtime verwenden eine unterstützte Node-Version. Kein reines Datei-Hosting: SSR, RSS, Sitemap und Bildoptimierung benötigen den Server. Bei Domainänderungen `shared/config/site.ts` anpassen. Alte `.html`- und Contributor-URLs haben gezielte 301-Weiterleitungen.

Vor dem öffentlichen Deployment die [redaktionellen TODOs](docs/editorial-todos.md), insbesondere Anbieter- und Datenschutzangaben, vervollständigen. Diese Migration veröffentlicht keine erfundenen Rechtsangaben und deployt die Website nicht automatisch.

## Mitentwickeln

Feature-Branch erstellen, Änderungen klein und nachvollziehbar halten, die zum Änderungstyp gehörenden Prüfungen ausführen und einen Pull Request öffnen. Für Anwendung, Content, Assets und Konfiguration gilt die vollständige Prüfsequenz oben; reine Dokumentationsänderungen erfordern Markdown-, Link-/Pfad-, Command- und Konsistenzprüfung. Bestehende Komponenten erweitern, ersetzte Implementierungen entfernen. Verbindliche Vorgaben stehen in [AGENTS.md](AGENTS.md). Auch Übersetzungen, Datenprüfung, UX, Dokumentation und Tests helfen.

## Lizenz und Quellen

Quellcode: [CC0 1.0](LICENSE). Manrope: [SIL Open Font License](OFL.txt). Projektbeschreibungen, soweit von [Code for Germany](https://codefor.de/flensburg/) adaptiert: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), mit konkreter Quellenangabe in jeder Projektdatei. Vorhandene Marken und Projektbilder behalten ihre ursprünglichen Rechte; die Code-Lizenz ist keine zusätzliche Markenlizenz.
