---
title: "Open Data API"
description: "Die Open Data API erschließt kommunale und regionale Daten für eigene Karten, Auswertungen und Anwendungen."
locale: "de"
slug: "open-data-api"
translationKey: "open-data-api"
status: "seeking-contributors"
featured: false
categories: ["infrastructure"]
technologies: ["Python", "FastAPI", "PostgreSQL", "ETL"]
links: {"website": "https://api.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-data-api"}
source: "https://codefor.de/projekte/fl-open-data-api/"
image: /images/projects/open-data-api.svg
imageAlt: "Drei offene Datenmodule verbinden sich über Leitungen mit vier äußeren Datenknoten."
---

## Worum geht es?

Die Open Data API ist die Datenschnittstelle des OK Lab Flensburg. Sie stellt öffentliche Informationen so bereit, dass Programme sie direkt abfragen und weiterverarbeiten können. Ihr Schwerpunkt liegt auf Flensburg und Schleswig-Holstein; der geografische Umfang hängt vom jeweiligen Datenangebot ab.

Im aktuellen Quellcode sind unter anderem Zugänge zu Schulen, Polizeidienststellen, Denkmälern, Biotopen, Straßenbäumen und demografischen Daten registriert. Hinzu kommen Verwaltungs-, Klima- und Energiedaten. Die Nutzungsbeispiele zeigen etwa, wie sich Energieanlagen über eine Kennung oder einen Gemeindeschlüssel und Gemeinden über ihren Namen abfragen lassen.

Für Entwickler:innen ist die API ein Ausgangspunkt für eigene Karten, Webseiten und Auswertungen. Wer zunächst nur verstehen möchte, welche Informationen verfügbar sind, kann die verlinkte interaktive Dokumentation öffnen. Dort werden die einzelnen Anfragen und ihre Parameter beschrieben.

## Warum gibt es das Projekt?

Eine veröffentlichte Tabelle ist noch nicht automatisch leicht in einer Anwendung nutzbar. Unterschiedliche Formate, geografische Zuordnungen und einzelne Downloads verursachen zusätzliche Arbeit. Die API bündelt Zugriffe und macht aufbereitete Daten über nachvollziehbare Schnittstellen wiederverwendbar.

Dadurch müssen Projekte grundlegende Datenzugriffe nicht jedes Mal neu entwickeln. Auch kommunale Fragestellungen lassen sich mit eigenen Visualisierungen untersuchen. Welche Aussage möglich ist, hängt weiterhin von Inhalt, Gebiet und Erhebungsstand der jeweiligen Quelle ab; ein gemeinsamer Zugang macht verschiedene Datensätze nicht automatisch vergleichbar.

## Daten und Technik

Der Dienst verwendet Python mit FastAPI und eine PostgreSQL-Datenbank mit PostGIS für Geodaten. Importanleitungen verbinden ihn beispielsweise mit den Datenbeständen der Denkmalkarte und des Sozialatlas. Weitere Importwerkzeuge und Datenmodelle sind im Repository dokumentiert.

Die API liefert maschinenlesbare Antworten und beschreibt ihre Schnittstellen mit OpenAPI. Die Dokumentation ist deshalb auch beim Einstieg in ein eigenes Projekt hilfreich: Erst den passenden Endpunkt und seine Parameter prüfen, dann die benötigten Daten in die eigene Anwendung einbinden.

## Mitmachen

Fehlerberichte, nachvollziehbare Abfragebeispiele und Vorschläge zu Datenangeboten können als Issue im verlinkten Repository eingebracht werden. Hilfreich sind die verwendeten Parameter und eine Beschreibung des erwarteten Ergebnisses. Auch Verbesserungen an Importen und Dokumentation erleichtern anderen die Nachnutzung.
