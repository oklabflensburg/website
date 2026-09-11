---
title: "Kitafinder"
description: "Kitas in Flensburg auf einer Karte finden und vorhandene Angaben zu Kontakt, Betreuung und Öffnungszeiten nachlesen."
locale: "de"
slug: "kitafinder"
translationKey: "kitafinder"
status: "seeking-contributors"
featured: false
categories: ["education"]
technologies: ["HTML", "Open Data", "GIS"]
links: {"website": "https://kitakarte.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-kita-map"}
source: "https://codefor.de/projekte/fl-open-kita-map/"

image: /images/projects/kitafinder.svg
imageAlt: "Ein einfaches Haus mit Bausteinfenster und einem violetten Standortmarker."
---

## Worum geht es?

Der Kitafinder macht Kindertagesstätten in Flensburg auf einer gemeinsamen Karte sichtbar. Eltern und andere Interessierte können Einrichtungen in ihrer Umgebung erkunden und über eine Markierung die jeweiligen Informationen öffnen. So lassen sich Standorte mit dem eigenen Alltag und Wohnumfeld in Beziehung setzen.

Je nach Datenbestand enthält die Detailansicht Kontaktdaten, Träger, Öffnungszeiten und Angaben zu Betreuungsangeboten oder Altersgruppen. Die Karte hilft damit bei der ersten Orientierung und beim anschließenden Kontakt mit einer Einrichtung. Erfasste Platzangaben sind keine Anzeige aktuell freier Betreuungsplätze; eine Anmeldung wird hier nicht vermittelt.

## Warum gibt es das Projekt?

Anlass war die eigene Suche nach einer Kita. Eine städtische Liste und einzelne Kontaktseiten lieferten bereits Informationen, aber keinen leicht zugänglichen Überblick über alle Standorte. Das Projekt führt die Angaben räumlich zusammen, damit andere Eltern nicht dieselbe Recherche von vorn beginnen müssen.

## Daten und Technik

Das Repository nennt den Kita-Datensatz aus dem Open-Data-Portal Schleswig-Holstein und die ergänzende Liste der Stadt Flensburg als Quellen. Die Anwendung lädt aufbereitete Standortdaten im GeoJSON-Format und zeigt sie mit Leaflet an. Der aktuelle Quellcode verwendet basemap.de als Kartenhintergrund.

Welche Angaben sichtbar sind, hängt vom Eintrag ab. Für die eigene Planung lohnt es sich deshalb, wichtige Details bei der verlinkten Einrichtung zu überprüfen.

## Mitmachen

Du kannst veraltete Kontaktangaben oder unverständliche Einträge melden und die Bedienung auf verschiedenen Geräten testen. Beschreibe im Repository möglichst genau, welche Einrichtung betroffen ist, und verweise bei Korrekturen auf eine nachvollziehbare Quelle.
