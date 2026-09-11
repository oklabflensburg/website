---
title: "Recyclingcontainerkarte"
description: "Find glas- og tøjcontainere på kommunale arealer i Flensborg, og udforsk indsamlingssteder efter bydel."
locale: "da"
slug: "recyclingcontainerkarte"
translationKey: "recyclingcontainerkarte"
status: "seeking-contributors"
featured: false
categories: ["environment"]
technologies: ["OpenStreetMap", "Open Data"]
links: {"website": "https://recycling.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-recycling-map"}
source: "https://codefor.de/projekte/fl-open-recycling-map/"

image: /images/projects/recyclingcontainerkarte.svg
imageAlt: "En genbrugscontainer med indkast omgivet af tre cirkulære pile."
---

## Hvad handler det om?

Recyclingcontainerkarte viser placeringer af glas- og tøjcontainere i Flensborg. Du kan udforske kortet, vælge en bydel og åbne oplysninger om de enkelte indsamlingssteder. Opslagene viser, hvilke af de registrerede containertyper der findes på stedet.

Grundlaget omfatter placeringer fra Technisches Betriebszentrum Flensburg på kommunale arealer. Kortet er derfor ikke en fuldstændig fortegnelse over private indsamlingssteder eller alle affaldstilbud. Det hjælper med det konkrete spørgsmål om, hvor de registrerede containere findes i nærområdet.

## Hvorfor findes projektet?

Især efter en flytning kan det være uklart, hvor man kan aflevere glas og tøj, man ikke længere bruger. Eksisterende oplysninger om placeringer skulle være lettere at finde og samtidig kunne genbruges i andre applikationer. Projektet forbinder denne hverdagsopgave med bearbejdning af kommunale data.

## Data og teknik

Data kommer fra TBZ Flensburgs kort over glas- og tekstilcontainere. Værktøjer i repositoriet udtrækker oplysningerne og omdanner dem til maskinlæsbare geodata. Applikationen indlæser GeoJSON og viser placeringerne med Leaflet på et OpenStreetMap-baggrundskort.

Bydelsarealer understøtter den geografiske udvælgelse. Flere udbydere og fotos af stederne omtales i kilderne som mulige udvidelser. De er ikke nødvendige for den beskrevne grundfunktion og loves ikke som fuldt tilgængelige.

## Vær med

Du kan kontrollere, om et kendt sted er korrekt placeret, og om containertyperne vises forståeligt. Dokumentér afvigelser med sted og kilde i det tilknyttede repository. Forslag til søgning og vedligeholdelse af data er også nyttige.
