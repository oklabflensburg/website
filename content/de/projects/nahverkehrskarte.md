---
title: "Nahverkehrskarte"
description: "Ein Flensburger Kartenprototyp zeigt Haltestellen und Linienverläufe aus OpenStreetMap im Zusammenhang mit den Stadtteilen."
locale: "de"
slug: "nahverkehrskarte"
translationKey: "nahverkehrskarte"
status: "seeking-contributors"
featured: false
categories: ["mobility"]
technologies: ["OpenStreetMap", "GIS"]
links: {"website": "https://nahverkehr.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-transport-map"}
source: "https://codefor.de/projekte/fl-open-transport-map/"

image: /images/projects/nahverkehrskarte.svg
imageAlt: "Ein abstrahierter Bus neben einer Linienroute mit markierten Haltestellen."
---

## Worum geht es?

Die Nahverkehrskarte ist ein Kartenprototyp für Flensburg. Sie stellt Linienverläufe und Haltestellen zusammen mit den Stadtteilflächen dar. Auf diese Weise lässt sich erkunden, wie die erfassten Verkehrsangebote im Stadtgebiet verteilt sind und wo sich Haltestellen befinden.

Im Mittelpunkt steht die räumliche Übersicht über das Netz. Die Anwendung lädt vorbereitete Geodaten; sie bietet keine verifizierte Echtzeitauskunft zu Abfahrten und keine Verbindungssuche. Das Repository bezeichnet den Ausgangsstand als „Nahverkehr 2023“.

## Warum gibt es das Projekt?

Das Projekt untersucht, was sich mit frei zugänglichen Nahverkehrsdaten sichtbar machen lässt. Eine der Ausgangsfragen war, wie sich Haltestellen im Verhältnis zur Bevölkerung eines Stadtteils verteilen. Die Karte liefert einen räumlichen Einstieg in solche Überlegungen, ohne eine fertige Erreichbarkeitsanalyse zu behaupten.

Für Einwohner:innen und Menschen, die sich mit Mobilität beschäftigen, kann diese Übersicht helfen, die Struktur des Netzes zu verstehen und Fragen zur Versorgung einzelner Gebiete zu formulieren.

## Daten und Technik

Die Projektquellen benennen OpenStreetMap als Grundlage für die Verkehrsdaten. Im aktuellen Quellcode werden GeoJSON-Dateien für Linien, Haltestellen und Stadtteile geladen und mit Leaflet auf einer OpenStreetMap-Grundkarte dargestellt.

Die Aussagekraft hängt davon ab, wann die vorbereiteten Daten erhoben wurden. Eine sichtbare Linie ist deshalb keine Zusage zu heutigen Fahrtzeiten oder zum aktuellen Betrieb.

## Mitmachen

Beiträge können bei der Aktualisierung und Dokumentation der Datengrundlage oder bei einer verständlicheren Kartendarstellung ansetzen. Beschreibe im verlinkten Repository konkret, welche Haltestelle, Linie oder Fragestellung du untersuchen möchtest.
