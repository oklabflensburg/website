---
title: "Kitafinder"
description: "Find childcare centres in Flensburg on a map and explore available contact details, care provision and opening hours."
locale: "en"
slug: "kitafinder"
translationKey: "kitafinder"
status: "seeking-contributors"
featured: false
categories: ["education"]
technologies: ["HTML", "Open Data", "GIS"]
links: {"website": "https://kitakarte.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-kita-map"}
source: "https://codefor.de/projekte/fl-open-kita-map/"

image: /images/projects/kitafinder.svg
imageAlt: "A simple house with a building-block window and a violet location marker."
---

## What is it about?

Kitafinder brings Flensburg’s childcare centres together on one map. Parents and other interested visitors can explore nearby facilities and select a marker to open their information. This helps place the centres in the context of home and everyday routines.

Depending on the available record, details include contacts, the provider, opening hours and information about care provision or age groups. The map supports initial research and subsequent contact with a centre. Recorded capacity figures do not show currently vacant places, and the application does not handle registration.

## Why does it exist?

The project grew out of a search for childcare. A municipal list and individual contact pages already offered information, but lacked an easily accessible overview of locations. Bringing the records together geographically means other parents do not need to repeat that research from scratch.

## Data and technology

The repository identifies the childcare dataset from Schleswig-Holstein’s open data portal and a supplementary City of Flensburg list as sources. The application loads processed location records in GeoJSON format and displays them with Leaflet. Its current code uses basemap.de as the background map.

The information displayed depends on each record. When planning childcare, check important details with the linked institution.

## Help improve it

You can report outdated contact details or confusing entries and test the interface on different devices. Identify the centre clearly and include a verifiable source when proposing corrections in the repository.
