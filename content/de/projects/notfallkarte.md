---
title: "Notfallkarte Schleswig-Holstein"
description: "Standorte und Kontaktdaten von Polizeidienststellen in Schleswig-Holstein über eine interaktive Karte erschließen."
locale: "de"
slug: "notfallkarte"
translationKey: "notfallkarte"
status: "development"
featured: false
categories: ["safety"]
technologies: ["OpenStreetMap", "Open Data"]
links: {"website": "https://notfallkarte.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-emergency-map"}
source: "https://codefor.de/projekte/fl-open-emergency-map/"
image: /images/projects/notfallkarte.svg
imageAlt: "Ein Schutzschild mit einem eingebetteten Standortmarker für Polizeidienststellen."
---

## Worum geht es?

Die Notfallkarte Schleswig-Holstein hilft beim Auffinden von Polizeidienststellen. Ihr konkreter Inhalt sind die Standorte und Kontaktdaten der Dienststellen im Land. Über Kartenmarkierungen lassen sich die jeweiligen Detailinformationen öffnen; beim Verschieben werden weitere Einträge für den sichtbaren Bereich geladen.

Trotz des allgemeinen Projektnamens ist damit keine vollständige Übersicht aller Notfallangebote gemeint. Der belegte Umfang konzentriert sich auf Polizeidienststellen. Die Karte unterstützt die Orientierung und den Zugang zu veröffentlichten Kontaktinformationen; sie ist kein Einsatz- oder Notrufsystem.

## Warum gibt es das Projekt?

Die Idee entstand während der Corona-Pandemie. Das ehrenamtliche Team wollte die Suche nach Polizeidienststellen in der Umgebung vereinfachen. Statt einen Verwaltungsdatensatz selbst durchsuchen zu müssen, können Interessierte die Orte direkt auf einer Karte erkunden.

Das Projekt zeigt damit einen konkreten Nutzen öffentlich bereitgestellter Verwaltungsdaten: Standortinformationen werden in einem alltagsnahen räumlichen Zusammenhang zugänglich.

## Daten und Technik

Die Grundlage bildet der Datensatz „Polizeidienststellen in Schleswig-Holstein“ aus dem Open-Data-Portal des Landes. Im Repository finden sich Werkzeuge zum Import der Datensätze und eine Leaflet-Oberfläche. Diese ruft Dienststellen über die Open Data API ab, beispielsweise für einen Kartenausschnitt oder im Umkreis einer Position.

OpenStreetMap liefert den Kartenhintergrund. Die Dienststelleninformationen stammen aus dem genannten Landesdatensatz. Für die Aktualität einzelner Angaben ist dessen Datenstand entscheidend.

## Mitmachen

Hinweise zu falsch zugeordneten Standorten, veralteten Kontaktdaten oder Problemen mit der Detailansicht lassen sich im verlinkten Repository dokumentieren. Eine konkrete Dienststelle und eine überprüfbare Quelle helfen dabei, eine Korrektur nachzuvollziehen.
