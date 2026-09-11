---
title: "Unfallkarte"
description: "Verkehrsunfälle mit Personenschaden in Flensburg von 2016 bis 2024 auf einer Karte nach Jahren, Stadtteilen und Unfallmerkmalen untersuchen."
locale: "de"
slug: "unfallkarte"
translationKey: "unfallkarte"
status: "seeking-contributors"
featured: false
categories: ["mobility"]
technologies: ["Vue", "PostGIS", "Open Data"]
links: {"website": "https://unfallkarte.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-accident-map"}
source: "https://codefor.de/projekte/fl-open-accident-map/"

image: /images/projects/unfallkarte.svg
imageAlt: "Eine Straßenkreuzung mit unterschiedlich großen Analysepunkten für räumliche Unfalldaten."
---

## Worum geht es?

Die Unfallkarte zeigt erfasste Verkehrsunfälle mit Personenschaden in Flensburg. Du kannst einzelne Unfallpunkte auswählen und ihre hinterlegten Merkmale betrachten. Filter für Jahre, Stadtteile, Unfalltyp und Unfallhergang ermöglichen es, den sichtbaren Bestand nach einer konkreten Fragestellung einzugrenzen.

Die aktuelle Oberfläche bietet die Jahrgänge 2016 bis 2024 an. Damit lässt sich untersuchen, an welchen Straßen oder Kreuzungen sich die dargestellten Ereignisse häufen und wie sich die Auswahl über mehrere Jahre verändert. Die Karte zeigt dokumentierte Unfallereignisse, keine Echtzeit-Verkehrslage.

## Warum gibt es das Projekt?

Für Diskussionen über Verkehrssicherheit ist es hilfreich, Ereignisse räumlich und nach Merkmalen betrachten zu können. Eine Karte erleichtert den Zugang zu den statistischen Datensätzen und gibt kommunalen Entscheidungsträger:innen sowie interessierten Einwohner:innen eine gemeinsame Grundlage für weitere Fragen.

Sichtbare Häufungen allein erklären allerdings weder Unfallursachen noch das individuelle Risiko eines Weges. Die Darstellung hilft beim Erkunden des Datenbestands; eine fachliche Bewertung braucht zusätzliche Einordnung.

## Daten und Technik

Das aktuelle Repository nennt die Statistischen Ämter des Bundes und der Länder sowie das BKG als Quellen und Bezugspunkte. Lokale Metadaten ergänzen den Flensburger Bestand. Erfasst sind Unfälle mit Personenschaden, nicht sämtliche Sachschäden oder Beinaheunfälle.

Die Anwendung verwendet Nuxt und Leaflet. Der aktuelle Kartenbaustein lädt Flensburger Unfallinformationen über die Open Data API. PostgreSQL/PostGIS, SQL-Dateien und Python-Werkzeuge unterstützen die Datenaufbereitung; das Repository enthält zusätzlich Beispieldaten im GeoJSON-Format.

## Mitmachen

Du kannst die Filter und Detailangaben prüfen oder verständlichere Erklärungen der Unfallmerkmale vorschlagen. Ein guter Fehlerbericht im Repository nennt den gewählten Jahrgang, die gesetzten Filter und den betroffenen Ort. So bleibt eine Rückmeldung reproduzierbar.
