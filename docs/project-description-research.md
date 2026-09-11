# Project descriptions: source and editorial audit

Research date: 2026-09-11. Scope: the 19 existing projects in `content/{de,da,en}/projects/`, 57 Markdown records. No project was added. Open Data Day appears on Code for Germany but is not a project entry in this website, so it was not added to this collection.

## Initial audit

All three languages had matching project sets. Eighteen pages repeated a summary, generic participation text and a source/status paragraph; the completed Kulturnacht page contained one sentence. `app/pages/projekte/[slug].vue` already renders the Content body and metadata links. The existing collection, schemas, routes, translation index and SEO owners are unchanged.

## Sources and reconciliation

The [Code for Germany Flensburg page](https://codefor.de/flensburg/) and each linked project article were read alongside repository descriptions, READMEs and file trees. The [organisation repository listing](https://github.com/orgs/oklabflensburg/repositories) was checked for exact matches. All 19 existing GitHub links are strong matches; none is unmatched. Repository references below pin the inspected revision. The observations are editorial research notes, not a second Content source.

### badestellenkarte

[Repository snapshot](https://github.com/oklabflensburg/open-bath-map/tree/6b9116e5936eefa3acb2b1988871eea4de52c99f) · [README](https://github.com/oklabflensburg/open-bath-map/blob/6b9116e5936eefa3acb2b1988871eea4de52c99f/README.md) · [Code for Germany](https://codefor.de/projekte/fl-open-bath-map/)

README and source_queries.toml: bathing-site master records, classification, facilities, season and measurements; additional waterside tourism POIs; Nuxt/Leaflet and FastAPI. PostgreSQL is optional.

Additional inspected files: [backend/app/services/opendata/source_queries.toml](https://github.com/oklabflensburg/open-bath-map/blob/6b9116e5936eefa3acb2b1988871eea4de52c99f/backend/app/services/opendata/source_queries.toml).

### bildungsatlas

[Repository snapshot](https://github.com/oklabflensburg/open-school-map/tree/b8fbaf74d5cddef121ded82ce5192b56e2d28cbe) · [README](https://github.com/oklabflensburg/open-school-map/blob/b8fbaf74d5cddef121ded82ce5192b56e2d28cbe/README.md) · [Code for Germany](https://codefor.de/projekte/fl-open-school-map/)

README and SchoolMapPage.vue: now schools across Schleswig-Holstein, school-type filter, location search, details and school API. Code for Germany explains the Flensburg origin and school directories. Schoolyard analysis remains an older proposal.

Additional inspected files: [app/components/SchoolMapPage.vue](https://github.com/oklabflensburg/open-school-map/blob/b8fbaf74d5cddef121ded82ce5192b56e2d28cbe/app/components/SchoolMapPage.vue).

### biotopkarte

[Repository snapshot](https://github.com/oklabflensburg/open-biotope-map/tree/c9b585daed6e466c56cb47c28dd21c8d2f4b2d19) · [README](https://github.com/oklabflensburg/open-biotope-map/blob/c9b585daed6e466c56cb47c28dd21c8d2f4b2d19/README.md) · [Code for Germany](https://codefor.de/projekte/fl-open-biotope-map/)

README and src/main.js: LfU biotope survey, unofficial map, valuable/non-valuable classification and optional FFH habitat details. Survey coverage 2014–2020 is not a claim of current field conditions. Hamburg import tooling does not redefine this page’s Schleswig-Holstein focus.

Additional inspected files: [package.json](https://github.com/oklabflensburg/open-biotope-map/blob/c9b585daed6e466c56cb47c28dd21c8d2f4b2d19/package.json), [src/main.js](https://github.com/oklabflensburg/open-biotope-map/blob/c9b585daed6e466c56cb47c28dd21c8d2f4b2d19/src/main.js).

### bodenflaechennutzung

[Repository snapshot](https://github.com/oklabflensburg/open-surface-map/tree/222b4aa3bb44753e3d16d3637cd0ed4c7dcf072e) · [README](https://github.com/oklabflensburg/open-surface-map/blob/222b4aa3bb44753e3d16d3637cd0ed4c7dcf072e/README.md) · [Code for Germany](https://codefor.de/projekte/fl-open-surface-map/)

README, index.html and main.js: Germany-wide 2019 land-use statistics joined to BKG VG5000 2019 boundaries; municipality selection. Previous summary incorrectly restricted coverage to Schleswig-Holstein. Extra filters/independent cities/city-states remain proposals.

Additional inspected files: [index.html](https://github.com/oklabflensburg/open-surface-map/blob/222b4aa3bb44753e3d16d3637cd0ed4c7dcf072e/index.html), [main.js](https://github.com/oklabflensburg/open-surface-map/blob/222b4aa3bb44753e3d16d3637cd0ed4c7dcf072e/main.js).

### denkmalkarte

[Repository snapshot](https://github.com/oklabflensburg/open-monuments-map/tree/fd1532b4e496fd5d67fa8791c672da143199cdd4) · [README](https://github.com/oklabflensburg/open-monuments-map/blob/fd1532b4e496fd5d67fa8791c672da143199cdd4/README.md) · [Code for Germany](https://codefor.de/projekte/fl-open-monuments-map/)

README, src/main.js, package.json and importer: state heritage authority, bounds/detail API, descriptions and protection scope. Old Flensburg heading and coordinate-enrichment origin do not limit today’s state-wide scope. No weekly refresh guarantee repeated.

Additional inspected files: [package.json](https://github.com/oklabflensburg/open-monuments-map/blob/fd1532b4e496fd5d67fa8791c672da143199cdd4/package.json), [src/main.js](https://github.com/oklabflensburg/open-monuments-map/blob/fd1532b4e496fd5d67fa8791c672da143199cdd4/src/main.js), [tools/insert_monuments.py](https://github.com/oklabflensburg/open-monuments-map/blob/fd1532b4e496fd5d67fa8791c672da143199cdd4/tools/insert_monuments.py).

### flurstuecksauskunft

[Repository snapshot](https://github.com/oklabflensburg/open-parcel-map/tree/ae23a525e8fd886a0181600d1819040732d2e265) · [README](https://github.com/oklabflensburg/open-parcel-map/blob/ae23a525e8fd886a0181600d1819040732d2e265/README.md) · [Code for Germany](https://codefor.de/projekte/fl-open-parcel-map/)

README, src/main.js and package.json: unofficial ALKIS parcel information without owners, Leaflet, point query, PostGIS; Atom feed supersedes old download client. OSM is background, not the parcel source.

Additional inspected files: [package.json](https://github.com/oklabflensburg/open-parcel-map/blob/ae23a525e8fd886a0181600d1819040732d2e265/package.json), [src/main.js](https://github.com/oklabflensburg/open-parcel-map/blob/ae23a525e8fd886a0181600d1819040732d2e265/src/main.js).

### kitafinder

[Repository snapshot](https://github.com/oklabflensburg/open-kita-map/tree/bc16cd2820d46c493c921404038ecae8011593bf) · [README](https://github.com/oklabflensburg/open-kita-map/blob/bc16cd2820d46c493c921404038ecae8011593bf/README.md) · [Code for Germany](https://codefor.de/projekte/fl-open-kita-map/)

README, src/main.js and package.json: Schleswig-Holstein open-data Kita records plus city list, recorded contact/care details, Leaflet and basemap.de. Capacity is not current vacancy information.

Additional inspected files: [package.json](https://github.com/oklabflensburg/open-kita-map/blob/bc16cd2820d46c493c921404038ecae8011593bf/package.json), [src/main.js](https://github.com/oklabflensburg/open-kita-map/blob/bc16cd2820d46c493c921404038ecae8011593bf/src/main.js).

### kulturbytes

[Repository snapshot](https://github.com/sndcds/kulturbytes-client/tree/e6de57e5773adf5b44e34e14c6b822c07689a7d6) · [README](https://github.com/sndcds/kulturbytes-client/blob/e6de57e5773adf5b44e34e14c6b822c07689a7d6/README.md) · [Code for Germany](https://codefor.de/projekte/fl-kulturbytes/)

Client README, package.json, about/de.html, event filters and venue page: event discovery, categories/types/genres/dates/place/radius, DE/DA/EN UI, venues, Nuxt/Vue/TypeScript and MapLibre. Code for Germany corroborates publishing purpose and smaller cultural actors. Existing sndcds repository is the correct match; no replacement with an unrelated organisation repository. No ticketing, automated imports or social-publishing claims added.

Additional inspected files: [app/assets/about/de.html](https://github.com/sndcds/kulturbytes-client/blob/e6de57e5773adf5b44e34e14c6b822c07689a7d6/app/assets/about/de.html), [app/components/filters/EventFilters.vue](https://github.com/sndcds/kulturbytes-client/blob/e6de57e5773adf5b44e34e14c6b822c07689a7d6/app/components/filters/EventFilters.vue), [app/pages/venue/[venue_identifier].vue](https://github.com/sndcds/kulturbytes-client/blob/e6de57e5773adf5b44e34e14c6b822c07689a7d6/app/pages/venue/%5Bvenue_identifier%5D.vue), [package.json](https://github.com/sndcds/kulturbytes-client/blob/e6de57e5773adf5b44e34e14c6b822c07689a7d6/package.json).

### kulturnacht-karte

[Repository snapshot](https://github.com/oklabflensburg/open-cultural-map/tree/d180ead40cc12cc7d597f615f838f9dc63afa51f) · [README](https://github.com/oklabflensburg/open-cultural-map/blob/d180ead40cc12cc7d597f615f838f9dc63afa51f/README.md) · [Code for Germany](https://codefor.de/projekte/fl-open-cultural-map/)

README, src/main.js and package.json: specifically the 14 September 2024 event; loaded file is kulturnacht-flensburg-2024.geojson. CSV conversion, venues, programme and times verified. Completed event status preserved despite generic current repository description and beta README language. No active recruitment section.

Additional inspected files: [package.json](https://github.com/oklabflensburg/open-cultural-map/blob/d180ead40cc12cc7d597f615f838f9dc63afa51f/package.json), [src/main.js](https://github.com/oklabflensburg/open-cultural-map/blob/d180ead40cc12cc7d597f615f838f9dc63afa51f/src/main.js).

### nahverkehrskarte

[Repository snapshot](https://github.com/oklabflensburg/open-transport-map/tree/1aa4ec1f8ad93597c1f44e05f997e92f90528d51) · [README](https://github.com/oklabflensburg/open-transport-map/blob/1aa4ec1f8ad93597c1f44e05f997e92f90528d51/README.md) · [Code for Germany](https://codefor.de/projekte/fl-open-transport-map/)

README and main.js: 2023-labelled prototype loads static routes, platforms and district GeoJSON from OSM context. No real-time departures, journey planner or completed population/accessibility analysis claimed. Older criticism of transport operators omitted.

Additional inspected files: [main.js](https://github.com/oklabflensburg/open-transport-map/blob/1aa4ec1f8ad93597c1f44e05f997e92f90528d51/main.js).

### notfallkarte

[Repository snapshot](https://github.com/oklabflensburg/open-emergency-map/tree/083e6e9abf8661908c2a545ba0ed693ab0115e08) · [README](https://github.com/oklabflensburg/open-emergency-map/blob/083e6e9abf8661908c2a545ba0ed693ab0115e08/README.md) · [Code for Germany](https://codefor.de/projekte/fl-open-emergency-map/)

README, src/main.js and package.json: police stations only; state police dataset, bounds/radius/detail API, Leaflet/OSM. Code for Germany supplies the missing working website URL. No annual refresh guarantee repeated.

Additional inspected files: [package.json](https://github.com/oklabflensburg/open-emergency-map/blob/083e6e9abf8661908c2a545ba0ed693ab0115e08/package.json), [src/main.js](https://github.com/oklabflensburg/open-emergency-map/blob/083e6e9abf8661908c2a545ba0ed693ab0115e08/src/main.js).

### open-city-planner

[Repository snapshot](https://github.com/oklabflensburg/open-city-planner/tree/2238e18e50348b04fcbbd4057e2dcbbd34ffa40c) · [README](https://github.com/oklabflensburg/open-city-planner/blob/2238e18e50348b04fcbbd4057e2dcbbd34ffa40c/README.md)

README, frontend/package.json, docs/osm-data.md and docs/flensburg-statistics.md: self-hostable WebGIS, Flensburg reference, area selection/comparison, saved polygons, public reading, Nuxt/MapLibre/FastAPI/PostGIS. Zahlenspiegel statistics and OSM boundary caveat preserved. No Code for Germany project entry found; not conflated with individual maps or open-area-map.

Additional inspected files: [docs/flensburg-statistics.md](https://github.com/oklabflensburg/open-city-planner/blob/2238e18e50348b04fcbbd4057e2dcbbd34ffa40c/docs/flensburg-statistics.md), [docs/osm-data.md](https://github.com/oklabflensburg/open-city-planner/blob/2238e18e50348b04fcbbd4057e2dcbbd34ffa40c/docs/osm-data.md), [frontend/package.json](https://github.com/oklabflensburg/open-city-planner/blob/2238e18e50348b04fcbbd4057e2dcbbd34ffa40c/frontend/package.json).

### open-data-api

[Repository snapshot](https://github.com/oklabflensburg/open-data-api/tree/4c0fdfee5d86980afe791105af3c167fa608058f) · [README](https://github.com/oklabflensburg/open-data-api/blob/4c0fdfee5d86980afe791105af3c167fa608058f/README.md) · [Code for Germany](https://codefor.de/projekte/fl-open-data-api/)

README, SETUP.md, USAGE.md, app/main.py and school router: FastAPI/PostGIS, registered subject APIs, OpenAPI docs, imports and actual request examples. Coverage depends on dataset; no universal freshness or availability claim.

Additional inspected files: [SETUP.md](https://github.com/oklabflensburg/open-data-api/blob/4c0fdfee5d86980afe791105af3c167fa608058f/SETUP.md), [USAGE.md](https://github.com/oklabflensburg/open-data-api/blob/4c0fdfee5d86980afe791105af3c167fa608058f/USAGE.md), [app/api/school.py](https://github.com/oklabflensburg/open-data-api/blob/4c0fdfee5d86980afe791105af3c167fa608058f/app/api/school.py), [app/main.py](https://github.com/oklabflensburg/open-data-api/blob/4c0fdfee5d86980afe791105af3c167fa608058f/app/main.py).

### recyclingcontainerkarte

[Repository snapshot](https://github.com/oklabflensburg/open-recycling-map/tree/33cdf60b249b642855e871467f1ea5e5a6928f54) · [README](https://github.com/oklabflensburg/open-recycling-map/blob/33cdf60b249b642855e871467f1ea5e5a6928f54/README.md) · [Code for Germany](https://codefor.de/projekte/fl-open-recycling-map/)

README and main.js: TBZ glass/textile container data on municipal land, district selection and location details, GeoJSON/Leaflet/OSM. Private providers and photographs not claimed as complete.

Additional inspected files: [main.js](https://github.com/oklabflensburg/open-recycling-map/blob/33cdf60b249b642855e871467f1ea5e5a6928f54/main.js).

### sozialatlas

[Repository snapshot](https://github.com/oklabflensburg/open-social-map/tree/51aacf7afcd4c326076e4aa5829812d0b5c10830) · [README](https://github.com/oklabflensburg/open-social-map/blob/51aacf7afcd4c326076e4aa5829812d0b5c10830/README.md) · [Code for Germany](https://codefor.de/projekte/fl-open-social-map/)

README, src/app.js, src/appModel.js and wiki/TABLES.md: municipal report (2022 explicitly documented), 13 districts, statistical office geometries, prototype dashboard and indicators. Distinguishes current district-selection dashboard from older map-first description. No claim that every new annual report is imported.

Additional inspected files: [package.json](https://github.com/oklabflensburg/open-social-map/blob/51aacf7afcd4c326076e4aa5829812d0b5c10830/package.json), [src/app.js](https://github.com/oklabflensburg/open-social-map/blob/51aacf7afcd4c326076e4aa5829812d0b5c10830/src/app.js), [src/appModel.js](https://github.com/oklabflensburg/open-social-map/blob/51aacf7afcd4c326076e4aa5829812d0b5c10830/src/appModel.js), [wiki/TABLES.md](https://github.com/oklabflensburg/open-social-map/blob/51aacf7afcd4c326076e4aa5829812d0b5c10830/wiki/TABLES.md).

### spielplatzkarte

[Repository snapshot](https://github.com/oklabflensburg/open-playgrounds-map/tree/56d06ff5ae4e3628f1110b8bf220434a9821877a) · [README](https://github.com/oklabflensburg/open-playgrounds-map/blob/56d06ff5ae4e3628f1110b8bf220434a9821877a/README.md) · [Code for Germany](https://codefor.de/projekte/fl-open-playgrounds-map/)

README, main.js and MapComponent.vue: city PDF and TBZ playground records, Python conversion to GeoJSON, Leaflet/OSM. Does not transfer the organisation repository’s generic OSM description to the playground inventory’s provenance.

Additional inspected files: [main.js](https://github.com/oklabflensburg/open-playgrounds-map/blob/56d06ff5ae4e3628f1110b8bf220434a9821877a/main.js), [playgrounds-nuxt/components/MapComponent.vue](https://github.com/oklabflensburg/open-playgrounds-map/blob/56d06ff5ae4e3628f1110b8bf220434a9821877a/playgrounds-nuxt/components/MapComponent.vue).

### strassenbaeume

[Repository snapshot](https://github.com/oklabflensburg/open-trees-map/tree/7fcfa48bc42b63474b7e75b842bf6980c2aeff22) · [README](https://github.com/oklabflensburg/open-trees-map/blob/7fcfa48bc42b63474b7e75b842bf6980c2aeff22/README.md) · [Code for Germany](https://codefor.de/projekte/fl-open-trees-map/)

README, src/main.js and package.json: TBZ inventory, identifiers, genus/species/variety, district selection and imports. Original source lacks height/crown diameter/planting year; optional later fields do not establish complete coverage. Climate suitability and sponsorships not promoted as existing functionality.

Additional inspected files: [package.json](https://github.com/oklabflensburg/open-trees-map/blob/7fcfa48bc42b63474b7e75b842bf6980c2aeff22/package.json), [src/main.js](https://github.com/oklabflensburg/open-trees-map/blob/7fcfa48bc42b63474b7e75b842bf6980c2aeff22/src/main.js).

### unfallkarte

[Repository snapshot](https://github.com/oklabflensburg/open-accident-map/tree/8dbeae1c8e114f80953ec152f6e52b2857b7b6b0) · [README](https://github.com/oklabflensburg/open-accident-map/blob/8dbeae1c8e114f80953ec152f6e52b2857b7b6b0/README.md) · [Code for Germany](https://codefor.de/projekte/fl-open-accident-map/)

README, AccidentMap.client.vue and FilterPanel.vue: Flensburg injury accidents, 2016–2024, district/type/circumstance/year filters, Nuxt/Leaflet. Current component fetches Open Data API, contrary to README passage claiming bundled frontend data; bundled files described only as examples. Statistical offices and BKG acknowledged.

Additional inspected files: [app/components/AccidentMap.client.vue](https://github.com/oklabflensburg/open-accident-map/blob/8dbeae1c8e114f80953ec152f6e52b2857b7b6b0/app/components/AccidentMap.client.vue), [app/components/FilterPanel.vue](https://github.com/oklabflensburg/open-accident-map/blob/8dbeae1c8e114f80953ec152f6e52b2857b7b6b0/app/components/FilterPanel.vue).

### wohnort-kompass

[Repository snapshot](https://github.com/oklabflensburg/open-living-map/tree/c8bd9e5a1114f4015a6721432ffca1fac4594437) · [README](https://github.com/oklabflensburg/open-living-map/blob/c8bd9e5a1114f4015a6721432ffca1fac4594437/README.md) · [Code for Germany](https://codefor.de/projekte/fl-open-living-map/)

README and frontend/pages/methodik.vue: Germany-wide municipal comparison, seven categories, personal weights and up to three places; BKG, Destatis, DWD, UBA, Unfallatlas, OSM and GTFS. Missing coverage is not zero; station assignment and proxy limitations retained.

Additional inspected files: [frontend/pages/methodik.vue](https://github.com/oklabflensburg/open-living-map/blob/c8bd9e5a1114f4015a6721432ffca1fac4594437/frontend/pages/methodik.vue).

## Metadata changes

- All summaries were rewritten to describe the actual purpose and geographic scope. The Bodenflächennutzung summary now identifies Germany and the 2019 reference period; Bildungsatlas explicitly covers Schleswig-Holstein.
- Sozialatlas website: `https://dev.sozialatlas-flensburg.de` could not be reached. Replaced with the repository-linked `https://dev.sozialatlas.oklabflensburg.de`, verified HTTP 200.
- Notfallkarte: added the previously absent website link `https://notfallkarte.oklabflensburg.de`, linked by Code for Germany and verified HTTP 200.
- Denkmalkarte technology: `MapLibre` → `Leaflet`, verified in imports and package metadata.
- Flurstücksauskunft technology: `OpenLayers` → `Leaflet`, verified in imports and package metadata.
- Every correction is identical in DE/DA/EN. Titles, slugs, translation keys, statuses, images, aliases, repository URLs, source URLs and all other metadata remain unchanged.

## Link checks and editorial limits

All 19 final website URLs returned HTTP 200 on the research date (including the API redirect to `/docs` and Kulturbytes redirect to `/de`). This verifies link reachability, not every feature or dataset of those external services. All existing source links remain available through the detail-page metadata components.

The articles are original rewrites, with matching factual scope across DE/DA/EN. A nine-word overlap check against the German source texts found only the official police dataset name together with its portal attribution. No long source passages were copied. Human language review, particularly Danish terminology, remains advisable. Project status fields retain their previous editorial assessment; this research does not certify current maintenance or refresh schedules.

## Validation and screenshots

Local validation on Node 22.22.3 / pnpm 12.3.4:

- `pnpm install --frozen-lockfile`: passed; existing dependencies satisfied the lockfile.
- `pnpm peers check`: passed, no peer issues.
- `pnpm lint`: passed.
- `pnpm typecheck`: passed.
- `pnpm test`: 93 passed.
- `pnpm build`: passed with Nitro `node-server`; brand generation ran automatically and produced no asset changes. Nuxt’s dependency code emitted an unused H3 import warning.
- `pnpm test:e2e`: 50 passed, six intentional configuration-specific skips. The sandboxed server could not start; the successful run used the approved unrestricted local execution.
- Frontmatter diff audit: all 57 records preserve metadata except descriptions and the four documented corrections.
- Documentation local links and `git diff --check`: passed.

The skips cover a mobile-only menu check on desktop, desktop-only server/configuration checks on mobile, tablet navigation on mobile, and the mobile duplicate of narrow/zoom-equivalent reflow coverage. Reflow tests cover 320 CSS px and 720 CSS px (equivalent layout width to a 1440 px window at 200% zoom), not a claim of manually changing browser zoom.

Visual review covered all 30 representative detail captures at 1440/390 px, plus the six standard German routes at both widths. Paragraphs, section headings, complete signets and metadata links remain readable and reflow without clipping. Only home/project-index overview images changed; the other standard captures remained identical.

 Browser coverage visits every project in all three languages on desktop and mobile, checks server-rendered article text, metadata, reciprocal hreflang, project/source links, images and overflow. Representative map, API, cultural, completed and WebGIS articles receive axe checks and screenshots in both viewport sizes.
