# Typografie und Lesbarkeit

Die bestehende Tailwind-4-Skala in `app/assets/css/main.css` bleibt die einzige Typografiequelle. Manrope wird weiterhin lokal geladen. Keine zusätzliche Typography-Bibliothek, Fontdatei oder parallele Token-Skala.

## Audit und Umsetzung

Das Audit umfasste globale Styles, alle Vue-Seiten und Komponenten, Nuxt-Content-Ausgabe, Header/Footer, Projektkarten und Details, Blog, Events, Team, Mitmachen, Über uns, Verein, Kontakt und rechtliche Seiten. Es gab keine separate Tailwind-Konfiguration und kein `prose-sm`; die vorhandene `.prose`-Klasse ist das gemeinsame Content-Styling. Viele normale Texte waren dennoch nur 13–15 px groß; Bedientexte und Metadaten teilweise 10–12 px. Kleine Inline-Overrides in MeetingSection und Projekt-Details verstärkten das Problem.

| Rolle | Vorher | Jetzt |
| --- | --- | --- |
| Body-Standard | implizit 16 px / 1,625 | explizit `text-base leading-7` (16/28 px) |
| Redaktioneller Text, Blog, Projekttexte | 15/27 px | mobil 16/28 px, ab `md` 18/32 px, maximal `max-w-3xl` (768 px) |
| Einleitung / Hero-Beschreibung | 15 px | 18/28 px, ab `md` 20/32 px |
| Desktop-Navigation / Sprachwahl | 13/11 px | 16 px |
| Mobile Navigation | 14 px | 18 px |
| Buttons / weiterführende Links | 12–14 px | 16 px, mindestens 44 px Höhe |
| Kartenüberschrift | 16 px | 20 px |
| Projekt-/Blog-/Team-/Eventbeschreibung | 13 px | 16/28 px, ab `md` 18/32 px |
| Meeting-Angaben und Hinweise | 12–14 px | 16/28 px |
| Tags, Daten, Byline, Footer | 11–12 px | 14 px |

Die Hero- und Seitentitel bleiben unverändert. Abschnittstitel nutzen 24/30 px; längere Absätze bekommen 24 px Abstand. Die redaktionelle Breite begrenzt lange Zeilen auf ungefähr 60–80 Zeichen, abhängig vom Text. Blockquotes, Listen, Links, Tabellen und Codeblöcke teilen das Content-Styling; breite Tabellen und Codeblöcke dürfen innerhalb ihres eigenen Bereichs scrollen.

Die gemeinsamen Kartenregeln erreichen auch Eventbeschreibungen und Team-Bios. Derzeit sind keine freigegebenen Teamprofile oder zusätzlichen Veranstaltungseinträge verfügbar; für den Review wurden keine Personen oder Termine erfunden.

## Umbruch und Bedienung

- Abschnittsüberschrift und Link dürfen auf getrennte Zeilen umbrechen.
- Redaktionelle Seiten, Projekt-Details und der Meeting-Block wechseln erst ab `lg` in ihr mehrspaltiges Layout; darunter bleibt Platz für gut lesbare Zeilen.
- Karten- und Content-Titel können lange Wörter umbrechen; Grid-Kinder dürfen schrumpfen. Es wird kein Seitenüberlauf versteckt.
- Buttons, Menüschalter, Sprachwahl und Iconlinks bieten mindestens 44 px hohe Ziele. Footerlinks erhalten ebenfalls 44 px Höhe.
- Fokusrahmen und Unterstreichungen im Fließtext bleiben erhalten.

## Kontrast

Der gemeinsame Sekundärtext wird von `#4e6277` auf `#40566b` abgedunkelt. Das betrifft Beschreibungen, Artikeltext, Metadaten und Footer, ohne die helle Variante-1-Palette zu ändern. Platzhalter im Suchfeld verwenden ebenfalls diesen Ton mit voller Deckkraft statt aufgehellter Standardschrift.

| Hintergrund | Vorher | Jetzt |
| --- | --- | --- |
| Weiß `#ffffff` | 6,29:1 | 7,60:1 |
| Helle Fläche `#f5f7fa` | 5,86:1 | 7,09:1 |

Berechnet aus der relativen sRGB-Luminanz. Navy-Überschriften `#102c48` und blaue Links/Buttons `#0b4f80` bleiben erhalten (14,23:1 bzw. 8,59:1 gegen Weiß).

