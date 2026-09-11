---
title: "Bildungsatlas"
description: "Schulen in Schleswig-Holstein nach Standort und Schulart erkunden, Kontaktdaten finden und einzelne Einrichtungen direkt aufrufen."
locale: "de"
slug: "bildungsatlas"
translationKey: "bildungsatlas"
status: "seeking-contributors"
featured: false
categories: ["education"]
technologies: ["Vue", "Python", "PostGIS"]
links: {"website": "https://schulkarte.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-school-map"}
source: "https://codefor.de/projekte/fl-open-school-map/"

image: /images/projects/bildungsatlas.svg
imageAlt: "Ein geöffnetes Buch mit gefalteten Kartenflächen und einem blauen Bildungsstandort."
---

## Worum geht es?

Der Bildungsatlas zeigt Schulstandorte auf einer interaktiven Karte. Aus der ursprünglichen Idee einer Flensburger Schulübersicht ist eine Anwendung für Schleswig-Holstein geworden. Eltern, Interessierte und Kommunen können Einrichtungen räumlich einordnen und vorhandene Kontaktinformationen sowie weiterführende Links finden.

Die Karte lässt sich nach Schulart filtern. Markierungen öffnen eine Detailansicht; einzelne Schulen sind über eigene Adressen direkt aufrufbar. Eine Standortfunktion unterstützt die Suche in der Umgebung. Damit wird beispielsweise sichtbar, wo Schulen im Verhältnis zum Wohnort liegen. Eine Berechnung des Schulwegs wird damit nicht versprochen.

## Warum gibt es das Projekt?

Der Anlass war die Suche nach einer Grundschule in Flensburg. Kontaktdaten waren vorhanden, ließen sich aber nur umständlich zu einer räumlichen Übersicht zusammenfügen. Der Bildungsatlas verbindet diese Informationen mit einer Karte und erleichtert so den ersten Überblick über mögliche Einrichtungen.

## Daten und Technik

Die Projektbeschreibung nennt das Verzeichnis der allgemeinbildenden Schulen in Schleswig-Holstein, ergänzend das Verzeichnis der berufsbildenden Schulen und Informationen der verlinkten Einrichtungen. Das aktuelle Repository dokumentiert den Zugriff auf die Schul-Schnittstelle der Open Data API und Datenimporte in PostgreSQL/PostGIS. Schulnummern können beim Import mit Wikidata-Einträgen verknüpft werden.

Nuxt und Leaflet bilden die Kartenanwendung. Die früher beschriebene Auswertung von Spiel- und Pausenflächen war eine Ausbauidee und gehört nicht zu den hier zugesagten Funktionen.

## Mitmachen

Hilfreich sind Hinweise auf falsche Kontaktdaten, unklare Schularten oder Probleme beim Öffnen einer Schule. Nenne im verlinkten Repository die betroffene Einrichtung und möglichst ihre offizielle Informationsseite. Auch Verbesserungen an Bedienung und Dokumentation erleichtern die Nutzung.
