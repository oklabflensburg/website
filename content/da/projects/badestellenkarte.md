---
title: "Badestellenkarte Schleswig-Holstein"
description: "Find badesteder i Slesvig-Holsten på kortet, og undersøg oplysninger om faciliteter, sæson og badevandsdata."
locale: "da"
slug: "badestellenkarte"
translationKey: "badestellenkarte"
status: "development"
featured: false
categories: ["leisure"]
technologies: ["Python", "OpenStreetMap", "Open Data"]
links: {"website": "https://badestellenkarte.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-bath-map"}
source: "https://codefor.de/projekte/fl-open-bath-map/"
image: /images/projects/badestellenkarte.svg
imageAlt: "En stedmarkør over to vandbølger ved siden af en stiliseret kystlinje."
---

## Hvad handler det om?

Badestellenkarte Schleswig-Holstein samler oplysninger om badesteder og andre steder ved vandet. Du kan udforske et kortudsnit, vælge en markør og læse de tilgængelige oplysninger om stedet. Når du flytter kortet, indlæses placeringerne i det synlige område.

Tekstsøgning og filtre for type, kategori og faciliteter hjælper dig med at afgrænse resultaterne. Applikationen understøtter også søgning i nærheden via browserens position. Du kan dermed slå et kendt sted op eller undersøge, hvilke badesteder der findes i et område. De enkelte opslag har egne detaljesider, som kan åbnes direkte.

## Hvorfor findes projektet?

Oplysninger om badevand ligger fordelt på flere datasæt. Når man planlægger en tur, er flere spørgsmål ofte relevante samtidig: Hvor ligger badestedet, hvilke faciliteter er registreret, og hvilke oplysninger findes om vandet? Projektet samler dem geografisk, så man ikke selv behøver at bearbejde data.

De supplerende turiststeder behandles som særskilte kortobjekter. Et sted ved vandet er derfor ikke automatisk et udpeget badested. Den forskel er vigtig, når man læser søgeresultaterne.

## Data og teknik

Grundlaget er åbne data fra delstaten Slesvig-Holsten om badestedernes stamoplysninger, klassifikation, faciliteter, sæson og målinger. Hertil kommer steder ved vandet fra delstatens turistdatabase. Repositoriets kildekonfiguration beskriver, hvordan oplysningerne findes og hentes.

En FastAPI-backend samler data i et fælles format til kortforespørgsler. Brugerfladen bygger på Nuxt, Vue og Leaflet. PostgreSQL med PostGIS kan desuden bruges til lagring og geografisk søgning, men er ifølge dokumentationen valgfrit. Oplysningerne om det enkelte sted afhænger af, hvad kilderne indeholder.

## Vær med

Kender du et af badestederne, kan du kontrollere præsentationen og kildeangivelserne. En fejlrapport bliver lettere at bruge, når den angiver det konkrete opslag og en dokumenterbar kilde. Afprøvning af søgning, filtre og mobil betjening er også nyttige bidrag via det tilknyttede repository.
