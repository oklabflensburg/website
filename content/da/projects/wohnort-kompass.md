---
title: "Wohnort-Kompass"
description: "Sammenlign tyske kommuner ud fra dine prioriteter med data om klima, luft, trafik, befolkning og hverdagens tilbud."
locale: "da"
slug: "wohnort-kompass"
translationKey: "wohnort-kompass"
status: "development"
featured: false
categories: ["housing"]
technologies: ["Python", "PostGIS", "Open Data"]
links: {"website": "https://wohnortkompass.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-living-map"}
source: "https://codefor.de/projekte/fl-open-living-map/"
image: /images/projects/wohnort-kompass.svg
imageAlt: "En kompasnål over en husform forbinder orientering med søgningen efter et bosted."
---

## Hvad handler det om?

Wohnort-Kompass hjælper dig med at sammenligne kommuner i Tyskland ved hjælp af offentlige data. Applikationen kombinerer søgning efter et sted at bo med ranglister, en sammenligningsvisning og detaljerede sider om de enkelte steder. Dine egne prioriteter er centrale: I søgeværktøjet kan du vægte de emner, der betyder mest for dig.

Projektet undersøger syv områder: klima, luftkvalitet, trafiksikkerhed, demografi, hverdagens tilbud, arealanvendelse og kollektiv trafik. De danner grundlag for delvurderinger og et personligt vægtet resultat. Du kan sammenligne op til tre kommuner side om side. Søgning efter kommunenavn eller postnummer hjælper dig i gang, og detaljesiderne viser værdier, kilder og kort.

## Hvorfor findes projektet?

En placering på en rangliste fortæller ikke meget om, hvorvidt et sted passer til dine ønsker. Wohnort-Kompass synliggør kriterierne bag en sammenligning og giver plads til forskellige prioriteringer. Den, der vægter kollektiv trafik og lokale tilbud højt, stiller et andet spørgsmål end den, der især interesserer sig for klimaindikatorer.

Regionale data bliver dermed en hjælp til at undersøge et bosted eller sammenligne alternativer. Resultaterne beskriver kommuner ud fra udvalgte indikatorer. De erstatter hverken et besøg på stedet eller en boligsøgning med konkrete boliger.

## Data og teknik

Repositoriet dokumenterer import af kommunegrænser fra BKG, Destatis og Regionalstatistik, Deutscher Wetterdienst, Umweltbundesamt, Unfallatlas, OpenStreetMap samt køreplansdata i GTFS-format. Kilderne belyser forskellige sider af levevilkårene. Vejr- og luftmålestationer knyttes eksempelvis til regionerne og vises på detaljesiderne.

Visningen indeholder oplysninger om datadækning, aktualitet og indirekte mål. Manglende kategorier bliver ikke blot vurderet til nul. Det er vigtigt for fortolkningen: En værdi fra en tilknyttet målestation er ikke en måling af hver eneste gade.

Teknisk kombinerer applikationen en Nuxt-brugerflade med FastAPI og PostgreSQL/PostGIS. Importprocesser bearbejder kilderne, hvorefter vurderingerne beregnes.

## Vær med

Konkrete oplysninger om datafejl, bedre forklaringer af vurderingsmetoden og tilbagemeldinger om sammenligningsvisningen er nyttige bidrag. I det tilknyttede repository kan du stille spørgsmål om indikatorer eller foreslå forbedringer af import, præsentation og dokumentation.
