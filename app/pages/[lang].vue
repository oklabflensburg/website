<script setup lang="ts">
type Lang = 'de' | 'da' | 'en'
const route = useRoute()
const menuOpen = ref(false)
const langs: Lang[] = ['de', 'da', 'en']
const lang = computed<Lang>(() => langs.includes(route.params.lang as Lang) ? route.params.lang as Lang : 'de')

const copy = {
  de: {
    nav: ['Projekte', 'Technologien', 'Offene Aufgaben', 'Mitmachen', 'Über uns'],
    eyebrow: 'Open GIS · Open Data · Open Source',
    hero: 'Baue mit uns die offene Geodaten-Infrastruktur der Region.',
    intro: 'Wir entwickeln freie GIS-Anwendungen, räumliche Datenbanken und offene Schnittstellen für Flensburg und Schleswig-Holstein – ehrenamtlich, gemeinsam und öffentlich auf GitHub.',
    find: 'Passende Aufgabe finden', explore: 'GIS-Projekte entdecken', join: 'Jetzt mitmachen',
    ways: 'Wo möchtest du einsteigen?', waysIntro: 'Bring Erfahrung mit oder lerne gemeinsam mit uns. Wir schneiden den Einstieg passend zu deinem Kenntnisstand zu.',
    wayCards: [
      ['map-pinned', 'WebGIS entwickeln', 'Interaktive Karten, MapLibre, Vektorkacheln und räumliche Werkzeuge.'],
      ['database', 'Geodaten modellieren', 'PostgreSQL, PostGIS, räumliche Abfragen, Indizes und Migrationen.'],
      ['workflow', 'Daten zugänglich machen', 'Importpipelines, Datenqualität, FastAPI und offene Schnittstellen.'],
    ],
    flagship: 'Leuchtturmprojekt', ocp: 'Ein modulares Open-Source-WebGIS zum Erkunden, Zeichnen und Analysieren urbaner Räume. Hilf uns, daraus eine wiederverwendbare Plattform für Städte und Regionen zu machen.',
    projects: 'Offene Projekte mit echtem Nutzen', projectsIntro: 'Unsere Anwendungen entstehen aus konkreten Fragen der Region. Quellcode, Datenwege und offene Aufgaben sind nachvollziehbar.',
    volunteer: 'Digitales Ehrenamt', volunteerTitle: 'Dein Code kann vor Ort etwas bewegen.', volunteerText: 'Teile Fähigkeiten, lerne mit anderen und schaffe freie Werkzeuge. Du entscheidest selbst, wie viel Zeit du einbringst – regelmäßig, für ein einzelnes Issue oder bei einem offenen Treffen.',
    benefits: ['Begleitete Good-First-Issues', 'Beiträge vor Ort oder remote', 'Freie Software und offene Daten', 'Deutsch, Dänisch und Englisch'],
    tasks: 'Aktuelle Einstiegsmöglichkeiten', tasksIntro: 'Kleine, klar umrissene Aufgaben mit Ansprechperson und realistischem Zeitaufwand.',
    meeting: 'Komm beim nächsten Lab-Treffen vorbei.', meetingInfo: 'Mittwoch, 18:00–21:00 Uhr · Aktivitetshuset, Norderstraße 49, Flensburg', save: 'Termin speichern',
    network: 'Teil von Code for Germany', networkText: 'Das OK Lab Flensburg ist Teil des deutschlandweiten Netzwerks für offene Daten, Civic Tech und gemeinwohlorientierte Digitalisierung.',
  },
  da: {
    nav: ['Projekter', 'Teknologier', 'Åbne opgaver', 'Deltag', 'Om os'],
    eyebrow: 'Open GIS · Open Data · Open Source', hero: 'Vær med til at bygge regionens åbne geodatainfrastruktur.',
    intro: 'Vi udvikler frie GIS-applikationer, geografiske databaser og åbne grænseflader for Flensborg og Slesvig-Holsten – frivilligt, sammen og offentligt på GitHub.',
    find: 'Find en passende opgave', explore: 'Se GIS-projekter', join: 'Deltag nu',
    ways: 'Hvor vil du begynde?', waysIntro: 'Brug din erfaring, eller lær sammen med os. Vi tilpasser starten til dit niveau.',
    wayCards: [['map-pinned','Udvikl WebGIS','Interaktive kort, MapLibre, vektorfliser og geografiske værktøjer.'],['database','Modellér geodata','PostgreSQL, PostGIS, rumlige forespørgsler, indeks og migrationer.'],['workflow','Gør data tilgængelige','Importprocesser, datakvalitet, FastAPI og åbne grænseflader.']],
    flagship: 'Fyrtårnsprojekt', ocp: 'Et modulært open source-WebGIS til at udforske, tegne og analysere byområder. Hjælp os med at skabe en genanvendelig platform for byer og regioner.',
    projects: 'Åbne projekter med reel nytte', projectsIntro: 'Vores løsninger udspringer af konkrete spørgsmål i regionen. Kode, dataveje og åbne opgaver er gennemsigtige.',
    volunteer: 'Digitalt frivilligt arbejde', volunteerTitle: 'Din kode kan gøre en forskel lokalt.', volunteerText: 'Del dine færdigheder, lær med andre og skab frie værktøjer. Du bestemmer selv, hvor meget tid du vil bidrage med.',
    benefits: ['Guidede good-first-issues','Bidrag lokalt eller remote','Fri software og åbne data','Tysk, dansk og engelsk'],
    tasks: 'Aktuelle begyndermuligheder', tasksIntro: 'Små, tydelige opgaver med kontaktperson og realistisk tidsforbrug.',
    meeting: 'Kom til næste åbne labmøde.', meetingInfo: 'Onsdag kl. 18–21 · Aktivitetshuset, Norderstraße 49, Flensborg', save: 'Gem aftalen',
    network: 'En del af Code for Germany', networkText: 'OK Lab Flensburg er en del af det landsdækkende netværk for åbne data, civic tech og digitalisering for fællesskabet.',
  },
  en: {
    nav: ['Projects', 'Technologies', 'Open tasks', 'Contribute', 'About us'],
    eyebrow: 'Open GIS · Open Data · Open Source', hero: 'Help us build the region’s open geodata infrastructure.',
    intro: 'We develop free GIS applications, spatial databases and open interfaces for Flensburg and Schleswig-Holstein – voluntarily, collaboratively and in public on GitHub.',
    find: 'Find a suitable task', explore: 'Explore GIS projects', join: 'Contribute now',
    ways: 'Where would you like to start?', waysIntro: 'Bring your experience or learn with us. We tailor your first contribution to your level.',
    wayCards: [['map-pinned','Build WebGIS','Interactive maps, MapLibre, vector tiles and spatial tools.'],['database','Model geodata','PostgreSQL, PostGIS, spatial queries, indexes and migrations.'],['workflow','Open up data','Import pipelines, data quality, FastAPI and open interfaces.']],
    flagship: 'Flagship project', ocp: 'A modular open-source WebGIS for exploring, drawing and analysing urban areas. Help us turn it into a reusable platform for cities and regions.',
    projects: 'Open projects with real impact', projectsIntro: 'Our applications grow from concrete regional questions. Source code, data flows and open tasks are transparent.',
    volunteer: 'Digital volunteering', volunteerTitle: 'Your code can make a difference locally.', volunteerText: 'Share skills, learn with others and create free tools. You decide how much time to contribute – regularly, for one issue or at an open meetup.',
    benefits: ['Guided good-first issues','Contribute locally or remotely','Free software and open data','German, Danish and English'],
    tasks: 'Current ways to get started', tasksIntro: 'Small, clearly scoped tasks with a contact person and realistic time estimate.',
    meeting: 'Join our next open lab meetup.', meetingInfo: 'Wednesday, 6–9 pm · Aktivitetshuset, Norderstraße 49, Flensburg', save: 'Save the date',
    network: 'Part of Code for Germany', networkText: 'OK Lab Flensburg is part of the nationwide network for open data, civic tech and public-interest digitalisation.',
  },
} as const
const t = computed(() => copy[lang.value])

