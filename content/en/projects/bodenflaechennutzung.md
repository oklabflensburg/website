---
title: "Bodenflächennutzung"
description: "A land-use map prototype for Germany: explore municipal land shares using statistics from 2019."
locale: "en"
slug: "bodenflaechennutzung"
translationKey: "bodenflaechennutzung"
status: "seeking-contributors"
featured: false
categories: ["environment"]
technologies: ["GIS", "Open Data"]
links: {"website": "https://bodennutzung.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-surface-map"}
source: "https://codefor.de/projekte/fl-open-surface-map/"

image: /images/projects/bodenflaechennutzung.svg
imageAlt: "Four distinct areas represent vegetation, agriculture, water and settlement."
---

## What is it about?

Bodenflächennutzung presents statistics on actual land use through an interactive map. The prototype uses municipal data from Germany, so its scope extends beyond Schleswig-Holstein. Selecting a municipality reveals figures for categories including woodland, agriculture, transport, and combined settlement and transport areas.

This helps reveal how municipalities differ. The figures describe land shares within a municipality, rather than the use of individual parcels. The published data refers to 2019.

## Why does it exist?

A large statistical table is difficult to understand geographically. Connecting its figures to municipal areas makes regional differences easier to explore. The map offers a visual starting point for people interested in landscapes, settlement patterns and municipal land use.

## Data and technology

The repository identifies the 2019 land-use statistics of the Statistische Ämter des Bundes and BKG administrative areas in the VG5000 dataset, also from 2019. Records are joined using the official municipality code and prepared as GeoJSON. Leaflet displays the areas over an OpenStreetMap base map.

The sources explicitly describe an initial prototype. Additional filters and coverage of independent cities and city-states are development goals. The project therefore does not promise complete coverage of every municipality or an up-to-date land-use plan.

## Help improve it

Further work can focus on data preparation and clear explanations of the indicators. Describe the municipality, reference period or presentation involved in the repository. When introducing newer data, document how it aligns with the geographic boundaries being used.
