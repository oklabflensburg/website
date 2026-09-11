---
title: "Digitale Denkmalkarte"
description: "Kulturdenkmäler in Schleswig-Holstein räumlich entdecken und Beschreibungen, Objektangaben und Schutzumfang nachlesen."
locale: "de"
slug: "denkmalkarte"
translationKey: "denkmalkarte"
status: "seeking-contributors"
featured: false
categories: ["culture"]
technologies: ["Leaflet", "PostGIS", "Open Data"]
links: {"website": "https://denkmalkarte.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-monuments-map"}
source: "https://codefor.de/projekte/fl-open-monuments-map/"

image: /images/projects/denkmalkarte.svg
imageAlt: "Eine historische Doppelfassade mit Giebeln, Fenstern und einem gemeinsamen Torbogen."
---

## Worum geht es?

Die Digitale Denkmalkarte macht Kulturdenkmäler in Schleswig-Holstein über eine interaktive Karte auffindbar. Du kannst die Umgebung erkunden und eine Markierung auswählen, um Informationen zum jeweiligen Objekt zu öffnen. Beim Verschieben der Karte werden weitere Standorte für den sichtbaren Bereich geladen.

Zu den dargestellten Angaben gehören, soweit vorhanden, Adresse, Objektnummer, Beschreibung, Denkmalart und Schutzumfang. Damit bietet die Karte einen Einstieg für Menschen, die sich für Baukultur, Stadtgeschichte oder ein bestimmtes Gebäude interessieren. Die Darstellung ist ein ehrenamtliches Projekt des OK Lab Flensburg; die fachlichen Denkmaldaten stammen von der zuständigen Landesbehörde.

## Warum gibt es das Projekt?

Ausgangspunkt war die Frage, wie sich Informationen aus Denkmallisten mit den Gebäuden verbinden lassen, denen man im Alltag begegnet. In der frühen Projektphase wurden Listeneinträge um Koordinaten ergänzt. Heute verarbeitet der Quellcode auch Geometrien und ruft Objektdaten über die Open Data API ab.

Die Karte übersetzt damit ein fachliches Verzeichnis in einen räumlichen Zugang. Sie erleichtert das Entdecken und Nachlesen, ohne selbst über die Denkmaleigenschaft eines Gebäudes zu entscheiden.

## Daten und Technik

Quelle ist das Landesamt für Denkmalpflege Schleswig-Holstein, das seine Daten über das Open-Data-Portal des Landes veröffentlicht. Das Repository enthält Importwerkzeuge für Denkmalobjekte und Geometrien sowie eine Leaflet-Oberfläche. PostgreSQL/PostGIS dient der Verarbeitung der Geodaten.

Die ältere README-Überschrift nennt noch Flensburg; Projektbeschreibung und heutige Datenstruktur beziehen weitere Teile Schleswig-Holsteins ein. Für die Aktualität ist der jeweilige Datenstand maßgeblich.

## Mitmachen

Du kannst Hinweise zu falsch platzierten Markierungen, unklaren Beschreibungen oder Problemen beim Aufrufen eines Objekts im Repository dokumentieren. Nenne möglichst Objektnummer, Ort und Quelle, damit sich die Rückmeldung nachvollziehen lässt.