const projects = [
  { title: 'Open City Planner', area: 'Stadtentwicklung', color: 'border-code-blue', image: '', text: 'Urbanen Raum erkunden, Flächen zeichnen und räumliche Analysen durchführen.', url: 'https://stadtplaner.oklabflensburg.de/' },
  { title: 'Digitale Denkmalkarte', area: 'Kultur', color: 'border-code-coral', image: '/denkmalschutz-karte.webp', text: 'Kulturdenkmäler Schleswig-Holsteins auf einer freien Karte entdecken.', url: 'https://denkmalschutz-flensburg.de/' },
  { title: 'Flurstücksauskunft', area: 'Verwaltung', color: 'border-code-green', image: '/bodenflaeche-karte.webp', text: 'Nicht amtliche, interaktive Flurstücksinformationen für Schleswig-Holstein.', url: 'https://flurstuecksauskunft.oklabflensburg.de/' },
  { title: 'Bildungsatlas', area: 'Bildung', color: 'border-code-sky', image: '/bildungsatlas-karte.webp', text: 'Schulen und Bildungsangebote mithilfe offener Daten zugänglich machen.', url: '#' },
  { title: 'Sozialatlas', area: 'Gesellschaft', color: 'border-code-teal', image: '/sozialatlas-karte.webp', text: 'Soziale Daten als Grundlage für Planung und Zivilgesellschaft visualisieren.', url: '#' },
  { title: 'Straßenbäume', area: 'Umwelt', color: 'border-code-mint', image: '/baumkataster-karte.webp', text: 'Offene Baumdaten der Stadt Flensburg verständlich auf einer Karte zeigen.', url: '#' },
]

