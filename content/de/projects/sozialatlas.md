---
title: "Sozialatlas"
description: "Sozialstrukturdaten für Flensburg und seine 13 Stadtteile in einem offenen Prototyp räumlich und über Kennzahlen erschließen."
locale: "de"
slug: "sozialatlas"
translationKey: "sozialatlas"
status: "seeking-contributors"
featured: false
categories: ["society"]
technologies: ["PostGIS", "Open Data", "HTML"]
links: {"website": "https://dev.sozialatlas.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-social-map"}
source: "https://codefor.de/projekte/fl-open-social-map/"

image: /images/projects/sozialatlas.svg
imageAlt: "Verbundene Datenpunkte unterschiedlicher Größe über benachbarten Stadtbezirken."
---

## Worum geht es?

Der digitale Sozialatlas bereitet kommunale Sozialstrukturdaten für Flensburg und seine 13 Stadtteile auf. Er soll Unterschiede innerhalb der Stadt leichter nachvollziehbar machen und eine Grundlage für Planung und öffentliche Diskussion bieten. Einwohner:innen und Menschen aus Verwaltung oder Zivilgesellschaft können sich damit einen Zugang zu den zugrunde liegenden Zahlen verschaffen.

Die ursprüngliche Projektbeschreibung stellt die Auswahl von Stadtteilen auf einer Karte in den Mittelpunkt. Der aktuelle Entwicklungsstand enthält außerdem eine Dashboard-Oberfläche mit Stadtteilauswahl und Kennzahlen, etwa zu Bevölkerung, Altersgruppen, Beschäftigung und Wohnhilfen. Das Repository beschreibt weiterhin einen Prototyp.

## Warum gibt es das Projekt?

Die Stadt veröffentlicht ihren Sozialatlas als Bericht. Für konkrete Fragen zu einem Stadtteil ist es hilfreich, die enthaltenen Angaben zusätzlich strukturiert und interaktiv untersuchen zu können. Das Projekt schafft dafür einen eigenen Zugang zu vorhandenen kommunalen Informationen.

Die Zahlen beziehen sich auf Gebiete und Berichtszeiträume. Sie beschreiben keine einzelnen Personen und erklären soziale Unterschiede nicht von selbst. Gerade beim Vergleich von Stadtteilen sind Definitionen, Bezugsgrößen und Datenstand Teil der Einordnung.

## Daten und Technik

Das Repository nennt den Sozialatlas der Stadt Flensburg, insbesondere die Ausgabe 2022, sowie Stadtteilgeometrien der städtischen Statistikstelle. Enthalten sind Daten zu Bevölkerung, Arbeitsmarkt, Wohnen und sozialer Unterstützung. SQL-Dateien, Metadaten und Importwerkzeuge machen die Aufbereitung nachvollziehbar.

PostgreSQL/PostGIS unterstützt die Datenhaltung und räumliche Zuordnung. Der aktuelle JavaScript-Code verarbeitet strukturierte Daten für Stadtteilansichten. Eine fortlaufende Übernahme jedes neuen Jahresberichts wird hier nicht zugesagt.

## Mitmachen

Hilfreich sind verständliche Erläuterungen von Kennzahlen, überprüfbare Datenkorrekturen und Rückmeldungen zur Darstellung. Gib bei einem Issue im Repository Stadtteil, Berichtsjahr und betroffene Kennzahl an, damit sich die Frage mit der Quelle abgleichen lässt.
