---
title: "Sozialatlas"
description: "En åben prototype gør sociale strukturdata for Flensborg og byens 13 bydele tilgængelige gennem geografi og nøgletal."
locale: "da"
slug: "sozialatlas"
translationKey: "sozialatlas"
status: "seeking-contributors"
featured: false
categories: ["society"]
technologies: ["PostGIS", "Open Data", "HTML"]
links: {"website": "https://dev.sozialatlas.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-social-map"}
source: "https://codefor.de/projekte/fl-open-social-map/"

image: /images/projects/sozialatlas.svg
imageAlt: "Forbundne datapunkter i forskellige størrelser hen over tilstødende bydele."
---

## Hvad handler det om?

Den digitale Sozialatlas bearbejder kommunale sociale strukturdata for Flensborg og byens 13 bydele. Den skal gøre forskelle inden for byen lettere at forstå og skabe et grundlag for planlægning og offentlig debat. Borgere og mennesker fra forvaltning eller civilsamfund kan få adgang til de bagvedliggende tal.

Den oprindelige projektbeskrivelse fokuserer på at vælge bydele på et kort. Den nuværende udviklingsversion indeholder også et dashboard med bydelsvalg og nøgletal for blandt andet befolkning, aldersgrupper, beskæftigelse og boligstøtte. Repositoriet beskriver fortsat løsningen som en prototype.

## Hvorfor findes projektet?

Kommunen udgiver sin Sozialatlas som rapport. Ved konkrete spørgsmål om en bydel er det nyttigt også at kunne undersøge oplysningerne struktureret og interaktivt. Projektet skaber en sådan adgang til eksisterende kommunale oplysninger.

Tallene vedrører områder og rapporteringsperioder. De beskriver ikke enkeltpersoner og forklarer ikke i sig selv sociale forskelle. Ved sammenligning af bydele er definitioner, beregningsgrundlag og dataperiode derfor en del af fortolkningen.

## Data og teknik

Repositoriet henviser til Flensborg Kommunes Sozialatlas, især udgaven fra 2022, samt bydelsgeometrier fra kommunens statistikenhed. Materialet omfatter befolkning, arbejdsmarked, boliger og social støtte. SQL-filer, metadata og importværktøjer gør bearbejdningen efterprøvbar.

PostgreSQL/PostGIS understøtter datalagring og geografisk tilknytning. Den nuværende JavaScript-kode behandler strukturerede data til bydelsvisninger. Der loves ikke løbende indlæsning af hver ny årsrapport.

## Vær med

Letforståelige forklaringer af nøgletal, dokumenterbare datarettelser og feedback om præsentationen er nyttige bidrag. Angiv bydel, rapporteringsår og nøgletal i et issue, så spørgsmålet kan sammenholdes med kilden.
