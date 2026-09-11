---
title: "Biotopkarte Schleswig-Holstein"
description: "Explore mapped habitats in Schleswig-Holstein and inspect recorded biotope types, areas and protection attributes."
locale: "en"
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
imageAlt: "A leaf within a habitat polygon, with leaf veins and two watercourse lines."
---

## What is it about?

Biotopkarte Schleswig-Holstein makes the state’s biotope survey accessible in a browser. It displays mapped habitats and connects their records to geographic locations. Selecting an area reveals available information such as its biotope type and, where recorded, its FFH habitat type.

The presentation distinguishes the source categories Wertbiotope and Nichtwertbiotope. It is useful for people exploring their local landscapes or working with nature conservation data. The map is explicitly unofficial, and displayed information may be outdated.

## Why does it exist?

Visits to the salt marshes and coastal cliffs at Holnis inspired the project. They prompted the idea of making Schleswig-Holstein’s range of habitats easier to explore digitally. The map connects observations outdoors with existing survey records, without requiring visitors to install GIS software.

## Data and technology

The biotope survey comes from the Landesamt für Umwelt and is published through Schleswig-Holstein’s open data portal. The repository also documents the coverage of the state-wide survey from 2014 to 2020 and supplementary classification keys. That period describes the survey, rather than a fresh assessment of conditions on the ground.

PostgreSQL/PostGIS and import tools prepare the geographic data. The Leaflet interface requests information about a selected position through the Open Data API. Specialist labels remain connected to the underlying datasets.

## Help improve it

Contributions can include clearer explanations of biotope types, feedback on map usability or documented data discrepancies. Where possible, identify the location and source when opening an issue in the linked repository.
