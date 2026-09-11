---
title: "Digitale Denkmalkarte"
description: "Find kulturminder i Slesvig-Holsten på kortet, og læs beskrivelser, objektoplysninger og registreret beskyttelsesomfang."
locale: "da"
slug: "denkmalkarte"
translationKey: "denkmalkarte"
status: "seeking-contributors"
featured: false
categories: ["culture"]
technologies: ["Leaflet", "PostGIS", "Open Data"]
links: {"website": "https://denkmalkarte.oklabflensburg.de", "github": "https://github.com/oklabflensburg/open-monuments-map"}
source: "https://codefor.de/projekte/fl-open-monuments-map/"

image: /images/projects/denkmalkarte.svg
imageAlt: "En historisk dobbeltfacade med gavle, vinduer og en fælles portbue."
---

## Hvad handler det om?

Digitale Denkmalkarte gør kulturminder i Slesvig-Holsten søgbare gennem et interaktivt kort. Du kan udforske et område og vælge en markør for at åbne oplysninger om det enkelte objekt. Når kortet flyttes, indlæses flere placeringer i det synlige område.

Oplysningerne omfatter, hvor de findes, adresse, objektnummer, beskrivelse, type og beskyttelsesomfang. Kortet er en indgang for mennesker med interesse for bygningskultur, lokalhistorie eller en bestemt bygning. Det er udviklet af frivillige i OK Lab Flensburg, mens de faglige kulturmindedata kommer fra den ansvarlige delstatsmyndighed.

## Hvorfor findes projektet?

Udgangspunktet var at forbinde oplysninger fra kulturmindelister med de bygninger, man møder i hverdagen. Tidligt i projektet blev listeposter suppleret med koordinater. Den nuværende kode behandler også geometrier og henter objektdata gennem Open Data API.

Kortet giver dermed en geografisk indgang til et fagligt register. Det gør det lettere at opdage steder og læse om dem, men afgør ikke selv, om en bygning er et beskyttet kulturminde.

## Data og teknik

Kilden er Landesamt für Denkmalpflege Schleswig-Holstein, som offentliggør data gennem delstatens åbne dataportal. Repositoriet indeholder importværktøjer til kulturminder og geometrier samt en Leaflet-brugerflade. PostgreSQL/PostGIS bruges til geografisk databehandling.

Den ældre README-overskrift nævner stadig Flensborg, mens projektbeskrivelsen og den nuværende datastruktur omfatter flere dele af Slesvig-Holsten. Aktualiteten afhænger af de enkelte datas registreringstidspunkt.

## Vær med

Du kan dokumentere forkert placerede markører, uklare beskrivelser eller problemer med at åbne et objekt i repositoriet. Angiv helst objektnummer, sted og kilde, så andre kan undersøge din tilbagemelding.