## Bewusst kleinere Schrift: abschließender Suchaudit

`text-xs` bleibt ausschließlich an `.map-credit`: die kurze OpenStreetMap-Attribution wächst von 10 auf 12 px. Kein `prose-sm`, `leading-4` oder `leading-5` ist vorhanden. Enge Zeilenhöhen betreffen Überschriften, keine Inhaltsabsätze.

Alle verbleibenden `text-sm`-Treffer sind geprüfte Sekundärrollen:

- `.eyebrow`: kurzer Rubrikenname.
- `.map-caption`: kurze Kartenbeschriftung.
- `.pillars p`: kurze Kennzahlen-/Eigenschaftslabels und Zeitangabe.
- `.tags span`: Kategorien und technische Tags.
- `.card-meta`, `.news-list time`, `.blog-card .byline`, `.article-meta`: Datum, Kategorie und Autor.
- `.footer-tagline`, `.footer nav a`: ergänzender Footer und rechtliche Navigation.
- `.breadcrumbs`: Standortnavigation.
- `.filter-bar p`: Ergebnisanzahl, kein Eingabefeld.
- Projekt-Absender: kurzer Organisationshinweis neben dem kanonischen Logo.
- Meeting-Fotounterschrift: Herkunft des historischen Fotos.

Normale Beschreibungen, CTA-Hinweise, Kontaktdaten und Projektstatus verwenden mindestens 16 px.

## Validierung und Screenshots

Die Browserprüfungen kontrollieren Schriftgrößen, Content-Breite, Zeilenhöhe, Touch-Ziele und horizontalen Überlauf über 13 Seitentypen. Reflow wird bei 720 CSS-Pixeln (entspricht der Layoutbreite eines 1440-px-Fensters bei 200 % Browserzoom) und zusätzlich bei 320 CSS-Pixeln geprüft, einschließlich Sprachvarianten und funktionsfähiger Navigation. Das ist eine Prüfung der effektiven Layoutbreite, keine Automatisierung des Browser-Zoommenüs.

| Seite | Desktop 1440 px | Mobil 390 px |
| --- | --- | --- |
| Startseite | [Screenshot](screenshots/desktop-home.png) | [Screenshot](screenshots/mobile-home.png) |
| Projekte | [Screenshot](screenshots/desktop-projekte.png) | [Screenshot](screenshots/mobile-projekte.png) |
| Über uns | [Screenshot](screenshots/desktop-ueber-uns.png) | [Screenshot](screenshots/mobile-ueber-uns.png) |
| Mitmachen | [Screenshot](screenshots/desktop-mitmachen.png) | [Screenshot](screenshots/mobile-mitmachen.png) |
| Blog | [Screenshot](screenshots/desktop-blog.png) | [Screenshot](screenshots/mobile-blog.png) |
| Verein | [Screenshot](screenshots/desktop-daten-sind-daten.png) | [Screenshot](screenshots/mobile-daten-sind-daten.png) |

Alle zwölf Desktop-/Mobile-Screenshots wurden mit dem Ausgangsstand verglichen. Beschreibungen, Bedienelemente und Footer sind deutlich größer; Karten, helle Flächen, Bildgrößen und die vorhandenen Marken bleiben erhalten. Lange Titel umbrechen vollständig. Zusätzlich wurden ein Blogartikel, das geöffnete Mobile-Menü und die 720-px-Startseite visuell geprüft. Keine abgeschnittenen Inhalte oder horizontalen Seitenüberläufe festgestellt.

| Prüfung | Ergebnis |
| --- | --- |
| `pnpm lint` | erfolgreich |
| `pnpm typecheck` | erfolgreich |
| `pnpm test` | 27 Unit-Tests bestanden |
| `pnpm build` | erfolgreich, einschließlich erneutem Build nach der Platzhalter-Kontrastkorrektur |
| `pnpm test:e2e` | 33 Tests bestanden, 3 beabsichtigte gerätespezifische Ausnahmen übersprungen |
| Abschließender Browserlauf nach Platzhalter-Korrektur | 9 betroffene Prüfungen bestanden, 1 Ausnahme übersprungen: Screenshots, axe, Suche, Schriftgrößen und Reflow |
| Quelltext-Audit | nur begründete kleine Schrift; keine zweite Architektur, Bibliothek oder Content-Quelle |
