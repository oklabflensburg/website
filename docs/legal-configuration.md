# Betreiberangaben und Rechtstexte

Impressum und Datenschutz verwenden denselben Datensatz aus `runtimeConfig.public.legal` in `nuxt.config.ts`. Nuxt überschreibt die Felder mit `NUXT_PUBLIC_LEGAL_*` aus der Prozessumgebung. `useLegalContact()` normalisiert die Angaben über `shared/utils/legal.ts`; `app/components/content/LegalDetails.vue` rendert sie mit Vue-Escaping. Die sechs Markdown-Seiten binden diese Komponente über MDC ein. Überschriften und Fließtext bleiben in `content/{de,da,en}/pages/`, Feldbeschriftungen in den drei UI-Dictionaries.

Die Angaben sind **öffentlich**, auch im Nuxt-Seitenpayload. Nur zur Veröffentlichung bestimmte Betreiberinformationen konfigurieren; keine Zugangsdaten oder internen Kontaktdaten. Es gibt keine zweite Betreiberkonfiguration in `shared/config/site.ts`: dessen `site.email` ist der allgemeine öffentliche Lab-Kontakt, `site.meeting` beschreibt ausschließlich das Treffen. Beides begründet keine rechtliche Betreiberidentität. Auf den Rechtstextseiten entfällt der bisherige allgemeine Kontaktkasten zugunsten der konfigurierten Angaben.

## Variablen

Alle Werte beziehen sich auf denselben Betreiber und gelten unverändert in DE, DA und EN. Keine `ADDRESS_*`-/`CONTACT_*`-Aliase.

| Umgebungsvariable | Pflicht | Inhalt |
| --- | --- | --- |
| `NUXT_PUBLIC_LEGAL_NAME` | ja | Vollständiger Anbietername; Rechtsform nur falls bestätigt |
| `NUXT_PUBLIC_LEGAL_STREET` | ja | Straße der ladungsfähigen Anschrift |
| `NUXT_PUBLIC_LEGAL_HOUSE_NUMBER` | ja | Hausnummer einschließlich etwaiger Zusätze |
| `NUXT_PUBLIC_LEGAL_POSTAL_CODE` | ja | Postleitzahl |
| `NUXT_PUBLIC_LEGAL_CITY` | ja | Ort |
| `NUXT_PUBLIC_LEGAL_COUNTRY` | ja | Land als lesbarer Name |
| `NUXT_PUBLIC_LEGAL_EMAIL` | ja | Einzelne erreichbare E-Mail-Adresse, ohne Anzeigename oder URL-Parameter |
| `NUXT_PUBLIC_LEGAL_PHONE` | nein | Telefonnummer, vorzugsweise international mit `+`; Ziffern, Leerzeichen, Klammern, `/`, `.` und `-` erlaubt |
| `NUXT_PUBLIC_LEGAL_REPRESENTED_BY` | nein | Bestätigte vertretungsberechtigte Personen |
| `NUXT_PUBLIC_LEGAL_REGISTER_COURT` | nein | Registergericht, sofern zutreffend |
| `NUXT_PUBLIC_LEGAL_REGISTER_NUMBER` | nein | Register und Nummer, sofern zutreffend |
| `NUXT_PUBLIC_LEGAL_VAT_ID` | nein | Umsatzsteuer-ID, sofern vorhanden und anzugeben |
| `NUXT_PUBLIC_LEGAL_PRIVACY_CONTACT_PERSON` | nein | Zusätzliche Kontaktperson für Datenschutz; keine automatische Benennung als Datenschutzbeauftragte/r |
| `NUXT_PUBLIC_LEGAL_CONTENT_RESPONSIBLE` | nein | Vollständiger Name **und ladungsfähige Anschrift** der inhaltlich verantwortlichen Person, nur wenn § 18 Abs. 2 MStV nach Prüfung einschlägig ist |

Optionale Felder werden bei leerem Wert einschließlich ihrer Beschriftung weggelassen. Fachlich können einzelne davon für den tatsächlichen Betreiber verpflichtend sein; diese Entscheidung kann der Code nicht treffen. Datenschutzkontakt und inhaltliche Verantwortung sind unterschiedliche Rollen.

## Entwicklung und Deployment

```sh
cp .env.example .env
pnpm dev
```

Die versionierte [`.env.example`](../.env.example) enthält ausschließlich erkennbare fiktive Beispiele. Development benötigt keine vollständigen Betreiberangaben; ohne `.env` bleiben die Angaben leer. `.env` und `.env.*` sind ignoriert, nur `.env.example` wird versioniert. Echte Produktionswerte niemals committen, in Tickets kopieren oder in CI-Logs ausgeben. Keine Produktionsdaten zum Bauen oder Testen verwenden.

```sh
pnpm build
# Auf dem Zielserver: .env durch eine geschützte Datei mit geprüften Werten ersetzen.
HOST=0.0.0.0 PORT=3000 node --env-file=.env .output/server/index.mjs
```

Der normale Node-Start ohne `--env-file` liest `.env` nicht automatisch. Alternativ die Variablen über die Deployment-Umgebung oder systemd `EnvironmentFile=` bereitstellen. Die Syntax der Datei muss zum verwendeten Loader passen. Nach Änderung der Prozessumgebung den Server neu starten; für reine Betreiberänderungen ist kein Neubau notwendig. Rechtstextänderungen benötigen dagegen einen Content-Build. `pnpm preview` benötigt ebenfalls vollständige, zulässige Angaben.

## Produktionsprüfung

