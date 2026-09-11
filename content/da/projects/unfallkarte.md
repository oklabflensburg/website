---
title: "Unfallkarte"
description: "Undersøg trafikulykker med personskade i Flensborg fra 2016 til 2024 på et kort med filtre for år, bydele og ulykkesforhold."
locale: "da"
slug: "unfallkarte"
translationKey: "unfallkarte"
status: "seeking-contributors"
featured: false
categories: ["mobility"]
technologies: ["Vue", "PostGIS", "Open Data"]
links: {"website": "https://unfallkarte.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-accident-map"}
source: "https://codefor.de/projekte/fl-open-accident-map/"

image: /images/projects/unfallkarte.svg
imageAlt: "Et vejkryds med analysepunkter i forskellige størrelser for geografiske ulykkesdata."
---

## Hvad handler det om?

Unfallkarte viser registrerede trafikulykker med personskade i Flensborg. Du kan vælge et ulykkespunkt og se de tilknyttede oplysninger. Filtre for år, bydele, ulykkestype og hændelsesforløb gør det muligt at afgrænse visningen efter et konkret spørgsmål.

Den nuværende brugerflade tilbyder årgangene 2016 til 2024. Du kan undersøge, ved hvilke veje eller kryds de viste hændelser samler sig, og hvordan udvalget ændrer sig over flere år. Kortet viser dokumenterede ulykker, ikke trafiksituationen i realtid.

## Hvorfor findes projektet?

I diskussioner om trafiksikkerhed er det nyttigt at undersøge hændelser geografisk og efter deres kendetegn. Kortet letter adgangen til de statistiske datasæt og giver kommunale beslutningstagere og interesserede borgere et fælles grundlag for yderligere spørgsmål.

En synlig ophobning forklarer dog hverken ulykkernes årsager eller den personlige risiko ved en bestemt rute. Visningen hjælper med at udforske data, mens en faglig vurdering kræver yderligere sammenhæng.

## Data og teknik

Det nuværende repository nævner Statistische Ämter des Bundes und der Länder samt BKG som kilder og referencegrundlag. Lokale metadata supplerer Flensborgs datasæt. Det omfatter ulykker med personskade, ikke alle materielle skader eller nærved-hændelser.

Applikationen bruger Nuxt og Leaflet. Den nuværende kortkomponent henter ulykkesoplysninger for Flensborg gennem Open Data API. PostgreSQL/PostGIS, SQL-filer og Python-værktøjer understøtter databehandlingen. Repositoriet indeholder desuden eksempeldata i GeoJSON-format.

## Vær med

Du kan afprøve filtre og detaljeoplysninger eller foreslå tydeligere forklaringer af ulykkesforholdene. En god fejlrapport angiver årgang, valgte filtre og sted i repositoriet. Det gør tilbagemeldingen mulig at genskabe.
