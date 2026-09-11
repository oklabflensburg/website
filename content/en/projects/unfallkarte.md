---
title: "Unfallkarte"
description: "Explore injury collisions in Flensburg from 2016 to 2024 on a map, with filters for years, districts and accident characteristics."
locale: "en"
slug: "unfallkarte"
translationKey: "unfallkarte"
status: "seeking-contributors"
featured: false
categories: ["mobility"]
technologies: ["Vue", "PostGIS", "Open Data"]
links: {"website": "https://unfallkarte.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-accident-map"}
source: "https://codefor.de/projekte/fl-open-accident-map/"

image: /images/projects/unfallkarte.svg
imageAlt: "A street intersection with differently sized analysis points for spatial accident data."
---

## What is it about?

Unfallkarte displays recorded road collisions involving personal injury in Flensburg. You can select an accident point and inspect its recorded characteristics. Filters for years, districts, accident types and collision circumstances let you narrow the view around a particular question.

The current interface offers the years 2016 to 2024. You can investigate which streets or junctions show concentrations of recorded events and how the selection changes across years. The map shows documented accidents, rather than real-time traffic conditions.

## Why does it exist?

Discussions about road safety benefit from examining events geographically and by their characteristics. A map makes statistical datasets easier to access and gives municipal decision-makers and interested residents a shared starting point for further questions.

Visible concentrations alone do not explain causes or establish an individual’s risk on a route. The presentation helps explore the records; specialist assessment requires additional context.

## Data and technology

The current repository names the Statistische Ämter des Bundes und der Länder and BKG as sources and reference points. Local metadata supplements the Flensburg records. The dataset covers injury accidents, rather than every property-damage collision or near miss.

The application uses Nuxt and Leaflet. Its current map component retrieves Flensburg accident information through the Open Data API. PostgreSQL/PostGIS, SQL files and Python tools support data preparation, and the repository also includes sample datasets in GeoJSON format.

## Help improve it

You can check filters and detail records or suggest clearer explanations of accident characteristics. A useful issue specifies the year, selected filters and location in the repository. This makes the feedback reproducible.
