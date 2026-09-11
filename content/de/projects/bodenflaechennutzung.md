---
title: "Bodenflächennutzung"
description: "Ein Kartenprototyp zur Bodenflächennutzung in Deutschland: kommunale Flächenanteile anhand der Statistik von 2019 erkunden."
locale: "de"
slug: "bodenflaechennutzung"
translationKey: "bodenflaechennutzung"
status: "seeking-contributors"
featured: false
categories: ["environment"]
technologies: ["GIS", "Open Data"]
links: {"website": "https://bodennutzung.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-surface-map"}
source: "https://codefor.de/projekte/fl-open-surface-map/"

image: /images/projects/bodenflaechennutzung.svg
imageAlt: "Vier klar getrennte Flächen zeigen Vegetation, Landwirtschaft, Wasser und Siedlung."
---

## Worum geht es?

Bodenflächennutzung zeigt statistische Angaben zur tatsächlichen Nutzung von Bodenflächen auf einer interaktiven Karte. Der Prototyp verwendet Gemeindedaten aus Deutschland und ist damit nicht auf Schleswig-Holstein beschränkt. Wenn du eine Gemeinde auswählst, erscheinen Kennzahlen etwa zu Wald-, Landwirtschafts-, Verkehrs- sowie Siedlungs- und Verkehrsflächen.

So kannst du nachvollziehen, wie unterschiedlich Gemeinden geprägt sind. Die Angaben beschreiben Flächenanteile einer Gemeinde; sie zeigen nicht die Nutzung jedes einzelnen Grundstücks. Die veröffentlichte Datengrundlage bezieht sich auf 2019.

## Warum gibt es das Projekt?

Eine umfangreiche Statistiktabelle erschließt sich räumlich nur schwer. Die Karte verbindet die Zahlen mit Gemeindegebieten und erleichtert es, regionale Unterschiede zu entdecken. Das bietet einen anschaulichen Einstieg für Menschen, die sich für Landschaft, Siedlungsstruktur oder kommunale Flächennutzung interessieren.

## Daten und Technik

Das Repository nennt die Flächenstatistik 2019 der Statistischen Ämter des Bundes und Verwaltungsgebiete des BKG in der Variante VG5000, ebenfalls mit Stand 2019. Die Daten werden über den amtlichen Gemeindeschlüssel zusammengeführt und als GeoJSON für die Darstellung aufbereitet. Leaflet zeigt die Flächen auf einer OpenStreetMap-Grundkarte.

Die Quellen beschreiben ausdrücklich einen ersten Prototyp. Weitere Filter sowie die Ergänzung kreisfreier Städte und Stadtstaaten sind dort Ausbauziele. Eine vollständige Abdeckung aller Gemeinden oder eine aktuelle Flächennutzungsplanung wird damit nicht zugesagt.

## Mitmachen

Wer den Prototyp weiterentwickeln möchte, kann bei Datenaufbereitung und verständlichen Kennzahlen ansetzen. Beschreibe im Repository, welche Gemeinde, welcher Datenstand oder welche Darstellung betroffen ist. Für neuere Daten sollte auch nachvollziehbar bleiben, wie sie mit den verwendeten Gebietsgrenzen zusammenpassen.
