---
title: "kulturbytes"
description: "Find kulturarrangementer og kultursteder: kulturbytes samler søgbare tilbud og giver arrangører større synlighed."
locale: "da"
slug: "kulturbytes"
translationKey: "kulturbytes"
status: "development"
featured: true
featuredOrder: 1
categories: ["culture"]
technologies: ["Nuxt", "Vue", "TypeScript"]
links: {"website": "https://kulturbytes.de", "github": "https://github.com/sndcds/kulturbytes-client"}
source: "https://codefor.de/projekte/fl-kulturbytes/"
image: /images/projects/kulturbytes.svg
imageAlt: "En arrangementsbillet med udskårne sider og en geometrisk kulturstjerne."
---

## Hvad handler det om?

kulturbytes er en platform for kulturarrangementer og kultursteder, som er opstået i OK Lab Flensburg. Den samler tilbud fra institutioner, initiativer, projekter og uafhængige kulturaktører. Besøgende kan opdage arrangementer, mens arrangører får en fælles platform, hvor deres tilbud kan blive synlige.

Søgningen kan afgrænses efter kategorier, arrangementstyper, genrer, dato og sted. Klientens dokumentation beskriver også søgning inden for en radius. Arrangementsvisninger samler oplysninger om det enkelte tilbud, mens sider for kultursteder og et kort giver en anden vej ind. Du kan altså tage udgangspunkt i enten en interesse eller et sted, når du leder efter arrangementer.

Applikationen er flersproget og indeholder brugerfladetekster på tysk, dansk og engelsk. Projektet har rødder i Flensborg, men valget af steder og regioner er ikke begrænset til byen. Hvilke tilbud du finder, afhænger af de arrangementer, der faktisk er offentliggjort.

## Hvorfor findes projektet?

Kulturoplysninger ligger ofte spredt på mange hjemmesider. For at få et overblik skal man derfor tit kende de relevante institutioner på forhånd. En fælles søgning kan også gøre det muligt at opdage tilbud, man ikke vidste, at man skulle lede efter.

kulturbytes henvender sig udtrykkeligt også til mindre institutioner, foreninger, initiativer og uafhængige kulturaktører. Projektet vil give dem digital synlighed sammen med de større kulturhuse. Projektbeskrivelsen angiver, at brugen er gratis både for besøgende og for kulturaktører, der offentliggør tilbud.

## Data og teknik

Oplysningerne leveres gennem KulturBytes API, også omtalt som Uranus API. Den tilknyttede klient bruger Nuxt, Vue og TypeScript. Den nuværende kildekode anvender MapLibre til kort. Arrangementer og arrangementssteder behandles som strukturerede data og præsenteres i forskellige visninger.

Brugerfladen, indholdsadministrationen og backend er separate dele af projektet. En beskrivelse af klienten er derfor ikke et løfte om, at alle administrative funktioner findes direkte på den offentlige hjemmeside.

## Vær med

Du kan afprøve arrangementssider og filtre, melde uklare oplysninger eller bidrage til oversættelser, dokumentation og kode. Beskriv gerne præcist, hvilket tilbud eller hvilken søgning din tilbagemelding handler om. Det tilknyttede repository er et udgangspunkt for at deltage i udviklingen.
