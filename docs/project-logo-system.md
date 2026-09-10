# Projekt-Signets des OK Lab Flensburg

## Gestaltungsregeln

Alle 19 tatsächlichen Projekte werden ausschließlich aus `content/de/projects/` ermittelt und haben passende Übersetzungen in `content/da/projects/` und `content/en/projects/`. Die Content-Felder `image` und `imageAlt` sind die einzige Zuordnung zwischen Projekt und Signet. Es gibt keine zusätzliche Laufzeit-Liste und kein Logo-Mapping.

Die Signets sind einzeln von Hand als SVG-Geometrien gestaltet. Keine Bildgenerierung, keine Fotos, keine Screenshots, keine Textmarken und keine eingebetteten Rasterbilder. Die gemeinsame Serie übernimmt die helle Navy-/Blau-Gestaltung der Website. Die Symbole unterscheiden sich durch Komposition und Silhouette, nicht nur durch die Farbe.

| Regel | Wert |
| --- | --- |
| Format | ein eigenständiges SVG pro Projekt, intrinsisch 1024 × 1024 px |
| Koordinatenraster | `viewBox="0 0 128 128"` |
| Safe Area | mindestens 12 Rastereinheiten um das Hauptmotiv |
| Kontur | Navy `#153a59`, 3 Rastereinheiten, runde Enden und Ecken |
| Hintergrund | einheitlich `#f3f7fa`, kein äußerer App-Icon-Rahmen |
| Blau | `#477ca7`, helle Fläche `#dce9f3` |
| Grün | `#568773`, helle Fläche `#dcebe2` |
| Violett | `#8574a4`, helle Fläche `#e8e3f1` |
| Magenta | `#a66183`, helle Fläche `#f1e1e9` |
| Türkis | `#48888d`, helle Fläche `#dceced` |
| Ocker | `#b17a49`, helle Fläche `#f3e6d8` |
| Effekte | keine Schatten, Filter, Verläufe, Schriften oder externen Ressourcen |
| Karten | 4:3-Bildbereich, zentrierte quadratische SVGs, `object-fit: contain`, maximal 208 px |
| Detailseiten | eigenes helles Bildfeld, vollständiges quadratisches SVG, maximal 360 px |
| Social Preview | Nuxt Image erzeugt aus demselben SVG ein lokales PNG mit 1200 × 630 px und `fit: contain` |

Die Dateien sind direkt editierbar und verwenden keine Symbole aus einem externen Iconset. Die eigenständigen Formen sind neue Beiträge zum Quellcode; die Repository-Lizenz in `LICENSE` gilt entsprechend. Vorhandene OK-Lab-Marken wurden nicht als Projektsymbol kopiert.

## Gefundene Projekte und erstellte Logos

Die deutsche Symbolbeschreibung dient zugleich als konkreter Alt-Text. Eigenständige dänische und englische Beschreibungen stehen direkt in den jeweiligen Content-Dateien.

| Projekt | Datei | Symbolidee und deutscher Alt-Text | Farbakzent |
| --- | --- | --- | --- |
| Badestellenkarte Schleswig-Holstein | [badestellenkarte.svg](../public/images/projects/badestellenkarte.svg) | Ein Standortmarker über zwei Wasserwellen neben einer stilisierten Küstenlinie. | Hellblau |
| Bildungsatlas | [bildungsatlas.svg](../public/images/projects/bildungsatlas.svg) | Ein geöffnetes Buch mit gefalteten Kartenflächen und einem blauen Bildungsstandort. | Violett / Blau |
| Biotopkarte Schleswig-Holstein | [biotopkarte.svg](../public/images/projects/biotopkarte.svg) | Ein Blatt in einer Biotopfläche mit Blattadern und zwei Linien für Wasserläufe. | Grün |
| Bodenflächennutzung | [bodenflaechennutzung.svg](../public/images/projects/bodenflaechennutzung.svg) | Vier klar getrennte Flächen zeigen Vegetation, Landwirtschaft, Wasser und Siedlung. | Grün / Ocker |
| Digitale Denkmalkarte | [denkmalkarte.svg](../public/images/projects/denkmalkarte.svg) | Eine historische Doppelfassade mit Giebeln, Fenstern und einem gemeinsamen Torbogen. | Blau |
| Flurstücksauskunft Schleswig-Holstein | [flurstuecksauskunft.svg](../public/images/projects/flurstuecksauskunft.svg) | Ein Netz unterschiedlich großer Grundstücksparzellen mit einer blau hervorgehobenen Fläche. | Blau / Graublau |
| Kitafinder | [kitafinder.svg](../public/images/projects/kitafinder.svg) | Ein einfaches Haus mit Bausteinfenster und einem violetten Standortmarker. | Violett |
| kulturbytes | [kulturbytes.svg](../public/images/projects/kulturbytes.svg) | Ein Veranstaltungsticket mit ausgestanzten Seiten und einem geometrischen Kulturstern. | Magenta |
| Kulturnacht Flensburg | [kulturnacht-karte.svg](../public/images/projects/kulturnacht-karte.svg) | Eine Mondsichel über einer gefalteten Karte mit drei verbundenen Veranstaltungsorten. | Magenta / Violett |
| Nahverkehrskarte | [nahverkehrskarte.svg](../public/images/projects/nahverkehrskarte.svg) | Ein abstrahierter Bus neben einer Linienroute mit markierten Haltestellen. | Blau / Türkis |
| Notfallkarte Schleswig-Holstein | [notfallkarte.svg](../public/images/projects/notfallkarte.svg) | Ein Schutzschild mit einem eingebetteten Standortmarker für Polizeidienststellen. | Blau |
| Open City Planner | [open-city-planner.svg](../public/images/projects/open-city-planner.svg) | Gestapelte Kartenebenen mit Straßenachsen, Polygonflächen und einem zentralen Datenpunkt. | Blau |
| Open Data API | [open-data-api.svg](../public/images/projects/open-data-api.svg) | Drei offene Datenmodule verbinden sich über Leitungen mit vier äußeren Datenknoten. | Blau |
| Recyclingcontainerkarte | [recyclingcontainerkarte.svg](../public/images/projects/recyclingcontainerkarte.svg) | Ein Sammelcontainer mit Einwurfschlitz, umgeben von drei kreislaufförmigen Pfeilen. | Grün / Türkis |
| Sozialatlas | [sozialatlas.svg](../public/images/projects/sozialatlas.svg) | Verbundene Datenpunkte unterschiedlicher Größe über benachbarten Stadtbezirken. | Türkis |
| Spielplatzkarte | [spielplatzkarte.svg](../public/images/projects/spielplatzkarte.svg) | Eine Schaukel mit zwei Trägern, hängendem Sitz und einer klaren Bodenlinie. | Blau / Ocker |
| Straßenbäume | [strassenbaeume.svg](../public/images/projects/strassenbaeume.svg) | Eine verzweigte Baumkrone neben einer Straßenachse mit drei kartierten Standortpunkten. | Grün |
| Unfallkarte | [unfallkarte.svg](../public/images/projects/unfallkarte.svg) | Eine Straßenkreuzung mit unterschiedlich großen Analysepunkten für räumliche Unfalldaten. | Ocker / Blau |
| Wohnort-Kompass | [wohnort-kompass.svg](../public/images/projects/wohnort-kompass.svg) | Eine Kompassnadel über einer Hausform verbindet Orientierung und die Suche nach einem Wohnort. | Türkis / Blau |

