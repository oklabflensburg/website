---
title: "kulturbytes"
description: "Discover cultural events and venues: kulturbytes combines searchable listings with a shared platform for organisers."
locale: "en"
slug: "kulturbytes"
translationKey: "kulturbytes"
status: "development"
featured: true
featuredOrder: 1
categories: ["culture"]
technologies: ["Nuxt", "Vue", "TypeScript"]
links: {"website": "https://kulturbytes.de", "github": "https://github.com/sndcds/kulturbytes-client"}
source: "https://codefor.de/projekte/fl-kulturbytes/"
image: /images/projects/kulturbytes.svg
imageAlt: "An event ticket with notched sides and a geometric cultural star."
---

## What is it about?

kulturbytes is a cultural events and venues platform that originated at OK Lab Flensburg. It brings together listings from institutions, initiatives, projects and independent cultural practitioners. Visitors can discover events, while organisers gain a shared platform where their activities can become visible.

Searches can be narrowed by category, event type, genre, date and place. The client documentation also describes radius-based searching. Event views bring together information about individual listings, while venue pages and a map offer another way to explore. You can start with an interest or a place when looking for an event.

The application is multilingual, with German, Danish and English interface text. Its roots are in Flensburg, but its place and region selection is not restricted to the city. The events you can find depend on the listings actually published.

## Why does it exist?

Cultural information is often spread across many separate websites. Finding an overview can require knowing the relevant institutions already. A shared search can also surface activities you would not have known to look for.

kulturbytes explicitly includes smaller institutions, associations, initiatives and independent cultural practitioners. It aims to give them digital visibility alongside larger cultural institutions. The project description states that using the platform is free both for visitors and for cultural actors publishing their activities.

## Data and technology

Information is supplied through the KulturBytes API, also referred to as the Uranus API. The linked client uses Nuxt, Vue and TypeScript, with MapLibre included in the current code for maps. Events and venues are processed as structured records and made accessible through different views.

The public interface, content administration and backend are separate parts of the project. Describing the client therefore does not imply that every administrative function is available directly on the public website.

## Help improve it

You can test event pages and filters, report unclear information or contribute translations, documentation and code. When giving feedback, identify the listing or search involved as precisely as possible. The linked repository provides a starting point for development contributions.
