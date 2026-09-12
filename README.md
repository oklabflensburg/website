# OK Lab Flensburg

Die Website des OK Lab Flensburg: offene Daten, freie Software und Civic Tech für Flensburg und Schleswig-Holstein. Der Trägerverein ist DatenSindDaten e.V. Die Website richtet sich an interessierte Menschen und ehrenamtliche Contributor; Programmieren ist keine Voraussetzung.

## Architektur

Eine kanonische Nuxt-4-Anwendung mit Vue 3, TypeScript, Tailwind CSS 4, `@nuxtjs/i18n`, Nuxt Content 3 und Nuxt Image. Node-Server mit SSR, kein Onepager. Das Designsystem liegt in `app/assets/css/main.css`. Keine UI-Bibliothek. Nutzungsstatistik über die angegebene Plausible-Instanz; siehe [Analytics](docs/analytics.md).

- `app/`: gemeinsame Komponenten, Seiten und SEO.
- `content/`: einzige Quelle für Projekte, Blog, redaktionelle Seiten, Team und zusätzliche Events.
- `i18n/locales/`: ausschließlich UI-Texte in DE/DA/EN.
- `shared/config/site.ts`: Organisation, Domain, Kontakt und regelmäßiges Treffen.
- `shared/config/content.ts`: gemeinsame Content-Schemas; `content.config.ts`: Collections und Dateiquellen.
- `server/routes/`: RSS, Sitemap und robots.txt aus derselben Konfiguration und denselben Collections.
- `public/`: tatsächlich verwendete lokale Bilder, Marken und Schrift.

[Migration und entfernte Implementierungen](docs/migration.md) · [Offene redaktionelle Angaben](docs/editorial-todos.md)

## Entwicklung

Node.js **22.22 oder neuer**, pnpm **12.3.4**. Vite 8 ist als gemeinsamer Peer für Nuxt, Tailwind und Vitest festgelegt. Nuxt Content nutzt den nativen SQLite-Treiber von Node; keine zusätzliche Datenbankinstallation nötig.

