---
title: "Open City Planner"
description: "A self-hostable WebGIS for exploring, comparing and analysing urban areas in Flensburg using OpenStreetMap and municipal data."
locale: "en"
slug: "open-city-planner"
translationKey: "open-city-planner"
status: "unknown"
featured: true
featuredOrder: 0
categories: ["urbanDevelopment"]
technologies: ["PostGIS", "FastAPI", "Nuxt", "MapLibre", "OpenStreetMap"]
links: {"website": "https://stadtplaner.oklabflensburg.de/", "github": "https://github.com/oklabflensburg/open-city-planner"}
source: "https://github.com/oklabflensburg/open-city-planner"
image: /images/projects/open-city-planner.svg
imageAlt: "Stacked map layers with street axes, polygon areas and a central data point."
---

## What is it about?

Open City Planner is an open WebGIS platform for urban planning and spatial exploration. Its Flensburg reference deployment lets you examine districts, statistical areas and areas you draw yourself, directly in a browser. It brings OpenStreetMap features together with available public city data.

You can search for addresses, places and areas, select a boundary and inspect the places and spatial metrics associated with it. Comparisons use a shared set of metrics across areas, helping you understand differences without switching between separate maps and tables. You can also draw polygons and save and manage them through a user account. Public information can be explored without signing in.

## Why does it exist?

Many questions about a city have a geographic dimension, yet the relevant information is scattered across different sources. Open City Planner aims to make those connections accessible to people who do not use professional GIS software every day. It supports both learning about a neighbourhood and discussions about urban development.

The platform can be self-hosted. Flensburg is its reference city, rather than a technical limit on where it can be used. Adapting it to another place does require work on datasets, boundaries and external integrations. The project does not yet offer an immediately usable installation for any municipality.

## Data and technology

OpenStreetMap supplies geographic features and boundaries. Flensburg’s municipal “Zahlenspiegel” is also documented as a source of population and household statistics. Assigning those statistics to districts does not establish that OSM boundaries exactly match official statistical boundaries.

Nuxt and Vue provide the interface, with MapLibre displaying the map. FastAPI and PostgreSQL with PostGIS handle data access and spatial processing. The documentation explains data imports and running your own deployment.

## Help improve it

Contributions can address map usability, data integrations, spatial analysis and clear documentation. If you want to adapt the platform to another city, describe your use case and available data in the linked repository. It also contains guidance for development and collaboration.
