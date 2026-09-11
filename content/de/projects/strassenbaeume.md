---
title: "Straßenbäume"
description: "Das Flensburger Baumkataster zeigt erfasste Straßenbäume mit Standort, Kennung und botanischen Angaben auf einer offenen Karte."
locale: "de"
slug: "strassenbaeume"
translationKey: "strassenbaeume"
status: "seeking-contributors"
featured: false
categories: ["environment"]
technologies: ["GIS", "Open Data"]
links: {"website": "https://baumkataster.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-trees-map"}
source: "https://codefor.de/projekte/fl-open-trees-map/"

image: /images/projects/strassenbaeume.svg
imageAlt: "Eine verzweigte Baumkrone neben einer Straßenachse mit drei kartierten Standortpunkten."
---

## Worum geht es?

Das Projekt Straßenbäume erschließt das Baumkataster Flensburg über eine interaktive Karte. Du kannst einzelne Bäume auswählen und die erfassten Angaben zu ihrem Standort und ihrer botanischen Einordnung lesen. Stadtteile helfen dabei, den Datenbestand räumlich einzugrenzen.

Im Mittelpunkt stehen die Bäume aus dem veröffentlichten Kataster, nicht eine vollständige Erfassung aller Bäume im Stadtgebiet. Zu den grundlegenden Angaben gehören eine eindeutige Kennung, Koordinaten sowie Informationen zu Gattung, Art und Sorte. Weitere Felder werden nur angezeigt, soweit sie im aufbereiteten Bestand vorhanden sind.

## Warum gibt es das Projekt?

Bäume gehören zum Alltag eines Quartiers, bleiben in ihrer Vielfalt aber oft wenig bekannt. Das Projekt macht den kommunalen Bestand anschaulich und bietet einen Einstieg in Fragen zu Stadtgrün und klimatischen Veränderungen. Einwohner:innen können dadurch die Bäume in ihrer Umgebung bewusster wahrnehmen und sich mit den verfügbaren Daten beschäftigen.

Die Karte beantwortet solche Fachfragen nicht automatisch. Ideen wie die Bewertung klimatischer Eignung oder Baumpatenschaften sind nicht mit dem bloßen Vorhandensein eines Katastereintrags gleichzusetzen.

## Daten und Technik

Die Grundlage sind Daten des TBZ Flensburg aus dem Open-Data-Portal Schleswig-Holstein. Das Repository beschreibt die Bereitstellung dieses Bestands und enthält Werkzeuge zur Umwandlung, zum Import und zur räumlichen Zuordnung. Leaflet zeigt die Daten auf der Karte; PostgreSQL/PostGIS unterstützt ihre Verarbeitung.

Die ursprüngliche Quelle enthielt unter anderem keine Baumhöhe, keinen Kronendurchmesser und kein Pflanzjahr. Aus fehlenden Feldern lassen sich deshalb keine Aussagen über den tatsächlichen Zustand eines Baums ableiten.

## Mitmachen

Hilfreich sind Hinweise zu unklaren Artnamen, falschen Zuordnungen oder Problemen mit der Karte. Nenne im Repository möglichst die Baumkennung und den Standort. So lässt sich die Rückmeldung mit dem veröffentlichten Datensatz abgleichen.
