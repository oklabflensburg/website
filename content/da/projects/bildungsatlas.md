---
title: "Bildungsatlas"
description: "Udforsk skoler i Slesvig-Holsten efter beliggenhed og skoletype, find kontaktoplysninger, og åbn den enkelte skole direkte."
locale: "da"
slug: "bildungsatlas"
translationKey: "bildungsatlas"
status: "seeking-contributors"
featured: false
categories: ["education"]
technologies: ["Vue", "Python", "PostGIS"]
links: {"website": "https://schulkarte.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-school-map"}
source: "https://codefor.de/projekte/fl-open-school-map/"

image: /images/projects/bildungsatlas.svg
imageAlt: "En åben bog med foldede kortflader og et blåt punkt for et læringssted."
---

## Hvad handler det om?

Bildungsatlas viser skolers placering på et interaktivt kort. Den oprindelige idé om en skoleoversigt for Flensborg er blevet til en applikation for Slesvig-Holsten. Forældre, interesserede og kommuner kan se, hvor skolerne ligger, og finde tilgængelige kontaktoplysninger og links til mere information.

Kortet kan filtreres efter skoletype. Markører åbner en detaljevisning, og de enkelte skoler har egne adresser, som kan åbnes direkte. En positionsfunktion hjælper med at finde skoler i nærheden. Det giver eksempelvis et overblik over skolernes placering i forhold til hjemmet, men indebærer ikke beregning af skolevejen.

## Hvorfor findes projektet?

Projektet udsprang af en søgning efter en grundskole i Flensborg. Kontaktoplysningerne fandtes allerede, men var besværlige at samle til et geografisk overblik. Bildungsatlas forbinder oplysningerne med et kort og gør det lettere at danne sig et første indtryk af mulige skoler.

## Data og teknik

Projektbeskrivelsen henviser til fortegnelserne over almendannende og erhvervsrettede skoler i Slesvig-Holsten samt oplysninger fra de tilknyttede institutioner. Det nuværende repository dokumenterer brug af skolegrænsefladen i Open Data API og import til PostgreSQL/PostGIS. Skolenumre kan ved import forbindes med poster i Wikidata.

Kortapplikationen bygger på Nuxt og Leaflet. En tidligere beskrevet analyse af lege- og skolegårdsarealer var en idé til videreudvikling og er ikke blandt de funktioner, der loves her.

## Vær med

Meld gerne forkerte kontaktoplysninger, uklare skoletyper eller problemer med at åbne en skole. Angiv institutionen og helst dens officielle informationsside i det tilknyttede repository. Bedre betjening og dokumentation gør også applikationen lettere at bruge.
