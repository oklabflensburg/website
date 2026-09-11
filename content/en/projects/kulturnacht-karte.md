---
title: "Kulturnacht Flensburg"
description: "The completed map for Flensburg Culture Night on 14 September 2024 documents participating venues and their programme at the time."
locale: "en"
slug: "kulturnacht-karte"
translationKey: "kulturnacht-karte"
status: "completed"
featured: false
categories: ["culture"]
technologies: ["JavaScript", "OpenStreetMap"]
links: {"website": "https://knf.grain.one", "github": "https://github.com/oklabflensburg/open-cultural-map"}
source: "https://codefor.de/projekte/fl-open-cultural-map/"
image: /images/projects/kulturnacht-karte.svg
imageAlt: "A crescent moon above a folded map with three connected event locations."
---

## What was it about?

OK Lab Flensburg developed a dedicated event map for Flensburg Culture Night on 14 September 2024. It connected participating cultural venues with information about their activities. Visitors could see where the locations were across the city and explore individual stops in more detail.

Detail views linked venues and addresses to programme descriptions, opening or event times and further links where recorded. The programme included different forms of cultural participation, such as theatre, concerts, behind-the-scenes visits and hands-on activities.

## Why was the map created?

A culture night takes place across many locations. The map added a geographic overview to the programme and made venues visible even to visitors who did not know them already. It helped people orient themselves among the participating places and showed the variety of Flensburg’s cultural life.

## Data and technology

The source code explicitly loads the Culture Night 2024 dataset. The repository contains event records as CSV and GeoJSON, together with a Python conversion tool. The map interface uses JavaScript and Leaflet over an OpenStreetMap background.

The project is completed. The preserved map and code document that edition of the event; they are neither a current calendar nor an announcement of another Culture Night. For anyone considering reuse, the repository shows how location and programme records were brought together for an event.
