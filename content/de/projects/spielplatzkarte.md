---
title: "Spielplatzkarte"
description: "Spielplätze in Flensburg auf einer gemeinsamen Karte entdecken und vorhandene Angaben zu Standort und Ausstattung lesen."
locale: "de"
slug: "spielplatzkarte"
translationKey: "spielplatzkarte"
status: "seeking-contributors"
featured: false
categories: ["leisure"]
technologies: ["Vue", "OpenStreetMap"]
links: {"website": "https://spielplatzkarte.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-playgrounds-map"}
source: "https://codefor.de/projekte/fl-open-playgrounds-map/"

image: /images/projects/spielplatzkarte.svg
imageAlt: "Eine Schaukel mit zwei Trägern, hängendem Sitz und einer klaren Bodenlinie."
---

## Worum geht es?

Die Spielplatzkarte macht Flensburger Spielplätze über eine interaktive Karte auffindbar. Wer mit Kindern unterwegs ist oder das eigene Wohnumfeld erkunden möchte, kann Standorte auswählen und die dazu vorhandenen Informationen lesen. Die Detailanzeige verbindet den Namen eines Platzes mit Adresse und hinterlegten Angaben zur Spielfläche.

Dadurch lassen sich auch Spielplätze entdecken, die man noch nicht kennt. Die Karte bildet den veröffentlichten Datenbestand ab; wie ausführlich Ausstattung und weitere Merkmale beschrieben sind, hängt vom jeweiligen Eintrag ab.

## Warum gibt es das Projekt?

Die Stadt stellte bereits eine Spielplatzliste als PDF bereit, und das TBZ Flensburg hatte zusätzliche Informationen in einer eigenen Karte. Das Projekt entstand aus dem Wunsch, diese Angaben leichter auffindbar und ohne aufwendige Suche nutzbar zu machen.

Die ehrenamtliche Arbeit bestand deshalb auch darin, vorhandene Daten aus verschiedenen Darstellungen zu erschließen. Aus einzelnen Listen und Karteninformationen wurde eine Grundlage, die sich im Browser ansehen und für weitere Anwendungen verarbeiten lässt.

## Daten und Technik

Quellen sind die Spielplatzliste der Stadt Flensburg und die Spielflächendaten des TBZ. Python-Werkzeuge im Repository bereiten die Angaben als GeoJSON auf. Die Kartendarstellung nutzt Leaflet und einen OpenStreetMap-Hintergrund. Die Ortsdaten der Spielplätze und die Hintergrundkarte haben damit unterschiedliche Quellen.

## Mitmachen

Kennst du einen der Plätze, kannst du prüfen, ob Standort, Bezeichnung und Beschreibung verständlich zusammenpassen. Melde nachvollziehbare Abweichungen im verlinkten Repository und nenne möglichst eine Quelle. Auch Rückmeldungen dazu, wie gut sich die Karte unterwegs bedienen lässt, helfen bei der Weiterentwicklung.