const tasks = [
  ['PostGIS-Abfrage für Gebietsanalyse erweitern', 'Open City Planner · 2–4 Stunden · Fortgeschritten'],
  ['Kommunalen Geodatensatz importieren', 'Open Data API · 2–3 Stunden · Einstieg'],
  ['MapLibre-Layer testen und dokumentieren', 'Open City Planner · 1–2 Stunden · Einstieg'],
  ['Räumlichen Index analysieren', 'PostGIS · 3–5 Stunden · Fortgeschritten'],
]

useHead(() => ({ htmlAttrs: { lang: lang.value }, title: `OK Lab Flensburg · ${t.value.eyebrow}` }))
</script>

<template>
  <div class="min-h-screen bg-paper text-ink">
    <header class="border-b border-black/10 bg-white">
      <div class="mx-auto flex min-h-20 max-w-7xl items-center gap-6 px-5 lg:px-8">
        <NuxtLink :to="`/${lang}`" class="mr-auto flex items-center gap-3 font-bold"><img src="/logos/codefor-flensburg.svg" alt="" class="h-15 w-13 object-contain"><span>OK Lab Flensburg</span></NuxtLink>
        <nav class="hidden items-center gap-6 text-sm lg:flex" aria-label="Hauptnavigation"><a v-for="(item, i) in t.nav" :key="item" :href="['#projects','#technologies','#tasks','#join','#about'][i]" class="hover:text-code-blue">{{ item }}</a></nav>
        <div class="hidden items-center gap-2 md:flex" aria-label="Sprachauswahl"><NuxtLink v-for="code in langs" :key="code" :to="`/${code}`" :aria-current="code === lang ? 'page' : undefined" class="px-2 py-2 text-xs font-bold uppercase" :class="code === lang ? 'text-code-blue' : 'text-ink/55'">{{ code }}</NuxtLink></div>
        <a href="#join" class="hidden rounded-lg bg-code-mint px-5 py-3 text-sm font-bold md:inline-flex">{{ t.join }}</a>
        <button class="grid size-11 place-items-center lg:hidden" :aria-expanded="menuOpen" aria-label="Menü öffnen" @click="menuOpen = !menuOpen"><Icon name="lucide:menu" size="22" /></button>
      </div>
      <nav v-if="menuOpen" class="border-t border-black/10 bg-white px-5 py-5 lg:hidden"><a v-for="(item, i) in t.nav" :key="item" :href="['#projects','#technologies','#tasks','#join','#about'][i]" class="block border-b border-black/8 py-3" @click="menuOpen=false">{{ item }}</a><div class="mt-3 flex gap-4"><NuxtLink v-for="code in langs" :key="code" :to="`/${code}`" class="py-2 font-bold uppercase">{{ code }}</NuxtLink></div></nav>
    </header>

    <main>
      <section class="relative isolate overflow-hidden py-20 sm:py-28">
        <div class="map-grid absolute inset-y-0 left-1/2 right-0 -z-10 opacity-80" />
        <div class="mx-auto max-w-7xl px-5 lg:px-8">
          <p class="mb-5 flex items-center gap-3 font-bold text-code-blue"><span class="h-0.5 w-9 bg-code-blue" />{{ t.eyebrow }}</p>
          <h1 class="max-w-5xl text-5xl font-extrabold leading-[1.02] tracking-[-0.045em] sm:text-7xl">{{ t.hero }}</h1>
          <p class="mt-7 max-w-3xl text-lg leading-8 text-ink/65">{{ t.intro }}</p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#tasks" class="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-code-mint px-6 font-bold">{{ t.find }} <Icon name="lucide:arrow-right" /></a><a href="#projects" class="inline-flex min-h-12 items-center justify-center rounded-lg border border-black/15 bg-white px-6 font-bold">{{ t.explore }}</a></div>
          <div class="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-ink/60"><span class="flex items-center gap-2"><Icon name="lucide:map" class="text-code-blue" /> GIS & OpenStreetMap</span><span class="flex items-center gap-2"><Icon name="lucide:database" class="text-code-blue" /> PostgreSQL & PostGIS</span><span class="flex items-center gap-2"><Icon name="lucide:users" class="text-code-blue" /> Vor Ort & remote</span></div>
        </div>
      </section>

      <section id="technologies" class="mx-auto max-w-7xl px-5 py-18 lg:px-8">
        <div class="mb-9 grid gap-4 md:grid-cols-2 md:items-end"><h2 class="text-4xl font-extrabold tracking-tight sm:text-5xl">{{ t.ways }}</h2><p class="max-w-xl text-ink/60 md:justify-self-end">{{ t.waysIntro }}</p></div>
        <div class="grid gap-4 md:grid-cols-3"><article v-for="card in t.wayCards" :key="card[1]" class="flex min-h-60 flex-col rounded-2xl border border-black/10 bg-white p-7"><Icon :name="`lucide:${card[0]}`" size="28" class="mb-10 text-code-blue" /><h3 class="text-xl font-bold">{{ card[1] }}</h3><p class="mt-3 text-ink/60">{{ card[2] }}</p><a href="#tasks" class="mt-auto pt-5 font-bold text-code-blue">{{ t.find }} →</a></article></div>
      </section>

      <section class="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div class="grid gap-10 overflow-hidden rounded-3xl bg-[#103b3a] p-7 text-white sm:p-10 lg:grid-cols-[1.1fr_.9fr]">
          <div><p class="mb-4 font-bold text-code-mint">{{ t.flagship }}</p><h2 class="text-4xl font-extrabold sm:text-5xl">Open City Planner</h2><p class="mt-5 max-w-2xl leading-7 text-white/70">{{ t.ocp }}</p><div class="my-7 flex flex-wrap gap-2"><span v-for="tag in ['PostGIS','FastAPI','Nuxt 4','MapLibre','OpenStreetMap']" :key="tag" class="rounded-full bg-white/10 px-3 py-2 text-sm">{{ tag }}</span></div><a href="https://github.com/oklabflensburg/open-city-planner" class="inline-flex rounded-lg bg-code-mint px-5 py-3 font-bold text-ink">GitHub & offene Aufgaben</a></div>
          <div class="rounded-2xl bg-[#082222] p-6 font-mono text-sm leading-8 text-[#bfe8df]"><p class="mb-4 font-sans text-xs text-[#70b6aa]">PostGIS · Analysegebiet</p><code><b class="text-code-mint">SELECT</b> area.name,<br>&nbsp; ST_Area(area.geom) / 10000<br><b class="text-code-mint">FROM</b> analysis_areas area<br><b class="text-code-mint">WHERE</b> ST_Intersects(<br>&nbsp; area.geom, :district<br>);</code></div>
        </div>
      </section>

      <section id="projects" class="mx-auto max-w-7xl px-5 py-18 lg:px-8">
        <div class="mb-9 grid gap-4 md:grid-cols-2 md:items-end"><h2 class="text-4xl font-extrabold tracking-tight sm:text-5xl">{{ t.projects }}</h2><p class="max-w-xl text-ink/60 md:justify-self-end">{{ t.projectsIntro }}</p></div>
        <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3"><article v-for="project in projects" :key="project.title" class="group overflow-hidden border-t-4 bg-white shadow-sm" :class="project.color"><div v-if="project.image" class="aspect-[16/9] overflow-hidden bg-black/5"><img :src="project.image" :alt="`Vorschau ${project.title}`" class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"></div><div v-else class="map-grid grid aspect-[16/9] place-items-center bg-blue-50"><Icon name="lucide:map" size="48" class="text-code-blue" /></div><div class="flex min-h-52 flex-col p-6"><small class="text-ink/50">{{ project.area }} · Open Source</small><h3 class="mt-2 text-xl font-bold">{{ project.title }}</h3><p class="mt-3 text-ink/60">{{ project.text }}</p><a :href="project.url" class="mt-auto pt-5 font-bold text-code-blue">Projekt entdecken →</a></div></article></div>
      </section>

      <section id="join" class="mx-auto max-w-7xl px-5 py-10 lg:px-8"><div class="grid gap-10 border-l-8 border-code-blue bg-blue-50 p-7 sm:p-10 lg:grid-cols-[1.1fr_.9fr]"><div><p class="mb-4 font-bold text-code-blue">{{ t.volunteer }}</p><h2 class="text-4xl font-extrabold sm:text-5xl">{{ t.volunteerTitle }}</h2><p class="mt-5 max-w-2xl leading-7 text-ink/65">{{ t.volunteerText }}</p><a href="#tasks" class="mt-7 inline-flex rounded-lg bg-code-mint px-5 py-3 font-bold">{{ t.find }}</a></div><div class="grid content-center gap-4"><p v-for="benefit in t.benefits" :key="benefit" class="flex items-center gap-3 font-bold"><Icon name="lucide:circle-check" class="text-code-blue" />{{ benefit }}</p></div></div></section>

      <section id="tasks" class="mx-auto max-w-7xl px-5 py-18 lg:px-8"><div class="mb-9 grid gap-4 md:grid-cols-2 md:items-end"><h2 class="text-4xl font-extrabold tracking-tight sm:text-5xl">{{ t.tasks }}</h2><p class="max-w-xl text-ink/60 md:justify-self-end">{{ t.tasksIntro }}</p></div><div class="grid gap-x-8 md:grid-cols-2"><a v-for="task in tasks" :key="task[0]" href="https://github.com/orgs/oklabflensburg/repositories" class="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-black/10 py-5"><span><b>{{ task[0] }}</b><small class="mt-1 block text-ink/50">{{ task[1] }}</small></span><Icon name="lucide:arrow-up-right" class="text-code-blue" /></a></div></section>

      <section class="mx-auto max-w-7xl px-5 pb-20 lg:px-8"><div class="grid items-center gap-7 rounded-3xl bg-code-mint p-7 sm:p-10 md:grid-cols-[1fr_auto]"><div><h2 class="text-3xl font-extrabold sm:text-4xl">{{ t.meeting }}</h2><p class="mt-2">{{ t.meetingInfo }}</p></div><a href="https://www.openstreetmap.org/search?query=Norderstra%C3%9Fe%2049%20Flensburg" class="rounded-lg border border-black/15 bg-white/55 px-5 py-3 text-center font-bold">{{ t.save }}</a></div></section>
    </main>

    <section id="about" class="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 border-t border-black/10 px-5 py-12 md:flex-row md:items-center lg:px-8"><div class="max-w-2xl"><h2 class="text-3xl font-extrabold">{{ t.network }}</h2><p class="mt-3 text-ink/60">{{ t.networkText }}</p></div><img src="/logos/code-for-germany.svg" alt="Code for Germany" class="w-40"></section>
    <footer class="border-t border-black/10 bg-white"><div class="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 py-9 text-sm text-ink/55 md:flex-row lg:px-8"><span>OK Lab Flensburg · Digitales Ehrenamt in der Region</span><span><a href="https://github.com/oklabflensburg">GitHub</a> · <a href="https://norden.social/@oklabflensburg">Mastodon</a> · <a href="mailto:info@oklabflensburg.de">Kontakt</a> · Impressum · Datenschutz</span></div></footer>
  </div>
</template>
