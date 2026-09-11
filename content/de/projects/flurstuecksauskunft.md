---
title: "Flurstücksauskunft Schleswig-Holstein"
description: "Flurstücke und Verwaltungsgrenzen in Schleswig-Holstein auf einer nicht amtlichen Karte erkunden – ohne Eigentümerangaben."
locale: "de"
slug: "flurstuecksauskunft"
translationKey: "flurstuecksauskunft"
status: "development"
featured: false
categories: ["administration"]
technologies: ["PostGIS", "Leaflet", "Open Data"]
links: {"website": "https://flurstuecksauskunft.oklabflensburg.de/", "github": "https://github.com/oklabflensburg/open-parcel-map"}
source: "https://codefor.de/projekte/fl-open-parcel-map/"
image: /images/projects/flurstuecksauskunft.svg
imageAlt: "Ein Netz unterschiedlich großer Grundstücksparzellen mit einer blau hervorgehobenen Fläche."
---

## Worum geht es?

Die Flurstücksauskunft Schleswig-Holstein bietet einen Kartenzugang zu Flurstücken, Gemarkungen und Verwaltungsgrenzen. Sie macht sichtbar, wie Grundstücksparzellen und übergeordnete Gebietseinheiten räumlich zusammenhängen. Über die Auswahl einer Position lassen sich zugehörige Flurstücksinformationen abfragen.

Das Projekt ist ausdrücklich eine nicht amtliche Auskunft ohne Eigentümerangaben. Es eignet sich zur ersten Orientierung für Interessierte und Bürgerinitiativen, die sich mit Flächen in ihrer Umgebung beschäftigen. Die öffentliche Darstellung enthält keine Auskunft darüber, wem ein Grundstück gehört.

## Warum gibt es das Projekt?

Die Idee entstand nach Gesprächen mit Bürgerinitiativen. Informationen über Kreis- und Gemeindegrenzen, Gemarkungen und Flurstücke sollten einfacher digital zugänglich sein. Ein gemeinsamer Kartenzugang erleichtert es, einen Ort räumlich einzuordnen, ohne zunächst umfangreiche Geodaten herunterladen und selbst aufbereiten zu müssen.

## Daten und Technik

Grundlage ist ALKIS Schleswig-Holstein ohne Eigentümerangaben, bereitgestellt vom Landesamt für Vermessung und Geoinformation. Das Repository verweist für den Download seit März 2025 auf den entsprechenden Atom-Feed des Landes und dokumentiert die anschließende Verarbeitung in PostGIS.

Die aktuelle Kartenoberfläche verwendet Leaflet. Sie kombiniert Kartenebenen mit einer punktbezogenen Abfrage der Open Data API. OpenStreetMap bildet einen Teil des Kartenhintergrunds; die Flurstücksinformationen stammen aus ALKIS. Diese Quellen erfüllen also unterschiedliche Aufgaben.

Der Datenstand sollte bei der Nutzung berücksichtigt werden. Die Karte erleichtert den Zugang zum veröffentlichten Bestand, ersetzt aber keine amtliche Auskunft.

## Mitmachen

Hilfreich sind konkrete Hinweise zur Kartendarstellung, zu Importproblemen oder zu schwer verständlichen Flurstücksangaben. Im verlinkten Repository kannst du den betroffenen Ort und die verwendete Datenquelle benennen und Verbesserungen vorschlagen.
