---
title: "Straßenbäume"
description: "Flensborgs træregister viser registrerede gadetræer med placering, identifikator og botaniske oplysninger på et åbent kort."
locale: "da"
slug: "strassenbaeume"
translationKey: "strassenbaeume"
status: "seeking-contributors"
featured: false
categories: ["environment"]
technologies: ["GIS", "Open Data"]
links: {"website": "https://baumkataster.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-trees-map"}
source: "https://codefor.de/projekte/fl-open-trees-map/"

image: /images/projects/strassenbaeume.svg
imageAlt: "En forgrenet trækrone ved siden af en vejlinje med tre kortlagte punkter."
---

## Hvad handler det om?

Projektet Straßenbäume gør Flensborgs træregister tilgængeligt gennem et interaktivt kort. Du kan vælge et træ og læse registrerede oplysninger om placering og botanisk klassifikation. Bydelene hjælper med at afgrænse datasættet geografisk.

Fokus er træerne i det offentliggjorte register, ikke en fuldstændig registrering af alle træer i byen. Grundoplysningerne omfatter en entydig identifikator, koordinater samt slægt, art og sort. Yderligere felter vises kun, hvor de findes i de bearbejdede data.

## Hvorfor findes projektet?

Træer er en del af hverdagen i et kvarter, men deres mangfoldighed er ofte mindre kendt. Projektet gør det kommunale register anskueligt og giver en indgang til spørgsmål om bynatur og klimaforandringer. Borgere kan lægge mere mærke til træerne omkring sig og undersøge de tilgængelige data.

Kortet besvarer ikke automatisk de faglige spørgsmål. Idéer som vurdering af træarters klimaegnethed eller træfadderskaber følger ikke alene af, at et træ findes i registret.

## Data og teknik

Grundlaget er TBZ Flensburgs data fra Slesvig-Holstens åbne dataportal. Repositoriet beskriver tilgængeliggørelsen af registret og indeholder værktøjer til konvertering, import og geografisk tilknytning. Leaflet viser data på kortet, mens PostgreSQL/PostGIS understøtter behandlingen.

Den oprindelige kilde indeholdt blandt andet ikke træhøjde, kronediameter eller planteår. Manglende felter siger derfor ikke noget om træets faktiske tilstand.

## Vær med

Meld gerne uklare artsnavne, forkerte tilknytninger eller problemer med kortet. Angiv helst træets identifikator og placering i repositoriet. Så kan tilbagemeldingen sammenholdes med det offentliggjorte datasæt.
