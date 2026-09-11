---
title: "Digitale Denkmalkarte"
description: "Discover cultural monuments across Schleswig-Holstein and read descriptions, object records and recorded scope of protection."
locale: "en"
slug: "denkmalkarte"
translationKey: "denkmalkarte"
status: "seeking-contributors"
featured: false
categories: ["culture"]
technologies: ["Leaflet", "PostGIS", "Open Data"]
links: {"website": "https://denkmalkarte.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-monuments-map"}
source: "https://codefor.de/projekte/fl-open-monuments-map/"

image: /images/projects/denkmalkarte.svg
imageAlt: "A historic twin facade with gables, windows and a shared arched entrance."
---

## What is it about?

Digitale Denkmalkarte makes cultural monuments in Schleswig-Holstein accessible through an interactive map. Explore an area and select a marker to open information about an individual object. Moving the map loads further locations within the visible area.

Available details include addresses, object numbers, descriptions, monument types and the recorded scope of protection. The map provides a starting point for people interested in architectural heritage, local history or a particular building. Volunteers at OK Lab Flensburg develop the presentation; the specialist monument data comes from the responsible state authority.

## Why does it exist?

The project began with the question of how to connect monument lists to the buildings people encounter in everyday life. Early work added coordinates to list entries. The current code also processes geometries and retrieves object records through the Open Data API.

The map thus provides a geographic entry point into a specialist register. It supports discovery and further reading, without itself determining whether a building qualifies as a protected monument.

## Data and technology

The source is the Landesamt für Denkmalpflege Schleswig-Holstein, which publishes data through the state’s open data portal. The repository includes tools for importing monument records and geometries, alongside a Leaflet interface. PostgreSQL/PostGIS supports geographic data processing.

An older README heading still names Flensburg, while the project description and current data structure include other parts of Schleswig-Holstein. Freshness depends on the relevant data’s reference date.

## Help improve it

Report misplaced markers, unclear descriptions or problems opening an object in the repository. Including the object number, place and source helps others investigate your feedback.
