---
title: "Flurstücksauskunft Schleswig-Holstein"
description: "Explore land parcels and administrative boundaries in Schleswig-Holstein on an unofficial map without ownership information."
locale: "en"
slug: "flurstuecksauskunft"
translationKey: "flurstuecksauskunft"
status: "development"
featured: false
categories: ["administration"]
technologies: ["PostGIS", "Leaflet", "Open Data"]
links: {"website": "https://flurstuecksauskunft.oklabflensburg.de/", "github": "https://github.com/oklabflensburg/open-parcel-map"}
source: "https://codefor.de/projekte/fl-open-parcel-map/"
image: /images/projects/flurstuecksauskunft.svg
imageAlt: "A network of differently sized land parcels with one area highlighted in blue."
---

## What is it about?

Flurstücksauskunft Schleswig-Holstein provides map access to land parcels, cadastral districts and administrative boundaries. It shows how individual parcels relate geographically to larger areas. Selecting a position lets you request the associated parcel information.

The project is explicitly an unofficial information service without ownership data. It offers an initial orientation for interested residents and civic groups examining land in their surroundings. The public view does not identify who owns a property.

## Why does it exist?

The idea emerged from conversations with civic initiatives. Information about district and municipal boundaries, cadastral districts and parcels needed to be easier to access digitally. A shared map helps put a place into context without first downloading and processing extensive geographic datasets.

## Data and technology

The source is ALKIS Schleswig-Holstein without ownership information, supplied by the Landesamt für Vermessung und Geoinformation. The repository points to the state’s relevant Atom feed for downloads since March 2025 and documents subsequent processing in PostGIS.

The current interface uses Leaflet. It combines map layers with a point-based query to the Open Data API. OpenStreetMap supplies part of the base map, while parcel information comes from ALKIS. These sources therefore play different roles.

The data’s reference date matters when using the map. It makes published records easier to access, but does not replace an official cadastral enquiry.

## Help improve it

Specific reports about map presentation, import problems or confusing parcel information are useful. Identify the location and data source in the linked repository when proposing an improvement.
