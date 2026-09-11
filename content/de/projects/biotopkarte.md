---
title: "Biotopkarte Schleswig-Holstein"
description: "Kartierte Lebensräume in Schleswig-Holstein erkunden und Angaben zu Biotoptypen, Flächen und Schutzmerkmalen nachlesen."
locale: "de"
slug: "biotopkarte"
translationKey: "biotopkarte"
status: "development"
featured: true
featuredOrder: 2
categories: ["nature"]
technologies: ["GIS", "OpenStreetMap"]
links: {"website": "https://biotopkarte.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-biotope-map"}
source: "https://codefor.de/projekte/fl-open-biotope-map/"
image: /images/projects/biotopkarte.svg
imageAlt: "Ein Blatt in einer Biotopfläche mit Blattadern und zwei Linien für Wasserläufe."
---

## Worum geht es?

Die Biotopkarte Schleswig-Holstein erschließt die landesweite Biotopkartierung im Browser. Sie zeigt kartierte Lebensräume und macht die dazugehörigen Angaben an ihrem geografischen Ort zugänglich. Durch die Auswahl einer Fläche lassen sich vorhandene Informationen wie Biotoptyp und gegebenenfalls FFH-Lebensraumtyp nachlesen.

Die Darstellung berücksichtigt die Unterscheidung zwischen Wertbiotopen und Nichtwertbiotopen. Sie richtet sich an Menschen, die Landschaften in ihrer Umgebung besser verstehen oder sich mit Naturschutzdaten beschäftigen möchten. Die Karte ist ausdrücklich nicht amtlich; angezeigte Informationen können veraltet sein.

## Warum gibt es das Projekt?

Ausgangspunkt waren Erkundungen der Salzwiesen und Steilküste von Holnis. Daraus entstand der Wunsch, die Vielfalt der Lebensräume in Schleswig-Holstein auch digital nachvollziehbar zu machen. Die Karte verbindet Beobachtungen draußen mit den verfügbaren Kartierungsdaten und eröffnet einen Zugang, für den keine eigene GIS-Installation nötig ist.

## Daten und Technik

Die Biotopkartierung stammt vom Landesamt für Umwelt und wird über das Open-Data-Portal Schleswig-Holstein bereitgestellt. Das Repository dokumentiert außerdem die Kartierkulisse der landesweiten Erfassung von 2014 bis 2020 sowie ergänzende Typenschlüssel. Diese Zeitangabe beschreibt die Kartierung, keine aktuelle Bestandsaufnahme vor Ort.

PostgreSQL/PostGIS und Importwerkzeuge bereiten die Geodaten auf. Die Leaflet-Oberfläche fragt Informationen zu einer ausgewählten Position über die Open Data API ab. Fachliche Bezeichnungen bleiben mit den zugrunde liegenden Datensätzen verbunden.

## Mitmachen

Rückmeldungen können sich auf verständliche Erklärungen der Biotoptypen, die Kartenbedienung oder nachvollziehbare Datenabweichungen beziehen. Gib bei einem Issue im verlinkten Repository möglichst den Ort und die zugrunde liegende Quelle an.
