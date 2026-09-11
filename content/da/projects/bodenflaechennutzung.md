---
title: "Bodenflächennutzung"
description: "En kortprototype om arealanvendelse i Tyskland: undersøg kommunernes arealandele med statistik fra 2019."
locale: "da"
slug: "bodenflaechennutzung"
translationKey: "bodenflaechennutzung"
status: "seeking-contributors"
featured: false
categories: ["environment"]
technologies: ["GIS", "Open Data"]
links: {"website": "https://bodennutzung.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-surface-map"}
source: "https://codefor.de/projekte/fl-open-surface-map/"

image: /images/projects/bodenflaechennutzung.svg
imageAlt: "Fire tydeligt adskilte områder viser vegetation, landbrug, vand og bebyggelse."
---

## Hvad handler det om?

Bodenflächennutzung viser statistiske oplysninger om den faktiske arealanvendelse på et interaktivt kort. Prototypen bruger kommunedata fra Tyskland og er dermed ikke begrænset til Slesvig-Holsten. Når du vælger en kommune, vises nøgletal for blandt andet skov, landbrug, trafik samt bebyggelses- og trafikarealer.

Det gør det muligt at undersøge forskelle mellem kommuner. Tallene beskriver arealandele for en kommune, ikke anvendelsen af hver enkelt grund. Det offentliggjorte datagrundlag vedrører 2019.

## Hvorfor findes projektet?

En stor statistiktabel er vanskelig at forstå geografisk. Kortet forbinder tallene med kommuneområder og gør regionale forskelle lettere at opdage. Det giver en visuel indgang for mennesker med interesse for landskab, bebyggelsesstruktur og kommunal arealanvendelse.

## Data og teknik

Repositoriet henviser til arealstatistikken for 2019 fra Statistische Ämter des Bundes og administrative områder fra BKG i udgaven VG5000, ligeledes fra 2019. Oplysningerne forbindes gennem den officielle kommunekode og bearbejdes til GeoJSON. Leaflet viser arealerne på et baggrundskort fra OpenStreetMap.

Kilderne beskriver løsningen som en første prototype. Flere filtre samt tilføjelse af kredsfrie byer og bystater er nævnt som mål for videreudvikling. Der loves derfor hverken fuld dækning af alle kommuner eller en aktuel arealplan.

## Vær med

Videreudvikling kan begynde med databehandling og tydelige forklaringer af nøgletallene. Beskriv i repositoriet, hvilken kommune, dataperiode eller visning dit forslag vedrører. Ved brug af nyere data bør det også dokumenteres, hvordan de passer til de anvendte geografiske grænser.
