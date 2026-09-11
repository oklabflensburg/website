---
title: "Open City Planner"
description: "Selbst betreibbares WebGIS: Stadtgebiete in Flensburg mit OpenStreetMap und kommunalen Daten erkunden, vergleichen und analysieren."
locale: "de"
slug: "open-city-planner"
translationKey: "open-city-planner"
status: "unknown"
featured: true
featuredOrder: 0
categories: ["urbanDevelopment"]
technologies: ["PostGIS", "FastAPI", "Nuxt", "MapLibre", "OpenStreetMap"]
links: {"website": "https://stadtplaner.oklabflensburg.de/", "github": "https://github.com/oklabflensburg/open-city-planner"}
source: "https://github.com/oklabflensburg/open-city-planner"
image: /images/projects/open-city-planner.svg
imageAlt: "Gestapelte Kartenebenen mit Straßenachsen, Polygonflächen und einem zentralen Datenpunkt."
---

## Worum geht es?

Open City Planner ist eine offene WebGIS-Plattform für Stadtplanung und räumliche Fragestellungen. In der Flensburger Referenzanwendung kannst du Stadtteile, statistische Gebiete und selbst gezeichnete Flächen im Browser untersuchen. Kartenobjekte aus OpenStreetMap werden dabei mit verfügbaren öffentlichen Stadtdaten zusammengebracht.

Du kannst nach Adressen, Orten und Gebieten suchen, eine Fläche auswählen und zugehörige Orte sowie räumliche Kennzahlen ansehen. Für den Vergleich mehrerer Gebiete verwendet die Anwendung gemeinsame Kennzahlen. So lassen sich Unterschiede nachvollziehen, ohne zwischen voneinander getrennten Karten und Tabellen wechseln zu müssen. Eigene Polygone lassen sich zeichnen und mit einem Benutzerkonto speichern und verwalten; öffentliche Informationen sind auch ohne Anmeldung zugänglich.

## Warum gibt es das Projekt?

Viele Fragen zur Stadt haben einen räumlichen Bezug, während die benötigten Informationen auf unterschiedliche Quellen verteilt sind. Open City Planner soll solche Zusammenhänge auch Menschen zugänglich machen, die nicht täglich mit professioneller GIS-Software arbeiten. Das unterstützt die Beschäftigung mit dem eigenen Quartier ebenso wie den Austausch über Stadtentwicklung.

Die Software lässt sich selbst betreiben. Flensburg ist die Referenz, keine technische Beschränkung auf eine einzige Stadt. Für andere Orte müssen allerdings Daten, Gebietsgrenzen und Anbindungen angepasst werden. Eine sofort einsatzbereite Installation für beliebige Kommunen verspricht das Projekt bislang nicht.

## Daten und Technik

OpenStreetMap liefert räumliche Objekte und Grenzen. Für Flensburg ist außerdem der kommunale „Zahlenspiegel“ als Quelle für Bevölkerungs- und Haushaltsstatistiken dokumentiert. Die Zuordnung dieser Statistik zu Stadtteilen bedeutet nicht, dass OSM-Grenzen und amtliche Statistikgebiete geometrisch identisch sind.

Nuxt und Vue bilden die Oberfläche, MapLibre stellt die Karte dar. FastAPI und PostgreSQL mit PostGIS übernehmen Datenzugriff und räumliche Verarbeitung. Die Dokumentation erläutert Datenimporte und den Betrieb einer eigenen Instanz.

## Mitmachen

Beiträge zu Kartenbedienung, Datenanbindungen, räumlichen Analysen und verständlicher Dokumentation sind willkommen. Wer die Plattform für eine andere Stadt einsetzen möchte, kann im verlinkten Repository den eigenen Anwendungsfall und verfügbare Daten beschreiben. Dort stehen auch die Hinweise für Entwicklung und Zusammenarbeit.
