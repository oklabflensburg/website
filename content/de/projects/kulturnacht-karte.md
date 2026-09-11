---
title: "Kulturnacht Flensburg"
description: "Die abgeschlossene Karte zur Flensburger Kulturnacht am 14. September 2024 dokumentiert Kulturorte und ihr damaliges Programm."
locale: "de"
slug: "kulturnacht-karte"
translationKey: "kulturnacht-karte"
status: "completed"
featured: false
categories: ["culture"]
technologies: ["JavaScript", "OpenStreetMap"]
links: {"website": "https://knf.grain.one", "github": "https://github.com/oklabflensburg/open-cultural-map"}
source: "https://codefor.de/projekte/fl-open-cultural-map/"
image: /images/projects/kulturnacht-karte.svg
imageAlt: "Eine Mondsichel über einer gefalteten Karte mit drei verbundenen Veranstaltungsorten."
---

## Worum ging es?

Für die Flensburger Kulturnacht am 14. September 2024 hat das OK Lab Flensburg eine eigene Veranstaltungskarte entwickelt. Sie verband die teilnehmenden Kulturorte mit den Informationen zu ihren Angeboten. Besuchende konnten sehen, wo sich die Orte im Stadtgebiet befinden, und einzelne Stationen näher erkunden.

Die Detailansichten verknüpften Veranstaltungsort und Adresse mit Programmbeschreibungen, Öffnungs- beziehungsweise Veranstaltungszeiten und weiterführenden Links, soweit diese erfasst waren. Das Programm umfasste unterschiedliche Formen kultureller Begegnung, darunter Theater, Konzerte, Einblicke hinter die Kulissen und Mitmachangebote.

## Warum entstand die Karte?

Eine Kulturnacht verteilt sich auf viele Orte. Die Karte ergänzte das Programm um eine räumliche Übersicht und machte auch Einrichtungen sichtbar, die Besuchende noch nicht kannten. Sie unterstützte damit die Orientierung zwischen den teilnehmenden Orten und zeigte die Vielfalt des Kulturlebens in Flensburg.

## Daten und Technik

Der Quellcode lädt ausdrücklich den Datensatz zur Kulturnacht 2024. Im Repository liegen die Veranstaltungsdaten als CSV und GeoJSON sowie ein Python-Werkzeug zur Umwandlung. Die Kartenoberfläche verwendet JavaScript und Leaflet mit einem OpenStreetMap-Hintergrund.

Das Projekt ist abgeschlossen. Die erhaltene Karte und der Quellcode dokumentieren diesen Veranstaltungsjahrgang; sie sind kein aktueller Kalender und keine Ankündigung einer neuen Kulturnacht. Für die Nachnutzung lässt sich im Repository nachvollziehen, wie Orts- und Programmdaten für eine Veranstaltung zusammengeführt wurden.
