---
title: "Notfallkarte Schleswig-Holstein"
description: "Find politistationers placering og kontaktoplysninger i Slesvig-Holsten gennem et interaktivt kort."
locale: "da"
slug: "notfallkarte"
translationKey: "notfallkarte"
status: "development"
featured: false
categories: ["safety"]
technologies: ["OpenStreetMap", "Open Data"]
links: {"website": "https://notfallkarte.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-emergency-map"}
source: "https://codefor.de/projekte/fl-open-emergency-map/"
image: /images/projects/notfallkarte.svg
imageAlt: "Et beskyttelsesskjold med en indlejret stedmarkør for politistationer."
---

## Hvad handler det om?

Notfallkarte Schleswig-Holstein hjælper med at finde politistationer. Kortets konkrete indhold er placeringer og kontaktoplysninger for politiets tjenestesteder i delstaten. Markører åbner detaljer om den enkelte station, og når kortet flyttes, indlæses flere poster i det synlige område.

Det brede projektnavn betyder ikke, at kortet omfatter alle former for nødhjælp. Det dokumenterede indhold er koncentreret om politistationer. Kortet hjælper med orientering og adgang til offentliggjorte kontaktoplysninger; det er ikke et system til alarmopkald eller indsatsledelse.

## Hvorfor findes projektet?

Idéen opstod under coronapandemien. Det frivillige hold ville gøre det lettere at finde politistationer i nærheden. Interesserede kan udforske stederne direkte på kortet i stedet for selv at gennemgå et administrativt datasæt.

Projektet viser dermed en konkret anvendelse af offentlige myndighedsdata: oplysninger om placeringer bliver tilgængelige i en geografisk sammenhæng, der er nyttig i hverdagen.

## Data og teknik

Grundlaget er datasættet „Polizeidienststellen in Schleswig-Holstein“ fra delstatens åbne dataportal. Repositoriet indeholder værktøjer til import af posterne og en Leaflet-brugerflade. Den henter stationer gennem Open Data API, eksempelvis for et kortudsnit eller i nærheden af en position.

OpenStreetMap leverer baggrundskortet. Oplysningerne om stationerne kommer fra det nævnte delstatsdatasæt. Dets registreringstidspunkt er afgørende for, hvor aktuelle de enkelte oplysninger er.

## Vær med

Forkert placerede stationer, forældede kontaktoplysninger og problemer med detaljevisningen kan dokumenteres i det tilknyttede repository. Angiv den konkrete station og en kontrollerbar kilde, så rettelsen kan efterprøves.