## Integration und Änderungen

- **57 Content-Dateien:** `image` und `imageAlt` für sämtliche 19 Projekte in DE/DA/EN aktualisiert; Beschreibungen, Quellen, Links, Status und Technologien bleiben erhalten.
- **19 Assets:** `public/images/projects/<slug>.svg`; die ersetzten Fotomotive und deren Originale gehören nicht mehr zur Website. Die vorgefundenen uncommitteten Originale wurden vor dem Entfernen außerhalb des Repositorys unter `/tmp/oklab-superseded-project-photos/` gesichert.
- **Komponenten:** `app/components/ProjectCard.vue` rendert die SVG-Datei direkt als Bild ohne Rasterisierung oder Beschnitt. Die vorhandene Titelhierarchie, Themen-Badges und Links bleiben bestehen.
- **Detailseiten:** `app/pages/projekte/[slug].vue` zeigt das vollständige Signet; die OpenGraph-/Twitter-Vorschau verwendet ein aus derselben Quelle abgeleitetes PNG.
- **Schema:** `shared/config/content.ts` verlangt den kanonischen lokalen SVG-Pfad sowie einen beschreibenden Alt-Text.
- **Styles:** gemeinsame Größen und Zentrierung in `app/assets/css/main.css`, weiterhin Teil desselben Tailwind-Designsystems.
- **Tests:** Content-Prüfungen für Vollständigkeit, eindeutige Dateien, Locale-Parität und sichere SVGs; Browserprüfungen für alle Karten und Detailseiten in drei Sprachen, unveränderte Bildrahmen beim Laden, vollständige Darstellung und funktionierende PNG-Vorschauen.

## Neue Projekte ergänzen

Zuerst Zweck und Datenfunktion aus verifizierten Inhalten bestimmen. Ein eigenes geometrisches Konzept wählen, das sich auch ohne Farbe von den bestehenden Silhouetten unterscheidet. Die Datei mit denselben Raster-, Kontur- und Abstandsregeln erstellen. Kein Projektname, kein wiederverwendetes OK-Lab-Zeichen und kein zusätzliches generisches App-Icon als Rahmen. SVG unter dem Content-Slug speichern und konkrete visuelle Beschreibungen in allen drei Übersetzungen ergänzen. Vorschauen bei 1440/390 px und bei kleiner Symbolgröße kontrollieren.

## Quality Review und Tests

Alle 19 Motive wurden in der Desktop-Galerie und in mobiler Darstellung auf Motivbezug, Silhouette, Innenabstand, Kontur, Farbwirkung und Beschnitt kontrolliert. Die SVG-Dateien enthalten weder Schrift noch eingebettete Bilder. Zusammen sind sie nur 12.023 Bytes groß.

Nach dem ersten Entwurf wurde **Nahverkehrskarte** überarbeitet: Die Räder sind nun gefüllte geometrische Formen statt einer abweichend dicken Linie, damit die Konturstärke im gesamten Set einheitlich bleibt. Die anderen 18 Symbolkonzepte wurden nach dem Review beibehalten. Zusätzlich wurde die Bildbox auf schmalen Detailseiten korrigiert, damit auch das eigentliche Bildelement quadratisch bleibt.

Der Browser-Audit bei 1440 und 390 px bestätigte für alle fünf angeforderten Seiten dieselbe Manrope-Schriftfamilie und keinerlei horizontalen Überlauf. Vollständige Screenshots liegen in `docs/screenshots/`, darunter [Desktop-Galerie](screenshots/desktop-projekte.png) und [Mobile-Galerie](screenshots/mobile-projekte.png).

Commit-Vorschlag: `feat(projects): add visual identities for project cards`


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
