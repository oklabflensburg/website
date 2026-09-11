---
title: "Flurstücksauskunft Schleswig-Holstein"
description: "Udforsk matrikler og administrative grænser i Slesvig-Holsten på et uofficielt kort uden ejeroplysninger."
locale: "da"
slug: "flurstuecksauskunft"
translationKey: "flurstuecksauskunft"
status: "development"
featured: false
categories: ["administration"]
technologies: ["PostGIS", "Leaflet", "Open Data"]
links: {"website": "https://flurstuecksauskunft.oklabflensburg.de/", "github": "https://github.com/oklabflensburg/open-parcel-map"}
source: "https://codefor.de/projekte/fl-open-parcel-map/"
image: /images/projects/flurstuecksauskunft.svg
imageAlt: "Et net af matrikler i forskellige størrelser med ét område fremhævet i blåt."
---

## Hvad handler det om?

Flurstücksauskunft Schleswig-Holstein giver kortadgang til matrikler, matrikeldistrikter og administrative grænser. Den viser, hvordan jordparceller og større geografiske enheder hænger sammen. Ved at vælge en position kan du hente de tilknyttede matrikeloplysninger.

Projektet er udtrykkeligt en uofficiel informationstjeneste uden ejeroplysninger. Det kan bruges til indledende orientering af interesserede og borgerinitiativer, som undersøger arealer i deres nærområde. Den offentlige visning oplyser ikke, hvem der ejer en ejendom.

## Hvorfor findes projektet?

Idéen opstod efter samtaler med borgerinitiativer. Oplysninger om kreds- og kommunegrænser, matrikeldistrikter og matrikler skulle være lettere at tilgå digitalt. Et fælles kort gør det nemmere at forstå et steds geografiske sammenhæng uden først at hente og bearbejde omfattende geodata.

## Data og teknik

Grundlaget er ALKIS Schleswig-Holstein uden ejeroplysninger fra Landesamt für Vermessung und Geoinformation. Repositoriet henviser siden marts 2025 til delstatens relevante Atom-feed til download og beskriver den efterfølgende behandling i PostGIS.

Den nuværende kortbrugerflade anvender Leaflet. Den kombinerer kortlag med en positionsbaseret forespørgsel til Open Data API. OpenStreetMap leverer en del af baggrundskortet, mens matrikeloplysningerne kommer fra ALKIS. Kilderne har altså forskellige roller.

Dataenes registreringstidspunkt bør indgå i brugen. Kortet letter adgangen til de offentliggjorte oplysninger, men erstatter ikke officiel matrikelinformation.

## Vær med

Konkrete tilbagemeldinger om kortvisning, importproblemer eller svært forståelige matrikeloplysninger er nyttige. I det tilknyttede repository kan du angive det berørte sted og datakilden samt foreslå forbedringer.
