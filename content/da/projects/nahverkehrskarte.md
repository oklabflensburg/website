---
title: "Nahverkehrskarte"
description: "En kortprototype for Flensborg viser stoppesteder og linjeforløb fra OpenStreetMap i sammenhæng med bydelene."
locale: "da"
slug: "nahverkehrskarte"
translationKey: "nahverkehrskarte"
status: "seeking-contributors"
featured: false
categories: ["mobility"]
technologies: ["OpenStreetMap", "GIS"]
links: {"website": "https://nahverkehr.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-transport-map"}
source: "https://codefor.de/projekte/fl-open-transport-map/"

image: /images/projects/nahverkehrskarte.svg
imageAlt: "En abstraheret bus ved siden af en rute med markerede stoppesteder."
---

## Hvad handler det om?

Nahverkehrskarte er en kortprototype for Flensborg. Den viser linjeforløb og stoppesteder sammen med bydelenes arealer. Dermed kan du undersøge, hvordan de registrerede trafiktilbud er fordelt i byen, og hvor stoppestederne ligger.

Fokus er et geografisk overblik over nettet. Applikationen indlæser forberedte geodata og tilbyder hverken verificerede afgangstider i realtid eller rejseplanlægning. Repositoriet betegner udgangspunktet som „Nahverkehr 2023“.

## Hvorfor findes projektet?

Projektet undersøger, hvad frit tilgængelige trafikdata kan gøre synligt. Et af de oprindelige spørgsmål var, hvordan stoppesteder fordeler sig i forhold til befolkningen i en bydel. Kortet giver en geografisk indgang til den slags overvejelser uden at hævde, at det leverer en færdig analyse af tilgængeligheden.

For borgere og mennesker med interesse for mobilitet kan oversigten gøre nettets struktur lettere at forstå og hjælpe med at formulere spørgsmål om betjeningen af enkelte områder.

## Data og teknik

Projektkilderne angiver OpenStreetMap som grundlag for trafikdataene. Den nuværende kode indlæser GeoJSON-filer for linjer, stoppesteder og bydele og viser dem med Leaflet på et OpenStreetMap-baggrundskort.

Oplysningernes anvendelighed afhænger af, hvornår de forberedte data blev indsamlet. En linje på kortet er derfor ikke en bekræftelse af dagens køretider eller aktuelle drift.

## Vær med

Du kan bidrage til opdatering og dokumentation af datagrundlaget eller en tydeligere kortvisning. Beskriv i det tilknyttede repository, hvilket stoppested, hvilken linje eller hvilket spørgsmål du vil undersøge.
