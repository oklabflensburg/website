---
title: "Recyclingcontainerkarte"
description: "Find glass and clothing recycling containers on municipal land in Flensburg and explore collection points by district."
locale: "en"
slug: "recyclingcontainerkarte"
translationKey: "recyclingcontainerkarte"
status: "seeking-contributors"
featured: false
categories: ["environment"]
technologies: ["OpenStreetMap", "Open Data"]
links: {"website": "https://recycling.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-recycling-map"}
source: "https://codefor.de/projekte/fl-open-recycling-map/"

image: /images/projects/recyclingcontainerkarte.svg
imageAlt: "A collection container with a slot, surrounded by three circular-flow arrows."
---

## What is it about?

Recyclingcontainerkarte shows glass and clothing collection points in Flensburg. You can explore the map, select a district and open information about individual locations. Entries identify which of the recorded container types are present at each site.

The source covers Technisches Betriebszentrum Flensburg locations on municipal land. The map is therefore not a complete directory of private collection points or every waste disposal service. It answers the practical question of where the recorded containers are located nearby.

## Why does it exist?

After moving home, it can be unclear where to take glass and unwanted clothing. Existing location information needed to become easier to find and reusable in other applications. The project connects this everyday search with the processing of municipal data.

## Data and technology

Data comes from TBZ Flensburg’s location maps for glass and textile containers. Repository tools extract the information and convert it into machine-readable geographic records. The application loads GeoJSON and displays locations with Leaflet over an OpenStreetMap base map.

District areas support geographic selection. Further providers and photographs of locations are described in the sources as possible extensions. They are not required for the core function described here and are not promised as fully available.

## Help improve it

Check whether a familiar location is correctly placed and its container types are clearly presented. Document discrepancies with a place and source in the linked repository. Suggestions for search and data maintenance are also useful.
