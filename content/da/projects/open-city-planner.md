---
title: "Open City Planner"
description: "Et WebGIS, du selv kan drive: udforsk, sammenlign og analysér byområder i Flensborg med OpenStreetMap og kommunale data."
locale: "da"
slug: "open-city-planner"
translationKey: "open-city-planner"
status: "unknown"
featured: true
featuredOrder: 0
categories: ["urbanDevelopment"]
technologies: ["PostGIS", "FastAPI", "Nuxt", "MapLibre", "OpenStreetMap"]
links: {"website": "https://stadtplaner.oklabflensburg.de/", "github": "https://github.com/oklabflensburg/open-city-planner"}
source: "https://github.com/oklabflensburg/open-city-planner"
image: /images/projects/open-city-planner.svg
imageAlt: "Stablede kortlag med vejlinjer, polygoner og et centralt datapunkt."
---

## Hvad handler det om?

Open City Planner er en åben WebGIS-platform til byplanlægning og geografiske undersøgelser. I referenceudgaven for Flensborg kan du undersøge bydele, statistiske områder og arealer, du selv tegner, direkte i browseren. Kortobjekter fra OpenStreetMap bliver samlet med tilgængelige offentlige data om byen.

Du kan søge efter adresser, steder og områder, vælge et areal og se tilknyttede steder og geografiske nøgletal. Når du sammenligner områder, bruger programmet et fælles sæt nøgletal. Det gør forskelle lettere at forstå uden at skifte mellem separate kort og tabeller. Du kan tegne polygoner og gemme og administrere dem med en brugerkonto. Offentlige oplysninger kan også udforskes uden at logge ind.

## Hvorfor findes projektet?

Mange spørgsmål om byen handler om geografi, men oplysningerne ligger ofte spredt mellem forskellige kilder. Open City Planner skal gøre sammenhængene forståelige for mennesker, der ikke arbejder med professionel GIS-software til daglig. Det kan bruges både til at lære sit kvarter bedre at kende og til samtaler om byudvikling.

Softwaren kan drives på egen server. Flensborg er referencebyen, men løsningen er ikke teknisk begrænset til den. Brug i andre byer kræver dog tilpasning af datasæt, områdegrænser og tilslutninger til eksterne tjenester. Projektet lover endnu ikke en installation, der straks er klar til enhver kommune.

## Data og teknik

OpenStreetMap leverer geografiske objekter og grænser. Flensborgs kommunale „Zahlenspiegel“ er desuden dokumenteret som kilde til befolknings- og husstandsstatistik. At statistikken knyttes til bydele, betyder ikke, at OSM-grænserne er geometrisk identiske med de officielle statistikområder.

Brugerfladen bygger på Nuxt og Vue, mens MapLibre viser kortet. FastAPI og PostgreSQL med PostGIS håndterer dataadgang og geografisk databehandling. Dokumentationen beskriver dataimport og drift af en egen installation.

## Vær med

Du kan bidrage til kortets betjening, tilslutning af datakilder, geografiske analyser og letforståelig dokumentation. Hvis du vil bruge platformen i en anden by, kan du beskrive formålet og de tilgængelige data i det tilknyttede repository. Her finder du også vejledning om udvikling og samarbejde.
