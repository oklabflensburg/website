---
title: "Kitafinder"
description: "Find daginstitutioner i Flensborg på et kort, og læs tilgængelige oplysninger om kontakt, pasningstilbud og åbningstider."
locale: "da"
slug: "kitafinder"
translationKey: "kitafinder"
status: "seeking-contributors"
featured: false
categories: ["education"]
technologies: ["HTML", "Open Data", "GIS"]
links: {"website": "https://kitakarte.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-kita-map"}
source: "https://codefor.de/projekte/fl-open-kita-map/"

image: /images/projects/kitafinder.svg
imageAlt: "Et enkelt hus med et byggeklodsvindue og en violet stedmarkør."
---

## Hvad handler det om?

Kitafinder samler daginstitutioner i Flensborg på ét kort. Forældre og andre interesserede kan udforske institutioner i nærheden og åbne oplysningerne ved at vælge en markør. Det gør det lettere at se placeringerne i forhold til hjemmet og hverdagen.

Afhængigt af datagrundlaget viser detaljesiden kontaktoplysninger, driftsorganisation, åbningstider og oplysninger om pasningstilbud eller aldersgrupper. Kortet hjælper med den første orientering og den efterfølgende kontakt til en institution. Registrerede pladstal viser ikke aktuelt ledige pladser, og applikationen formidler ikke tilmelding.

## Hvorfor findes projektet?

Projektet udsprang af en konkret søgning efter en daginstitution. Kommunens liste og enkelte kontaktsider gav allerede oplysninger, men ikke et let tilgængeligt overblik over placeringerne. Kortet samler oplysningerne geografisk, så andre forældre ikke behøver at begynde den samme research forfra.

## Data og teknik

Repositoriet angiver institutionsdatasættet fra Slesvig-Holstens åbne dataportal og Flensborg Kommunes supplerende liste som kilder. Applikationen indlæser bearbejdede positionsdata i GeoJSON-format og viser dem med Leaflet. Den nuværende kode bruger basemap.de som baggrundskort.

De viste oplysninger afhænger af det enkelte opslag. Når du planlægger pasning, er det derfor relevant at kontrollere vigtige detaljer hos den tilknyttede institution.

## Vær med

Du kan melde forældede kontaktoplysninger eller uklare opslag og afprøve betjeningen på forskellige enheder. Beskriv præcist, hvilken institution det drejer sig om, og henvis til en dokumenterbar kilde ved rettelser i repositoriet.