`server/plugins/legal-config.ts` prüft synchron beim Start des gebauten Nitro-Node-Servers, bevor dieser Requests annimmt. Bei fehlenden Pflichtangaben, erkennbaren Platzhaltern (etwa `TODO`, `undefined`, `Example…`, `Muster…`, Template-Tokens oder reservierten Beispieldomains), ungültiger E-Mail oder ungültigem gesetztem Telefon bricht der Start mit Fehlerstatus ab. Auch gesetzte optionale Texte werden auf Platzhalter geprüft. Fehler nennen ausschließlich Konfigurationsschlüssel, niemals die Werte.

Die Prüfung verwendet die beim Build festgelegten Flags `import.meta.dev` und `import.meta.prerender`: Development und Nuxt Contents interner SQL-Prerender beim Build benötigen keine Deployment-Identität. Die Legal-Seiten selbst werden zur Request-Zeit gerendert. `NODE_ENV=development` beim Start eines Produktionsartefakts schaltet die Prüfung nicht ab. Es gibt keinen Test- oder Deployment-Bypass. Ein Build ohne Betreiberangaben ist bewusst zulässig: Das portable Artefakt kennt die spätere systemd-/Container-Umgebung noch nicht. Ein erfolgreicher Build allein bestätigt daher keine betriebsbereite Konfiguration.

Die Normalisierung entfernt Rand-Leerzeichen und vereinheitlicht innere Leerzeichen/Zeilenumbrüche. Numerische Hausnummern, Postleitzahlen, Telefon- und Registernummern berücksichtigt sie auch nach Nitros Environment-Parsing; Postleitzahlen mit führenden Nullen als Zeichenkette erhalten. Andere unerwartete Datentypen werden nicht in Ausgabetext umgewandelt. E-Mail- und Telefonlinks werden gesondert sicher abgeleitet.

Die Prüfung erkennt verbreitete Fehler, **verifiziert aber weder die Existenz noch die rechtliche Richtigkeit einer Identität**. Die Playwright-Fixture ist vollständig erfunden und bewusst syntaktisch plausibel; der Produktionscode enthält keine Sonderbehandlung dafür. Playwright setzt alle Legal-Felder explizit und startet stets einen eigenen Server. Zusätzliche Starttests weisen nach, dass fehlende und Beispielangaben scheitern und dass optionale Runtime-Overrides ohne Neubau in allen Sprachen im SSR erscheinen.

## Redaktion und Datenschutzprüfung vor Veröffentlichung

Betreiberangaben ausschließlich in der Deployment-Konfiguration pflegen. Übersetzte Rechtstexte ausschließlich in den sechs Content-Dateien ändern. Jede Änderung an Identität, Vertretung, Zuständigkeit oder Rechtstexten benötigt vor Veröffentlichung menschliche und fachliche/rechtliche Prüfung. Die technische Umsetzung ersetzt diese Prüfung nicht.

Der Code-Audit für Issue #17 ergab:

- Manrope, Bilder, SVG-Kartenillustration und Projekt-Signets werden lokal ausgeliefert. Externe Karten, GitHub und Mastodon sind Links; es gibt keine automatisch geladenen Einbettungen.
- Keine Analyse-/Werbeintegration, keine Anwendungscookies, kein `localStorage` oder `sessionStorage`. Sprachwahl und Filter verwenden URLs. Kein Kontaktformular und keine Benutzerkonten.
- Kein eigener Besucher-Access-Logger. Hosting, Reverse-Proxy-/CDN-Protokolle, Empfänger, Aufbewahrungsfristen, etwaige Drittlandübermittlungen und der E-Mail-Betrieb sind aus dem Repository nicht feststellbar. Der Browsercheck überprüft zusätzlich Requests und Speicher im Testbetrieb; das belegt keine Produktionsinfrastruktur.

**Vor Veröffentlichung offen:** tatsächlichen Hosting- und E-Mail-Betrieb erheben und die Datenschutztexte in allen drei Sprachen um die erforderlichen konkreten Informationen ergänzen. Die Texte beschreiben bisher den belegten Anwendungsumfang und allgemeine Kriterien, nennen keine erfundenen Dienstleister oder Fristen. Register, USt-ID, Vertretung, §-18-Verantwortlichkeit, Datenschutzkontakt und zuständige Aufsichtsbehörde ebenfalls prüfen. Alle offenen Punkte bleiben in [editorial-todos.md](editorial-todos.md) sichtbar. Ein technisch vollständiger Datensatz ist keine redaktionelle Freigabe.

Alle sechs Seiten behalten absichtlich `noindex: true` (`noindex, follow`). Sie bleiben öffentlich und SSR-fähig, mit dem vorhandenen lokalisierten Canonical, OpenGraph/Twitter und WebPage-Daten. Entsprechend der bestehenden Architektur erscheinen nicht indexierbare Seiten weder in Sitemap noch in hreflang. Der Sprachwechsel bleibt über den Content-Übersetzungsindex möglich. `noindex` ist kein Zugriffsschutz und ersetzt keine vollständigen Rechtstexte.

Referenzen: [Nuxt Runtime Config](https://nuxt.com/docs/4.x/guide/going-further/runtime-config), [Nuxt Content MDC](https://content.nuxt.com/docs/files/markdown), [DSGVO](https://eur-lex.europa.eu/eli/reg/2016/679/oj), [Open City Planner als Architekturreferenz](https://github.com/oklabflensburg/open-city-planner). Aus OCP wurden weder Betreiberwerte noch anwendungsspezifische Datenschutzabschnitte übernommen.
