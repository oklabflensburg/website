---
title: "Wohnort-Kompass"
description: "Compare municipalities across Germany by your priorities, using data on climate, air, transport, population and everyday amenities."
locale: "en"
slug: "wohnort-kompass"
translationKey: "wohnort-kompass"
status: "development"
featured: false
categories: ["housing"]
technologies: ["Python", "PostGIS", "Open Data"]
links: {"website": "https://wohnortkompass.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-living-map"}
source: "https://codefor.de/projekte/fl-open-living-map/"
image: /images/projects/wohnort-kompass.svg
imageAlt: "A compass needle above a house shape connects orientation with finding a place to live."
---

## What is it about?

Wohnort-Kompass helps people compare municipalities across Germany using public data. It combines a place-to-live finder with rankings, a comparison view and detailed pages for individual places. Your own priorities are central: the finder lets you weight the subjects that matter most to you.

The project considers seven areas: climate, air quality, road safety, demographics, everyday amenities, land use and public transport. These produce category scores and a personalised weighted result. Up to three municipalities can be compared side by side. Searching by municipality name or postcode provides an entry point, while detail pages show the underlying values, sources and maps.

## Why does it exist?

A single ranking tells you little about whether a place fits your preferences. Wohnort-Kompass exposes the criteria behind a comparison and allows different weightings. Someone prioritising public transport and local amenities is asking a different question from someone mainly interested in climate indicators.

Regional data thus becomes a way to investigate a place to live or compare alternatives. The results describe municipalities through selected indicators. They do not replace visiting a place yourself or searching for specific homes on the market.

## Data and technology

The repository documents imports of BKG municipal boundaries, Destatis and Regionalstatistik data, Deutscher Wetterdienst, Umweltbundesamt, Unfallatlas, OpenStreetMap and public transport schedules in GTFS format. These sources cover different aspects of local conditions. Weather and air monitoring stations, for example, are assigned to regions and identified on their detail pages.

The interface includes information about coverage, freshness and proxy indicators. Missing categories are not simply scored as zero. This matters when interpreting results: a value from an assigned monitoring station is not a measurement of every street in the municipality.

The application combines a Nuxt frontend with FastAPI and PostgreSQL/PostGIS. Import processes prepare the source data before scores are calculated.

## Help improve it

Useful contributions include reproducible data corrections, clearer explanations of the scoring method and feedback on the comparison view. The linked repository is the place to ask about individual indicators or propose improvements to imports, presentation and documentation.
