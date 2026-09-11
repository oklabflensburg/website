---
title: "Sozialatlas"
description: "An open prototype making social statistics for Flensburg and its 13 districts accessible through geography and indicators."
locale: "en"
slug: "sozialatlas"
translationKey: "sozialatlas"
status: "seeking-contributors"
featured: false
categories: ["society"]
technologies: ["PostGIS", "Open Data", "HTML"]
links: {"website": "https://dev.sozialatlas.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-social-map"}
source: "https://codefor.de/projekte/fl-open-social-map/"

image: /images/projects/sozialatlas.svg
imageAlt: "Connected data points of different sizes across neighbouring urban districts."
---

## What is it about?

The digital Sozialatlas prepares municipal social statistics for Flensburg and its 13 districts. It aims to make differences within the city easier to understand and provide a basis for planning and public discussion. Residents and people in administration or civil society can use it to access the underlying figures.

The original project description centres on selecting districts on a map. The current development version also contains a dashboard with district selection and indicators covering subjects such as population, age groups, employment and housing support. The repository continues to describe the application as a prototype.

## Why does it exist?

The city publishes its Sozialatlas as a report. When investigating a particular district, it is useful to explore that information in a structured, interactive form as well. The project creates this additional route into existing municipal information.

The figures refer to areas and reporting periods. They do not describe individual people or explain social differences by themselves. Definitions, denominators and reference dates are therefore part of interpreting district comparisons.

## Data and technology

The repository identifies the City of Flensburg’s Sozialatlas, particularly its 2022 edition, and district geometries supplied by the municipal statistics office. The material covers population, employment, housing and social support. SQL files, metadata and import tools make the processing traceable.

PostgreSQL/PostGIS supports storage and geographic assignment. The current JavaScript code processes structured data for district views. The project does not promise continuous import of every new annual report here.

## Help improve it

Clear explanations of indicators, verifiable data corrections and feedback on presentation are useful contributions. Include the district, reporting year and indicator in an issue so the question can be checked against its source.
