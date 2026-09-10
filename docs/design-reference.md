# Umsetzung der Referenz: Variante 1

Verbindliche Grundlage ist ausschließlich die linke Spalte der vom Auftraggeber bereitgestellten Datei `8116e7a7-8a5f-48e8-ba1b-b5683f33b047.png`. Die beiden anderen Spalten sind keine Designquellen.

## Visuelle Ableitung

Die Vorlage zeigt eine kompakte neutrale Sans-Serif, kräftige dunkelblaue Überschriften, weißen Seitenhintergrund, blasse blaugraue Abschnittsflächen und kleine lineare Icons. Die genaue Schrift lässt sich aus dem Rasterbild nicht zuverlässig bestimmen. Die bereits lokal vorhandene variable Manrope bleibt die einzige Schriftfamilie, einschließlich Navigation, Badges und Metadaten.

| Element | Umsetzung |
| --- | --- |
| Inhalt | max. 1180 px, mittig; außen mindestens 32 px Desktop / 20 px Mobil |
| Header | 88 px Desktop / 76 px Mobil, weiße Fläche, 1 px Border, Logo 44 px |
| Hero | 45/55-Aufteilung; Navy-Headline 52 px Desktop / 34 px Mobil, Gewicht 800, Zeilenhöhe 1.08, Laufweite −0.035 em |
| Abschnitte | Überschriften 28/24 px, Gewicht 700; 36–40 px Abschnittsabstand |
| Fließtext | 15 px, Gewicht 400, Zeilenhöhe 1.625; längere Artikel 1.8 |
| Navigation / Buttons | 13/14 px, Gewicht 600; primäre Buttons 44 px hoch |
| Farben | Navy `#102c48`, Blau `#0b4f80`, Weiß, Soft Surface `#f5f7fa`, Border `#dfe7ee` |
| Rundungen | Buttons 6 px, Karten 8 px, Meeting-Block 12 px |
| Schatten | zwei sehr schwache Ebenen; ausschließlich Karten |
| Projektkarten | drei Spalten, 4:3-Bildfeld mit quadratischem Signet, Titel, Beschreibung, Themen-Badges und Link; mobil eine Spalte |
| Infoleiste | vier Spalten Desktop, zwei Spalten Mobil; Projektzahl aus Content |
| News / Mitmachen | schlichte Nachrichtenliste neben kleiner heller Mitmachen-Karte |
| Footer | Weiß, obere Border, kompaktes Logo, kleine Links und lineare Social-Icons |

Gemeinsame Tailwind-Tokens und mit `@apply` zusammengesetzte Komponentenklassen liegen in `app/assets/css/main.css`. Seiten und Komponenten verwenden dieselben Klassen. Es gibt keine zweite Designimplementierung, keinen Theme-Schalter und keine zusätzlich geladene Schrift. Die frühere abstrakte Kartenzeichnung, der blaue CTA-Banner, die großflächige Vereinsleiste, der mehrspaltige Footer und deren Styles sind ersetzt.

## Herkunft der Gestaltungsmittel

