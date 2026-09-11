---
title: "Open Data API"
description: "The Open Data API makes municipal and regional datasets available for custom maps, analysis and applications."
locale: "en"
slug: "open-data-api"
translationKey: "open-data-api"
status: "seeking-contributors"
featured: false
categories: ["infrastructure"]
technologies: ["Python", "FastAPI", "PostgreSQL", "ETL"]
links: {"website": "https://api.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-data-api"}
source: "https://codefor.de/projekte/fl-open-data-api/"
image: /images/projects/open-data-api.svg
imageAlt: "Three open data modules connect through lines to four outer data nodes."
---

## What is it about?

The Open Data API is OK Lab Flensburg’s data interface. It provides public information in a form that software can request and process directly. Its focus is Flensburg and Schleswig-Holstein, while the geographic coverage depends on the individual dataset.

The current source code registers access to schools, police stations, monuments, biotopes, street trees and demographic data, among other subjects. Administrative, climate and energy data are also included. Usage examples show how to request energy installations by identifier or municipality code, and how to look up municipalities by name.

Developers can use the API as a starting point for their own maps, websites and analysis. Anyone wanting to explore the available information can begin with the linked interactive documentation, which describes requests and their parameters.

## Why does it exist?

Publishing a table does not necessarily make it easy to use in an application. Different formats, geographic definitions and separate downloads create extra work. The API brings access together and makes processed data reusable through documented interfaces.

Projects can therefore share basic data access instead of implementing it from scratch each time. Municipal questions can also be explored through custom visualisations. What the data can tell you still depends on each source’s content, coverage and reference period. A shared interface does not automatically make different datasets comparable.

## Data and technology

The service uses Python with FastAPI and a PostgreSQL database with PostGIS for geographic data. Its import instructions connect it to datasets from projects such as the monument map and social atlas. Additional import tools and data models are documented in the repository.

The API returns machine-readable responses and describes its interfaces through OpenAPI. This makes its documentation useful when starting an application: identify the relevant endpoint and parameters first, then integrate the required data into your project.

## Help improve it

Bug reports, reproducible request examples and suggestions for datasets can be submitted as issues in the linked repository. Include the parameters you used and the result you expected. Improvements to import tools and documentation also make reuse easier for others.
