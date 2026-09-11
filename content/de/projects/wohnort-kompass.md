---
title: "Wohnort-Kompass"
description: "Gemeinden in Deutschland nach eigenen Prioritäten vergleichen: mit Daten zu Klima, Luft, Verkehr, Bevölkerung und Alltagsangeboten."
locale: "de"
slug: "wohnort-kompass"
translationKey: "wohnort-kompass"
status: "development"
featured: false
categories: ["housing"]
technologies: ["Python", "PostGIS", "Open Data"]
links: {"website": "https://wohnortkompass.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-living-map"}
source: "https://codefor.de/projekte/fl-open-living-map/"
image: /images/projects/wohnort-kompass.svg
imageAlt: "Eine Kompassnadel über einer Hausform verbindet Orientierung und die Suche nach einem Wohnort."
---

## Worum geht es?

Wohnort-Kompass hilft dabei, Gemeinden in Deutschland anhand öffentlicher Daten zu vergleichen. Die Anwendung verbindet eine Wohnortsuche mit Ranglisten, einer Vergleichsansicht und Detailseiten zu einzelnen Orten. Entscheidend sind dabei deine eigenen Prioritäten: Im Finder kannst du gewichten, welche Themen dir besonders wichtig sind.

Das Projekt betrachtet sieben Bereiche: Klima, Luftqualität, Verkehrssicherheit, Demografie, Angebote des täglichen Lebens, Flächennutzung und öffentlichen Nahverkehr. Daraus entstehen Teilbewertungen und ein persönlich gewichtetes Ergebnis. Bis zu drei Gemeinden lassen sich nebeneinander vergleichen. Eine Suche nach Gemeindenamen oder Postleitzahl erleichtert den Einstieg; die Detailseiten zeigen die zugrunde liegenden Werte, Quellen und Karten.

## Warum gibt es das Projekt?

Ein einzelner Rangplatz sagt wenig darüber aus, ob ein Ort zu den eigenen Vorstellungen passt. Wohnort-Kompass macht die Kriterien hinter einem Vergleich sichtbar und lässt unterschiedliche Gewichtungen zu. Wer etwa Nahverkehr und Alltagsangebote stärker berücksichtigt, stellt eine andere Frage als jemand, der vor allem Klimaindikatoren betrachten möchte.

Damit werden regionale Daten zu einer Orientierungshilfe für Menschen, die einen Wohnort erkunden oder Alternativen vergleichen. Die Ergebnisse beschreiben Gemeinden anhand ausgewählter Indikatoren. Sie ersetzen weder den persönlichen Eindruck vor Ort noch eine Wohnungssuche mit konkreten Angeboten.

## Daten und Technik

Das Repository dokumentiert Importe von BKG-Gemeindegrenzen, Destatis und Regionalstatistik, Deutschem Wetterdienst, Umweltbundesamt, Unfallatlas, OpenStreetMap sowie Fahrplandaten im GTFS-Format. Diese Quellen liefern unterschiedliche Ausschnitte der Lebensbedingungen. Beispielsweise werden Wetter- und Luftmessstationen den Regionen zugeordnet und auf den Detailseiten ausgewiesen.

Hinweise zu Datenabdeckung, Aktualität und indirekten Näherungswerten gehören zur Darstellung. Fehlende Kategorien werden nicht einfach als null bewertet. Das ist für die Einordnung wichtig: Ein Messwert einer zugeordneten Station ist keine flächendeckende Messung in jeder Straße.

Technisch kombiniert die Anwendung ein Nuxt-Frontend mit FastAPI und PostgreSQL/PostGIS. Importprozesse bereiten die Quellen auf; anschließend werden die Bewertungen berechnet.

## Mitmachen

Hilfreich sind nachvollziehbare Hinweise zu Datenfehlern, Erklärungen der Bewertungsmethodik und Rückmeldungen zur Vergleichsansicht. Im verlinkten Repository kannst du Fragen zu einzelnen Indikatoren stellen oder Verbesserungen an Importen, Darstellung und Dokumentation vorschlagen.
