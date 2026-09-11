---
title: "Spielplatzkarte"
description: "Discover playgrounds across Flensburg on one map and read available information about locations and facilities."
locale: "en"
slug: "playground-map"
translationKey: "spielplatzkarte"
aliases: ["spielplatzkarte"]
status: "seeking-contributors"
featured: false
categories: ["leisure"]
technologies: ["Vue", "OpenStreetMap"]
links: {"website": "https://spielplatzkarte.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-playgrounds-map"}
source: "https://codefor.de/projekte/fl-open-playgrounds-map/"

image: /images/projects/spielplatzkarte.svg
imageAlt: "A swing with two supports, a suspended seat and a clear ground line."
---

## What is it about?

Spielplatzkarte makes Flensburg’s playgrounds accessible through an interactive map. People out with children or exploring their neighbourhood can select locations and read the information recorded for them. The detail view connects each playground’s name with its address and recorded information about the play area.

This also provides a way to discover playgrounds you do not already know. The map reflects the published dataset; how thoroughly facilities and other characteristics are described depends on the individual entry.

## Why does it exist?

The city already published a playground list as a PDF, while TBZ Flensburg provided further information on its own map. The project grew from a wish to make these records easier to find and use without extensive searching.

The volunteer work therefore included extracting existing information from different presentations. Separate lists and map records became a dataset that can be viewed in a browser and processed for other applications.

## Data and technology

The sources are the City of Flensburg’s playground list and TBZ’s play-area data. Python tools in the repository prepare the records as GeoJSON. The map uses Leaflet with an OpenStreetMap background. Playground location records and the base map therefore have different sources.

## Help improve it

If you know a playground, check whether its location, name and description make sense together. Report verifiable discrepancies in the linked repository and include a source where possible. Feedback about using the map while out and about also helps guide improvements.
