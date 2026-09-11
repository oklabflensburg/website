---
title: "Notfallkarte Schleswig-Holstein"
description: "Explore police station locations and contact information across Schleswig-Holstein through an interactive map."
locale: "en"
slug: "notfallkarte"
translationKey: "notfallkarte"
status: "development"
featured: false
categories: ["safety"]
technologies: ["OpenStreetMap", "Open Data"]
links: {"website": "https://notfallkarte.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-emergency-map"}
source: "https://codefor.de/projekte/fl-open-emergency-map/"
image: /images/projects/notfallkarte.svg
imageAlt: "A protective shield with an embedded location marker for police stations."
---

## What is it about?

Notfallkarte Schleswig-Holstein helps people locate police stations. Its specific content is the location and contact information of police offices across the state. Map markers open details for individual stations, while moving the map loads further records for the visible area.

Despite its broad project name, the map does not claim to cover every kind of emergency facility. Its verified scope focuses on police stations. It supports orientation and access to published contact information; it is not an emergency calling or dispatch system.

## Why does it exist?

The idea emerged during the coronavirus pandemic. The volunteer team wanted to make nearby police stations easier to find. People can explore their locations directly on a map instead of searching an administrative dataset themselves.

The project demonstrates a practical use of published government data: location records become accessible in a geographic context relevant to everyday use.

## Data and technology

The source is the “Polizeidienststellen in Schleswig-Holstein” dataset from the state’s open data portal. The repository contains record-import tools and a Leaflet interface. It requests stations through the Open Data API, for example within a map area or around a position.

OpenStreetMap supplies the background map. Station information comes from the state dataset identified above. Its reference date determines how current individual details are.

## Help improve it

Incorrect locations, outdated contacts and problems with detail views can be documented in the linked repository. Identifying the station and a verifiable source helps others check a proposed correction.
