<template>
  <section class="section-shell featured-wrap">
    <div class="featured-project">
      <div>
        <p class="featured-label">{{ $t('featured.label') }}</p>
        <h2>Open City Planner</h2>
        <p>{{ $t('featured.text') }}</p>
        <div class="tag-list dark"><span v-for="tag in ['PostGIS', 'FastAPI', 'Nuxt 4', 'MapLibre', 'OpenStreetMap']" :key="tag">{{ tag }}</span></div>
        <a href="https://github.com/oklabflensburg/open-city-planner" class="button button-mint">{{ $t('featured.cta') }}</a>
      </div>
      <div class="code-card">
        <p>{{ $t('featured.codeLabel') }}</p>
        <code><b>SELECT</b> area.name,<br>&nbsp; ST_Area(area.geom) / 10000<br><b>FROM</b> analysis_areas area<br><b>WHERE</b> ST_Intersects(<br>&nbsp; area.geom, :district<br>);</code>
      </div>
    </div>
  </section>
</template>