```sh
corepack enable
pnpm install
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

Vitest 5 prüft Schemas, Content-Schemas, Übersetzungsidentitäten, UI-Locale-Parität, Pagination, XML-Escaping und Sommer-/Winterzeit der Treffen. Playwright startet den Production Server auf Port 3100 und prüft alle Pflichtseiten in drei Sprachen, Navigation, mobile Bedienung, Filter, SEO, SSR/Hydration und axe-Barrierefreiheit. Screenshots liegen in `docs/screenshots/`, Testberichte in `playwright-report/`. Der Workflow [Website CI](.github/workflows/ci.yml) installiert Chromium mit Systemabhängigkeiten und lädt Berichte als Artefakte hoch; [CodeQL](.github/workflows/codeql.yml) prüft JavaScript/TypeScript. GitHub Actions ist aktiviert; der [CI-Audit](docs/ci-audit.md) dokumentiert die Wiederaktivierung. Für einen PR zählt das tatsächliche Ergebnis der Runs auf seinem aktuellen Commit, nicht allein das Vorhandensein der Workflow-Dateien.

Peer-Abhängigkeiten, zwei vorübergehende eng begrenzte Versionskorrekturen und ihre Entfernungskriterien: [docs/dependencies.md](docs/dependencies.md). Release-Alter und Build-Script-Freigaben bleiben erhalten.

## Sprachen und Routing

Nur Nuxt i18n verwaltet Sprache und Routing. Deutsch liegt unter `/`, Dänisch unter `/da`, Englisch unter `/en`, mit übersetzten Pfaden: `/projekte`, `/da/projekter`, `/en/projects`. Die zentrale Routenmatrix steht in `shared/config/site.ts`. Sprachwechsel berücksichtigen die tatsächlich vorhandenen Übersetzungen, auch bei unterschiedlichen Detail-Slugs. Kein Spracherkennungscookie.

Die redaktionellen Route-Einstiege rendern ausschließlich die gemeinsame `EditorialPage.vue`. Die bisherige generische `[page].vue` ist entfernt; unbekannte URLs liefern 404. Projekte und Blogbeiträge werden über `locale` und `slug` abgefragt; `translationKey` verbindet Übersetzungen derselben Collection unabhängig vom Slug. Editorial-Seiten werden über `locale` und ihren stabilen `translationKey` abgefragt; ihr Frontmatter enthält keinen redundanten `slug`. Die Dateinamen bleiben unverändert, die öffentlichen Pfade kommen ausschließlich aus `routePaths`. Interne Markdown-Links werden über `ProseA` lokalisiert.

Canonical, OpenGraph und strukturierte Daten verwenden die aufgerufene Sprachroute. Hreflang und Sitemap verwenden denselben aus Nuxt Content abgeleiteten Übersetzungsindex. Fehlende oder unveröffentlichte Sprachvarianten werden nicht erfunden; `noindex`-Varianten werden nicht als Alternates ausgegeben. Alte Sprachpfade und dokumentierte Slug-Aliase werden mit 301 direkt weitergeleitet. [Routenmatrix, Migration und SEO-Regeln](docs/localized-routing.md).

## Kanonische Organisationsmarke

`shared/config/site.ts` definiert `site.logo`: `/brand/oklabflensburg-logo.png`. Die Datei ist die unveränderte PNG aus dem offiziellen Organisationsrepository. `AppLogo.vue` verwendet sie für Header, Footer und Projekt-Absender; Projekt-Signets bleiben eigenständige Identitäten. Die Marke enthält bereits Schrift und erhält keine zusätzliche Text-Wortmarke.

`pnpm brand:generate` leitet daraus ICO-/PNG-Favicons, Apple-Touch-Icon, die allgemeine Social Card und gebrandete Projekt-Social-Cards ab. `pnpm build` führt diesen Schritt automatisch aus. Projektzuordnungen kommen aus Nuxt Content. Nach Änderungen am Logo oder an Projekt-Signets die Ableitungen vor Tests neu erzeugen und zusammen mit der Quelle einchecken. Alle Blogbeiträge nutzen dieselbe gebrandete Standardvorschau; optionale Artikelbilder bleiben Inhaltsbilder.

Quelle, Prüfsumme, Markenrollen und Audit: [docs/brand.md](docs/brand.md).

## Projekt hinzufügen

Pro Sprache eine Datei `content/{de,da,en}/projects/<translationKey>.md` erstellen. Das sind Übersetzungen derselben kanonischen Content-Quelle, keine zusätzlichen Datensysteme.

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

Danach Markdown mit Zweck, Datenquellen und Einstiegsmöglichkeiten. Nur verifizierte Projekte anlegen. Statuswerte: `development`, `seeking-contributors`, `completed`, `unknown`. Neue Kategorie-Schlüssel in allen drei UI-Dateien ergänzen. Jedes Projekt braucht ein eigenes, textfreies SVG-Signet unter `public/images/projects/<translationKey>.svg` (1024 × 1024 px, `viewBox="0 0 128 128"`) und einen beschreibenden, lokalisierten `imageAlt`. Bilder und Alt-Texte sind Pflichtfelder. Keine Fotos, Screenshots oder Platzhalter. Keine zweite Liste in Vue oder JSON. Palette, Raster, Symbolkonzepte und Review stehen in [docs/project-logo-system.md](docs/project-logo-system.md). Die Karten zeigen die vollständigen Signets mit `object-fit: contain`; die Social-Vorschau kombiniert dieselbe SVG-Quelle mit der kanonischen Organisationsmarke als PNG.

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

Optional `image`. Nach redaktioneller Freigabe `draft: false` setzen. Unveröffentlichte und zukünftige Beiträge erscheinen weder in Übersichten noch in Detailrouten, Sitemap oder RSS. Pagination umfasst sechs Beiträge pro Seite, Themenfilter nutzt `?tag=…`. RSS: `/rss.xml?lang=de` (auch `da`, `en`). Keine zweite Blog-Engine.

## Event hinzufügen

Nur bestätigte Einzeltermine in `content/{de,da,en}/events/<slug>.yml` speichern. Pflichtfelder: `locale`, `slug`, `title`, `description`, `kind`, `start`, `end`, `location`, `address`, `url`, `status`. Zeitangaben sind ISO 8601 mit explizitem Offset, z.B. `2027-01-20T18:00:00+01:00`; dieses Beispiel ist keine Terminankündigung. Optional `registrationUrl`. `kind`: `meetup`, `open-data-day`, `workshop`, `talk`, `hackathon`, `community`; `status`: `scheduled`, `cancelled`, `postponed`. Vergangene Termine bleiben als solche sichtbar, abgesagte Termine behalten ihren Status.

Das regelmäßige Treffen wird ausschließlich in `shared/config/site.ts` gepflegt. Der nächste reguläre Termin für strukturierte Daten berücksichtigt die Zeitzone Europe/Berlin. Feiertagsausnahmen müssen organisatorisch geprüft und angekündigt werden.

## Teammitglied hinzufügen

Mit Zustimmung eine YAML-Datei in `content/team/` anlegen. Felder: `name`, optional `github` und lokaler `avatar`-Pfad, `role: { de, da, en }`, `bio: { de, da, en }`, `links: [{ label, url }]`, `consent: true`. Zustimmung im Review nachvollziehbar bestätigen, keine privaten Belege veröffentlichen. Es gibt keine automatische Übernahme von GitHub-Mitgliedern und keine zweite Teamliste.

## Deployment

Betreiberangaben für Impressum und Datenschutz werden ausschließlich über `NUXT_PUBLIC_LEGAL_*` konfiguriert. Pflichtfelder sind Name, Straße, Hausnummer, Postleitzahl, Ort, Land und E-Mail. Optional kommen Hosting-Anbieter und Anschrift aus derselben Konfiguration; `NUXT_PUBLIC_LEGAL_HOSTING_DPA=true` blendet den übersetzten AVV-Hinweis ein. [Variablen, `.env.example`, Produktionsprüfung und redaktionelle Freigabe](docs/legal-configuration.md) dokumentieren alle Pflicht- und optionalen Angaben. Echte Produktionswerte dürfen nicht in Git oder CI-Logs gelangen.

```sh
pnpm build
HOST=0.0.0.0 PORT=3000 node --env-file=.env .output/server/index.mjs
```

Die `.env` auf dem Zielserver muss geprüfte Werte enthalten; alternativ die Variablen über systemd/Prozessumgebung setzen und `--env-file` weglassen. Ein Build ohne Betreiberwerte ist möglich, der gebaute Server verweigert bei fehlenden Pflichtangaben oder erkennbaren Platzhaltern den Start. Playwright verwendet ausschließlich fiktive Testangaben und prüft auch diesen Startfehler.

Die gesamte `.output/` als Node-Anwendung betreiben, hinter einem HTTPS-Reverse-Proxy für `oklabflensburg.de`. Prozess benötigt einen beschreibbaren Arbeitsbereich für die Content-SQLite-Datenbank `.data/`; Inhalte werden beim Build eingebunden. Build und Runtime verwenden eine unterstützte Node-Version. Kein reines Datei-Hosting: SSR, RSS, Sitemap und Bildoptimierung benötigen den Server. Bei Domainänderungen `shared/config/site.ts` anpassen. Alte `.html`- und Contributor-URLs haben gezielte 301-Weiterleitungen.

Vor dem öffentlichen Deployment die [redaktionellen TODOs](docs/editorial-todos.md), insbesondere Anbieter- und Datenschutzangaben, vervollständigen. Diese Migration veröffentlicht keine erfundenen Rechtsangaben und deployt die Website nicht automatisch.

## Mitentwickeln

Feature-Branch erstellen, Änderungen klein und nachvollziehbar halten, die zum Änderungstyp gehörenden Prüfungen ausführen und einen Pull Request öffnen. Für Anwendung, Content, Assets und Konfiguration gilt die vollständige Prüfsequenz oben; reine Dokumentationsänderungen erfordern Markdown-, Link-/Pfad-, Command- und Konsistenzprüfung. Bestehende Komponenten erweitern, ersetzte Implementierungen entfernen. Verbindliche Vorgaben stehen in [AGENTS.md](AGENTS.md). Auch Übersetzungen, Datenprüfung, UX, Dokumentation und Tests helfen.

## Lizenz und Quellen

Quellcode: [CC0 1.0](LICENSE). Manrope: [SIL Open Font License](OFL.txt). Projektbeschreibungen, soweit von [Code for Germany](https://codefor.de/flensburg/) adaptiert: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), mit konkreter Quellenangabe in jeder Projektdatei. Vorhandene Marken und Projektbilder behalten ihre ursprünglichen Rechte; die Code-Lizenz ist keine zusätzliche Markenlizenz.
