---
title: "Straßenbäume"
description: "Flensburg’s tree inventory maps recorded street trees with locations, identifiers and botanical information."
locale: "en"
slug: "strassenbaeume"
translationKey: "strassenbaeume"
status: "seeking-contributors"
featured: false
categories: ["environment"]
technologies: ["GIS", "Open Data"]
links: {"website": "https://baumkataster.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-trees-map"}
source: "https://codefor.de/projekte/fl-open-trees-map/"

image: /images/projects/strassenbaeume.svg
imageAlt: "A branching tree crown beside a street axis with three mapped location points."
---

## What is it about?

The Straßenbäume project makes Flensburg’s tree inventory accessible through an interactive map. You can select individual trees and read recorded details about their location and botanical classification. District selection helps narrow the dataset geographically.

The focus is the trees in the published inventory, rather than a complete survey of every tree in the city. Basic records include a unique identifier, coordinates and information about genus, species and variety. Further fields are displayed only where present in the processed dataset.

## Why does it exist?

Trees are part of everyday neighbourhood life, yet their variety often goes unnoticed. The project makes the municipal inventory tangible and offers an entry point into questions about urban greenery and climate change. Residents can become more familiar with nearby trees and explore the available data.

The map does not automatically answer those specialist questions. Ideas such as assessing climatic suitability or offering tree sponsorships do not follow simply from a tree appearing in the inventory.

## Data and technology

The source is TBZ Flensburg data published through Schleswig-Holstein’s open data portal. The repository describes making the inventory available and includes tools for conversion, import and geographic assignment. Leaflet displays the records, while PostgreSQL/PostGIS supports processing.

The original source lacked fields including tree height, crown diameter and planting year. Missing fields therefore cannot be used to infer a tree’s actual condition.

## Help improve it

Reports about unclear species names, incorrect assignments or map problems are useful. Include the tree identifier and location in the repository where possible. This helps others check the feedback against the published dataset.
