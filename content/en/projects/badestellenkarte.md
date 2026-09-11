---
title: "Badestellenkarte Schleswig-Holstein"
description: "Find bathing locations across Schleswig-Holstein and explore recorded facilities, seasons and bathing-water information."
locale: "en"
slug: "badestellenkarte"
translationKey: "badestellenkarte"
status: "development"
featured: false
categories: ["leisure"]
technologies: ["Python", "OpenStreetMap", "Open Data"]
links: {"website": "https://badestellenkarte.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-bath-map"}
source: "https://codefor.de/projekte/fl-open-bath-map/"
image: /images/projects/badestellenkarte.svg
imageAlt: "A location marker above two water waves beside a stylised coastline."
---

## What is it about?

Badestellenkarte Schleswig-Holstein brings together information about bathing locations and other waterside places. You can explore a map area, select a marker and read the available details about that place. Moving the map loads the locations within the visible area.

Text search and filters for type, category and infrastructure help narrow the results. The application also supports searching nearby using the browser’s location. You can look up a place you know or investigate bathing locations in an area. Individual records have their own detail pages that can be opened directly.

## Why does it exist?

Bathing-water information is spread across several datasets. Planning a trip often raises several questions together: where is the site, what facilities are recorded, and what information is available about the water? The project connects those details geographically without requiring visitors to process the data themselves.

Additional tourism locations are treated as separate map objects. A place beside the water is therefore not automatically a designated bathing site. That distinction helps visitors interpret their search results.

## Data and technology

The application uses open Schleswig-Holstein datasets covering bathing-site records, classifications, infrastructure, seasons and measurements. Waterside places from the state tourism database supplement them. The repository’s source configuration records how this information is discovered and downloaded.

A FastAPI backend normalises the data for map queries. The interface uses Nuxt, Vue and Leaflet. PostgreSQL with PostGIS can additionally provide storage and spatial searching, but is optional according to the documentation. The information available for each place depends on its source records.

## Help improve it

If you know one of the bathing locations, you can check how it is presented and whether its sources are clear. A useful issue identifies the record and includes a verifiable source. Testing search, filters and the mobile interface also provides practical contributions through the linked repository.
