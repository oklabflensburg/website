---
title: "Bildungsatlas"
description: "Explore schools across Schleswig-Holstein by location and school type, find contact details and open individual school records."
locale: "en"
slug: "bildungsatlas"
translationKey: "bildungsatlas"
status: "seeking-contributors"
featured: false
categories: ["education"]
technologies: ["Vue", "Python", "PostGIS"]
links: {"website": "https://schulkarte.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-school-map"}
source: "https://codefor.de/projekte/fl-open-school-map/"

image: /images/projects/bildungsatlas.svg
imageAlt: "An open book with folded map areas and a blue learning-location point."
---

## What is it about?

Bildungsatlas displays school locations on an interactive map. What began as an idea for a Flensburg school overview has become an application covering Schleswig-Holstein. Parents, interested residents and municipalities can place schools in their geographic context and find available contact information and further links.

The map can be filtered by school type. Markers open a detail view, and individual schools have their own directly accessible addresses. A location feature helps find nearby schools. This can show where schools are in relation to home, but does not promise school-route calculation.

## Why does it exist?

The project began with a search for a primary school in Flensburg. Contact information existed, but assembling it into a geographic overview was cumbersome. Bildungsatlas connects those details to a map, making it easier to gain an initial understanding of possible schools.

## Data and technology

The project description identifies Schleswig-Holstein’s directories of general and vocational schools, supplemented by information from the linked institutions. The current repository documents access through the Open Data API’s school interface and imports into PostgreSQL/PostGIS. School identifiers can be linked to Wikidata records during import.

The map application uses Nuxt and Leaflet. An earlier proposal to analyse playground and schoolyard areas was an expansion idea, rather than a feature promised here.

## Help improve it

Useful reports identify incorrect contact details, unclear school types or problems opening a school record. Include the institution and, where possible, its official information page in the linked repository. Improvements to usability and documentation also help people use the application.
