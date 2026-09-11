---
title: "Open Data API"
description: "Open Data API gør kommunale og regionale data tilgængelige for egne kort, analyser og applikationer."
locale: "da"
slug: "open-data-api"
translationKey: "open-data-api"
status: "seeking-contributors"
featured: false
categories: ["infrastructure"]
technologies: ["Python", "FastAPI", "PostgreSQL", "ETL"]
links: {"website": "https://api.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-data-api"}
source: "https://codefor.de/projekte/fl-open-data-api/"
image: /images/projects/open-data-api.svg
imageAlt: "Tre åbne datamoduler er forbundet med fire ydre dataknudepunkter."
---

## Hvad handler det om?

Open Data API er OK Lab Flensburgs datagrænseflade. Den stiller offentlige oplysninger til rådighed, så programmer kan hente og behandle dem direkte. Fokus er på Flensborg og Slesvig-Holsten, men den geografiske dækning afhænger af det enkelte datatilbud.

Den nuværende kildekode registrerer blandt andet adgang til skoler, politistationer, kulturminder, biotoper, gadetræer og demografiske data. Der er også administrative data samt klima- og energidata. Brugseksemplerne viser eksempelvis, hvordan energianlæg kan findes via en identifikator eller en kommunekode, og hvordan kommuner kan slås op efter navn.

For udviklere er API'et et udgangspunkt for egne kort, hjemmesider og analyser. Hvis du først vil undersøge, hvilke oplysninger der findes, kan du åbne den tilknyttede interaktive dokumentation. Her beskrives de enkelte forespørgsler og deres parametre.

## Hvorfor findes projektet?

En offentliggjort tabel er ikke nødvendigvis nem at bruge i et program. Forskellige formater, geografiske inddelinger og separate downloads giver ekstra arbejde. API'et samler adgangen og gør bearbejdede data genanvendelige gennem dokumenterede grænseflader.

Det betyder, at projekter ikke behøver at udvikle den grundlæggende dataadgang fra bunden hver gang. Kommunale spørgsmål kan også undersøges med egne visualiseringer. Hvad data kan fortælle, afhænger stadig af kildens indhold, geografiske dækning og registreringstidspunkt. En fælles adgang gør ikke automatisk forskellige datasæt sammenlignelige.

## Data og teknik

Tjenesten bruger Python med FastAPI og en PostgreSQL-database med PostGIS til geografiske data. Importvejledningerne forbinder den eksempelvis med data fra Denkmalkarte og Sozialatlas. Repositoriet dokumenterer også andre importværktøjer og datamodeller.

API'et returnerer maskinlæsbare svar og beskriver sine grænseflader med OpenAPI. Dokumentationen hjælper derfor også ved opstart af et nyt projekt: Find først det relevante endepunkt og dets parametre, og integrér derefter de nødvendige data i din applikation.

## Vær med

Fejlrapporter, konkrete eksempler på forespørgsler og forslag til datatilbud kan oprettes som issues i det tilknyttede repository. Angiv gerne de anvendte parametre og det forventede resultat. Bedre importværktøjer og dokumentation gør det også lettere for andre at genbruge data.
