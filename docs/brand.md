# Kanonische Marke des OK Lab Flensburg

## Eine unveränderte Quelle

Die einzige Quelldatei der Organisationsmarke liegt unter **`public/brand/oklabflensburg-logo.png`**. `site.logo` in `shared/config/site.ts` definiert diesen Pfad für alle Verbraucher.

- Verbindliche [Quelldatei im Organisationsrepository](https://github.com/oklabflensburg/.github/blob/main/resources/oklabflensburg_logo_quadrat.png).
- [Versionierter Herkunftsnachweis](https://github.com/oklabflensburg/.github/blob/cafa48da06fbbdd9733e4d13b674e6e229a48a7d/resources/oklabflensburg_logo_quadrat.png).
- Übernommen am 10.09.2026, unverändert, 60.997 Bytes.
- SHA-256: `67975c8d447eba997f53ba566b93ee2c38905e8edb0cc80b1a71b693e76e709e`.
- 512 × 512 px, PNG, sRGB, Alphakanal mit transparenten Bereichen. Auf weißen oder sehr hellen Flächen darstellen.
- Enthält bereits die Schriftzüge „Code for“ und „Flensburg“. Keine zusätzliche Text-Wortmarke im Header oder Footer.

Das Original wird weder nachgezeichnet, beschnitten, vektorisiert noch umgefärbt. Keine CSS-Filter, Schatten, Masken oder alternativen Markenvarianten. Die Markenrechte bleiben bei den ursprünglichen Rechteinhabern; die Quellcode-Lizenz ist keine zusätzliche Markenlizenz.

## Website und Markenrollen

`app/components/AppLogo.vue` enthält die einzige Logo-Markup-Logik. Die Komponente verwendet `NuxtImg`, den Alt-Text aus `site.name` („OK Lab Flensburg“), explizite quadratische Abmessungen, PNG-Ausgabe und `object-contain`.

- **Header und mobile Navigation:** dasselbe responsive Logo; 44 px Desktop, 40 px Mobil. Das geöffnete Mobile-Menü bleibt unter diesem Header und benötigt keine weitere Logo-Kopie.
- **Footer:** dieselbe Komponente und Quelle bei 36 px.
- **Projektseiten:** zusätzliche kleine Organisationsmarke mit übersetztem „Ein Projekt von“ und Link zu Über uns. Das große SVG bleibt die Identität des jeweiligen Projekts.
- **Über uns / Mitmachen:** die gemeinsame Marke in Header und Footer; keine unnötige zusätzliche Wiederholung im Seiteninhalt.
- **Code for Germany:** Netzwerkbezug, kein Ersatz für die Organisationsmarke. Der Netzwerktext auf Über uns ist vom Text zum Trägerverein getrennt.
- **DatenSindDaten e.V.:** Trägerverein mit eigenständiger Rolle. Es liegt kein eigenes offizielles Vereinslogo vor; die OK-Lab-Marke wird nicht als Vereinslogo verwendet.

## Reproduzierbare Ableitungen

`pnpm brand:generate` führt `scripts/generate-brand-assets.mjs` aus. Sharp ist bereits Teil der Bildwerkzeugkette und wird für den reproduzierbaren Generierungsschritt explizit als Entwicklungsabhängigkeit deklariert. Der Produktionsserver benötigt keine neue Branding-Renderfunktion.

| Ableitung | Datei | Format / Größe |
| --- | --- | --- |
| Browser-Favicon | `public/favicon.ico` | ICO mit 16/32/48/256-px-PNG-Ebenen |
| Kleines Favicon | `public/favicon-16x16.png` | 16 × 16 px |
| Favicon | `public/favicon-32x32.png` | 32 × 32 px |
| Apple-Touch-Icon | `public/apple-touch-icon.png` | 180 × 180 px |
| Allgemeine und Blog-Social-Card | `public/social-card.png` | 1200 × 630 px, vollständiges 420-px-Logo mittig auf Weiß |
| Projekt-Social-Cards | `public/social/projects/<slug>.png` | 1200 × 630 px, Organisationsmarke links, eigenes Projekt-Signet rechts |

Diese Ausgaben sind ausschließlich Größenableitungen bzw. fertige Social-Kompositionen; sie sind keine weiteren bearbeitbaren Logo-Quellen. Das Original wird nur einmal gespeichert. Sämtliche Größenänderungen verwenden `fit: contain`. Auf Social Cards wird die Transparenz auf Weiß zusammengesetzt, ohne die Farben zu verändern; die Marke hat mindestens 105 px Abstand zum Bildrand.

Projekt-Social-Cards werden automatisch aus den tatsächlichen deutschen Projekt-Content-Dateien und deren `image`-Feld abgeleitet. Es gibt keine zweite Projektliste oder manuelle Logo-Zuordnung. Dieselben sprachneutralen Karten werden in DE/DA/EN genutzt. Übersetzte Titel und Beschreibungen stehen in den OpenGraph-/Twitter-Metadaten. Alle Blogbeiträge verwenden die gebrandete Standardkarte, auch wenn ein optionales Inhaltsbild vorliegt.

`pnpm build` erzeugt die Ableitungen vor dem Nuxt-Build neu. Nach Änderung einer Quelle `pnpm brand:generate` ausführen und die aktualisierten Ausgaben mit einchecken. Verwaiste generierte Projekt-Social-Cards werden beim Generieren entfernt.

## SEO und Structured Data

- `Organization.logo` verweist über `new URL(site.logo, site.url)` auf `https://oklabflensburg.de/brand/oklabflensburg-logo.png`.
- `usePageSeo` nutzt zentral `site.socialImage` als Standard für OpenGraph und Twitter.
- Projektseiten verwenden ihre gebrandete PNG-Social-Card aus `site.projectSocialImages`.
- Das `BlogPosting.image` entspricht der gebrandeten OpenGraph-/Twitter-Standardvorschau.
- Favicon- und Apple-Touch-Verweise in `nuxt.config.ts` lesen dieselbe zentrale Konfiguration wie der Generator.

## Legacy-Audit

Entfernt: **`public/logos/codefor-flensburg.svg`** und die dazugehörige Logo-/Wortmarken-Auszeichnung sowie überschreibende Größenregeln in Header/Footer. Das alte `favicon.ico` und die bisherige textbasierte `social-card.png` sind durch Ableitungen der offiziellen PNG ersetzt.

Erhalten: alle 19 Projekt-SVGs, eigene lineare UI-Icons und die statische Flensburg-Karte. Sie erfüllen andere Aufgaben und sind keine alternativen Organisationslogos. Im Repository liegen keine weiteren Partner-/Vereinslogo-Dateien. Historische Dateinamen in Audit-Dokumenten bezeichnen entfernte Assets, keine aktiven Varianten.

## Validierung

Die Tests vergleichen die Original-Prüfsumme, quadratische Maße, PNG-/ICO-Pixel und den Logo-Bereich sämtlicher Social Cards mit der kanonischen Quelle. Beim Alpha-Compositing ist ausschließlich ein Rundungsunterschied von maximal 1 je Farbkanal zulässig. Browserprüfungen kontrollieren Header, Footer, mobile Navigation, Projekt-Absender, Ladeerfolg, fehlenden Beschnitt/Filter und konsistente SEO-/Schema-Verweise.

`pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` und `pnpm test:e2e` erfolgreich: 27 Unit-Tests und 30 Browser-Tests bestanden, zwei beabsichtigte gerätespezifische Ausnahmen übersprungen. Der Build erzeugt alle Ableitungen erfolgreich neu.

Desktop (1440 px) und Mobil (390 px) visuell geprüft: dieselbe vollständige, unverzerrte Marke auf Weiß, konsistenter Header/Footer, keine alte Logo-Datei und keine zusätzliche große Wiederholung. Auch das geöffnete mobile Menü nutzt den gemeinsamen Header. Die Projektidentitäten bleiben erhalten.

| Seite | Desktop | Mobil |
| --- | --- | --- |
| Startseite | [Screenshot](screenshots/desktop-home.png) | [Screenshot](screenshots/mobile-home.png) |
| Projekte | [Screenshot](screenshots/desktop-projekte.png) | [Screenshot](screenshots/mobile-projekte.png) |
| Über uns | [Screenshot](screenshots/desktop-ueber-uns.png) | [Screenshot](screenshots/mobile-ueber-uns.png) |
| Mitmachen | [Screenshot](screenshots/desktop-mitmachen.png) | [Screenshot](screenshots/mobile-mitmachen.png) |

Zusätzlich sind die Blog- und Vereins-Screenshots in `docs/screenshots/` aktualisiert. Der abschließende Asset-/Referenz-Audit findet ausschließlich die zentrale Organisationsquelle und ihre dokumentierten Ableitungen.
