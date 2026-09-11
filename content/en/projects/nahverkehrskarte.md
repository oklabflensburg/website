---
title: "Nahverkehrskarte"
description: "A Flensburg map prototype showing OpenStreetMap public transport stops and route geometry alongside city districts."
locale: "en"
slug: "nahverkehrskarte"
translationKey: "nahverkehrskarte"
status: "seeking-contributors"
featured: false
categories: ["mobility"]
technologies: ["OpenStreetMap", "GIS"]
links: {"website": "https://nahverkehr.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-transport-map"}
source: "https://codefor.de/projekte/fl-open-transport-map/"

image: /images/projects/nahverkehrskarte.svg
imageAlt: "An abstract bus beside a transit route with marked stops."
---

## What is it about?

Nahverkehrskarte is a map prototype for Flensburg. It displays route geometry and stops together with district areas. This lets you explore where recorded transport services are located across the city and how stops are distributed.

Its focus is a geographic overview of the network. The application loads prepared geographic data; it does not provide verified real-time departure information or journey planning. The repository identifies its starting point as “Nahverkehr 2023”.

## Why does it exist?

The project explores what freely available public transport data can reveal. One initial question concerned the distribution of stops in relation to district populations. The map provides a geographic starting point for those questions, without claiming to deliver a completed accessibility analysis.

Residents and people interested in mobility can use the overview to understand the network’s structure and formulate questions about provision in particular areas.

## Data and technology

The project sources identify OpenStreetMap as the basis for the transport data. The current code loads GeoJSON files for routes, stops and districts, displaying them with Leaflet over an OpenStreetMap base map.

What the information can tell you depends on when the prepared data was collected. A line on the map is therefore not confirmation of today’s travel times or current operations.

## Help improve it

Contributions can improve the freshness and documentation of the source data or make the map clearer. Describe the particular stop, route or question you would like to investigate in the linked repository.
