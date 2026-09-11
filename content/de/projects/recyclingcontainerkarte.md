---
title: "Recyclingcontainerkarte"
description: "Altglas- und Altkleidercontainer auf städtischen Flächen in Flensburg finden und Standorte nach Stadtteilen erkunden."
locale: "de"
slug: "recyclingcontainerkarte"
translationKey: "recyclingcontainerkarte"
status: "seeking-contributors"
featured: false
categories: ["environment"]
technologies: ["OpenStreetMap", "Open Data"]
links: {"website": "https://recycling.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-recycling-map"}
source: "https://codefor.de/projekte/fl-open-recycling-map/"

image: /images/projects/recyclingcontainerkarte.svg
imageAlt: "Ein Sammelcontainer mit Einwurfschlitz, umgeben von drei kreislaufförmigen Pfeilen."
---

## Worum geht es?

Die Recyclingcontainerkarte zeigt Standorte für Altglas und Altkleider in Flensburg. Du kannst die Karte erkunden, einen Stadtteil auswählen und Informationen zu einzelnen Sammelstellen öffnen. Die Einträge geben an, welche der erfassten Containerarten am jeweiligen Ort vorhanden sind.

Die Grundlage umfasst Standorte des Technischen Betriebszentrums Flensburg auf städtischen Flächen. Die Karte ist deshalb kein vollständiges Verzeichnis sämtlicher privater Sammelstellen oder aller Entsorgungsangebote. Sie hilft bei der konkreten Frage, wo die erfassten Container im eigenen Umfeld stehen.

## Warum gibt es das Projekt?

Gerade nach einem Umzug ist oft unklar, wo Altglas und nicht mehr benötigte Kleidung abgegeben werden können. Bereits vorhandene Standortinformationen sollten leichter auffindbar und zugleich für andere Anwendungen weiterverwendbar werden. Das Projekt verbindet diese Alltagssuche mit der Aufbereitung kommunaler Daten.

## Daten und Technik

Die Daten stammen aus den Standortkarten des TBZ Flensburg für Altglas- und Alttextiliencontainer. Werkzeuge im Repository extrahieren die Informationen und wandeln sie in maschinenlesbare Geodaten um. Die Anwendung lädt GeoJSON und zeigt die Standorte mit Leaflet auf einer OpenStreetMap-Grundkarte.

Stadtteilflächen unterstützen die räumliche Auswahl. Zusätzliche Anbieter und Standortfotos werden in den Quellen als mögliche Erweiterungen beschrieben; sie sind keine Voraussetzung für die hier dargestellte Grundfunktion und werden nicht als vollständig vorhanden zugesagt.

## Mitmachen

Du kannst prüfen, ob ein bekannter Standort richtig eingeordnet ist und die Containerarten verständlich angezeigt werden. Dokumentiere Abweichungen mit Ort und Quelle im verlinkten Repository. Auch Vorschläge zur Suche und zur Pflege der Datengrundlage sind hilfreich.
