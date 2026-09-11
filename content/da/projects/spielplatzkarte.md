---
title: "Spielplatzkarte"
description: "Find legepladser i Flensborg på ét kort, og læs tilgængelige oplysninger om placering og faciliteter."
locale: "da"
slug: "legepladskort"
translationKey: "spielplatzkarte"
aliases: ["spielplatzkarte"]
status: "seeking-contributors"
featured: false
categories: ["leisure"]
technologies: ["Vue", "OpenStreetMap"]
links: {"website": "https://spielplatzkarte.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-playgrounds-map"}
source: "https://codefor.de/projekte/fl-open-playgrounds-map/"

image: /images/projects/spielplatzkarte.svg
imageAlt: "En gynge med to stativer, et hængende sæde og en tydelig jordlinje."
---

## Hvad handler det om?

Spielplatzkarte gør Flensborgs legepladser tilgængelige gennem et interaktivt kort. Er du på tur med børn eller vil lære dit nærområde bedre at kende, kan du vælge placeringer og læse de registrerede oplysninger. Detaljevisningen forbinder legepladsens navn med adresse og oplysninger om legeområdet.

Dermed kan du også opdage legepladser, du ikke kender i forvejen. Kortet viser det offentliggjorte datagrundlag. Hvor udførligt faciliteter og andre forhold er beskrevet, afhænger af det enkelte opslag.

## Hvorfor findes projektet?

Kommunen havde allerede offentliggjort en legepladsliste som PDF, og TBZ Flensburg havde yderligere oplysninger på et eget kort. Projektet opstod af ønsket om at gøre disse oplysninger lettere at finde og bruge uden omfattende søgning.

Det frivillige arbejde bestod derfor også i at hente eksisterende oplysninger ud af forskellige præsentationer. Separate lister og kortdata blev til et grundlag, der både kan ses i browseren og behandles i andre applikationer.

## Data og teknik

Kilderne er Flensborg Kommunes legepladsliste og TBZ's data om legeområder. Python-værktøjer i repositoriet bearbejder oplysningerne til GeoJSON. Kortvisningen bruger Leaflet med OpenStreetMap som baggrund. Legepladsernes positionsdata og baggrundskortet kommer dermed fra forskellige kilder.

## Vær med

Kender du en af legepladserne, kan du kontrollere, om placering, navn og beskrivelse hænger forståeligt sammen. Meld dokumenterbare afvigelser i det tilknyttede repository, helst med en kilde. Tilbagemeldinger om at bruge kortet på farten hjælper også videreudviklingen.
