---
title: "Biotopkarte Schleswig-Holstein"
description: "Udforsk kortlagte levesteder i Slesvig-Holsten, og læs oplysninger om biotoptyper, arealer og registrerede beskyttelsesforhold."
locale: "da"
slug: "biotopkarte"
translationKey: "biotopkarte"
status: "development"
featured: true
featuredOrder: 2
categories: ["nature"]
technologies: ["GIS", "OpenStreetMap"]
links: {"website": "https://biotopkarte.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-biotope-map"}
source: "https://codefor.de/projekte/fl-open-biotope-map/"
image: /images/projects/biotopkarte.svg
imageAlt: "Et blad i et biotopområde med bladnerver og to linjer for vandløb."
---

## Hvad handler det om?

Biotopkarte Schleswig-Holstein gør delstatens biotopkortlægning tilgængelig i browseren. Kortet viser registrerede levesteder og knytter oplysningerne til deres geografiske placering. Når du vælger et areal, kan du læse tilgængelige oplysninger som biotoptype og eventuelt FFH-habitatnaturtype.

Visningen skelner mellem kildens kategorier Wertbiotope og Nichtwertbiotope. Den er relevant for mennesker, der vil forstå landskabet omkring sig eller undersøge naturbeskyttelsesdata. Kortet er udtrykkeligt uofficielt, og oplysningerne kan være forældede.

## Hvorfor findes projektet?

Projektet tog afsæt i ture til strandengene og kystskrænterne ved Holnis. Her opstod ønsket om også at gøre Slesvig-Holstens mange levesteder tilgængelige digitalt. Kortet forbinder oplevelser i landskabet med de eksisterende kortlægningsdata, uden at brugeren behøver at installere et GIS-program.

## Data og teknik

Biotopkortlægningen kommer fra Landesamt für Umwelt og offentliggøres gennem Slesvig-Holstens åbne dataportal. Repositoriet dokumenterer også de områder, der indgik i den landsdækkende kortlægning i delstaten fra 2014 til 2020, samt supplerende typenøgler. Perioden beskriver kortlægningen, ikke en ny undersøgelse af forholdene på stedet.

PostgreSQL/PostGIS og importværktøjer bearbejder de geografiske data. Leaflet-brugerfladen henter oplysninger om en valgt position gennem Open Data API. De faglige betegnelser er knyttet til de underliggende datasæt.

## Vær med

Du kan bidrage med tydeligere forklaringer af biotoptyper, feedback om kortets betjening eller dokumenterede uoverensstemmelser i data. Angiv gerne sted og kilde, når du opretter et issue i det tilknyttede repository.
