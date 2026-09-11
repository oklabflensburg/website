---
title: "Badestellenkarte Schleswig-Holstein"
description: "Badestellen in Schleswig-Holstein auf der Karte suchen und Angaben zu Ausstattung, Saison und Badegewässerdaten erkunden."
locale: "de"
slug: "badestellenkarte"
translationKey: "badestellenkarte"
status: "development"
featured: false
categories: ["leisure"]
technologies: ["Python", "OpenStreetMap", "Open Data"]
links: {"website": "https://badestellenkarte.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-bath-map"}
source: "https://codefor.de/projekte/fl-open-bath-map/"
image: /images/projects/badestellenkarte.svg
imageAlt: "Ein Standortmarker über zwei Wasserwellen neben einer stilisierten Küstenlinie."
---

## Worum geht es?

Die Badestellenkarte Schleswig-Holstein macht Informationen zu Badestellen und weiteren Orten am Wasser gemeinsam zugänglich. Du kannst einen Kartenausschnitt erkunden, einzelne Markierungen auswählen und die vorhandenen Angaben zum jeweiligen Ort lesen. Beim Verschieben der Karte werden die passenden Standorte für den sichtbaren Bereich geladen.

Eine Textsuche und Filter nach Typ, Kategorie und Infrastruktur helfen beim Eingrenzen. Außerdem unterstützt die Anwendung eine Umkreissuche über den Browserstandort. So lässt sich ein bekannter Ort gezielt nachschlagen oder eine Umgebung nach Badestellen durchsuchen. Eigene Detailseiten machen einzelne Einträge direkt aufrufbar.

## Warum gibt es das Projekt?

Informationen über Badegewässer verteilen sich auf mehrere Datensätze. Für einen Ausflug sind aber oft mehrere Fragen gleichzeitig interessant: Wo liegt die Badestelle, welche Ausstattung ist erfasst und welche Angaben zum Gewässer liegen vor? Das Projekt führt diese Informationen räumlich zusammen und erleichtert den Zugang ohne eigene Datenaufbereitung.

Die ergänzenden Orte aus dem Tourismusbereich werden dabei als eigene Kartenobjekte behandelt. Ein Ort am Wasser ist dadurch nicht automatisch eine ausgewiesene Badestelle. Diese Unterscheidung hilft, die Ergebnisse der Suche richtig einzuordnen.

## Daten und Technik

Grundlage sind offene Daten des Landes Schleswig-Holstein zu Stammdaten, Einstufung, Infrastruktur, Saisondauer und Messungen der Badegewässer. Hinzu kommen wassernahe Orte aus der touristischen Landesdatenbank. Die Quellenkonfiguration im Repository hält fest, wie diese Informationen gefunden und geladen werden.

Ein FastAPI-Backend vereinheitlicht die Daten für Kartenabfragen. Die Oberfläche verwendet Nuxt, Vue und Leaflet. PostgreSQL mit PostGIS kann zusätzlich für Speicherung und räumliche Suche eingesetzt werden; es ist laut Dokumentation optional. Welche Angaben bei einem einzelnen Ort vorhanden sind, hängt von den Quelldaten ab.

## Mitmachen

Kennst du eine der erfassten Badestellen, kannst du die Darstellung und Quellenangaben prüfen. Für einen Fehlerbericht sind der betroffene Eintrag und eine nachvollziehbare Quelle hilfreich. Auch Tests der Suche, der Filter und der mobilen Bedienung sind sinnvolle Beiträge über das verlinkte Repository.