- **Marke:** die unveränderte offizielle PNG unter `public/brand/oklabflensburg-logo.png`, zentral über `site.logo` und `AppLogo.vue`. Die zuvor verwendete SVG-Marke ist entfernt. Keine Umfärbung und keine zusätzliche Text-Wortmarke. Quelle und Ableitungen: `docs/brand.md`.
- **Schrift:** vorhandenes `public/fonts/manrope.woff2`, Lizenz siehe `OFL.txt`.
- **Hero-Karte:** `public/images/flensburg-map.svg`, statisch aus OpenStreetMap-Straßen, Waldflächen und Küstenverläufen abgeleitet. Datenabruf am 10.09.2026 über `https://overpass.kumi.systems/api/interpreter`; Daten [© OpenStreetMap-Mitwirkende, ODbL](https://www.openstreetmap.org/copyright). Ausschnitt der Abfrage: südlich 54.755, westlich 9.36, nördlich 54.84, östlich 9.50. Geographische Projektion mit Längenkorrektur für 54.8° N. Blaue Punkte sind dekorative GIS-Elemente und stellen keine verifizierten Projektstandorte dar. Sichtbare Attribution im Hero; kein Karten-SDK und keine externen Kartenrequests beim Seitenaufruf.
- **Workshop-Foto:** `public/images/codefor-workshop.jpeg`, unveränderte Datei aus Commit `7e8b748`, dort `static/Event-20230910-berlin-codefor-summit-13.jpeg`. Bereits zuvor als Website-Foto verwendet. Die Bildunterschrift benennt den Code-for-Germany-Summit in Berlin 2023 entsprechend dem ursprünglichen Dateinamen; kein vorgetäuschtes Foto eines aktuellen Flensburger Wochentreffens. Ursprüngliche Bildrechte bleiben bestehen. Fotograf und genaue Lizenz sind im bisherigen Repository nicht dokumentiert und stehen in den redaktionellen TODOs.
- **Projektbilder:** gemäß der präzisierten Vorgabe 19 individuell gestaltete SVG-Signets; siehe `docs/project-logo-system.md`. Alle Fotomotive sind ersetzt.
- **Icons:** eine lokale 24-px-SVG-Komponente mit einheitlichen Konturen, 1.7 px Strichstärke und runden Linienenden. Keine Iconfonts oder UI-Bibliothek.

## Inhalte und Abweichungen von Beispielangaben

Die Beispielzahl „20+“ wird nicht ungeprüft übernommen. Die Infoleiste zählt die tatsächlichen Projekte der aktiven Sprache. Nachrichten stammen ausschließlich aus veröffentlichtem Nuxt Content. Die Treffendaten werden weiterhin ausschließlich aus `shared/config/site.ts` gelesen. Alle neuen UI-Texte sind in DE/DA/EN lokalisiert. Die Projektsuche nutzt die vorhandene Projektübersicht und den URL-Parameter `q`; es gibt keine separate Suchdatenquelle.

## Visueller Review

Playwright erstellt vollständige Screenshots bei **1440 px** und **390 px** Breite für `/`, `/projekte`, `/mitmachen`, `/ueber-uns`, `/blog` und ergänzend `/daten-sind-daten`. Vor den Screenshots werden die lokale Schrift und sämtliche Bilder geladen. Artefakte: `docs/screenshots/desktop-*.png` und `docs/screenshots/mobile-*.png`.

Die Desktop- und Mobile-Screenshots aller fünf angeforderten Seiten wurden mit der linken Referenz verglichen. Einheitliche Schriftfamilie, Hierarchie, Button-Typografie, helle Flächen, Konturen und Abstände sind geprüft. Ein zusätzlicher Browser-Audit bestätigte auf allen zehn Kombinationen aus Seite und Bildschirmbreite ausschließlich Manrope sowie keinen horizontalen Überlauf. Die Projekt-Bildfelder folgen der später präzisierten Signet-Vorgabe (4:3 mit vollständigem quadratischem SVG).

Das Workshop-Foto stammt aus dem bestehenden Repository-Verlauf; seine genaue Lizenz und Fotografenangabe bleiben als redaktioneller Punkt dokumentiert. Die Website wurde nicht veröffentlicht.

Nicht mehr referenzierte Assets der ersetzten Darstellung wurden entfernt: die zehn alten `public/images/*-karte.webp`-Illustrationen und das ungenutzte zusätzliche Code-for-Germany-Logo. Auch die anschließend ersetzten Projektfotos sind aus der Website entfernt; die vorgefundenen uncommitteten Originale wurden außerhalb des Repositorys gesichert.


Abschließende Prüfungen am 10.09.2026:

| Prüfung | Ergebnis |
| --- | --- |
| `pnpm lint` | erfolgreich |
| `pnpm typecheck` | erfolgreich |
| `pnpm test` | 23 Tests erfolgreich |
| `pnpm build` | erfolgreich, Nuxt SSR / Nitro Node-Server |
| `pnpm test:e2e` | 28 Tests erfolgreich, 2 gezielte Desktop-/Mobile-Ausnahmen übersprungen |
| Screenshot-Review | alle fünf angeforderten Seiten bei exakt 1440 / 390 px, zusätzlich Vereinsseite |
| Typografie / Überlauf | eine Schriftfamilie; kein horizontaler Überlauf auf den zehn Pflichtkombinationen |
| Architektur-Audit | keine zweite Content-Quelle, keine Theme-Varianten, keine ungenutzten Projektfoto-Assets |

Der zuerst ergänzte Suchtest las beim Client-Seitenwechsel die Kartenzahl der Startseite zu früh. Nach einer expliziten Wartebedingung auf das Suchfeld besteht auch der vollständige Testlauf. Es war keine Änderung an der Suchfunktion erforderlich.
