<script setup lang="ts">
import { site } from '#shared/config/site'
const localePath = useLocalePath()
</script>
<template>
  <footer class="footer">
    <div class="shell footer-inner">
      <NuxtLink :to="localePath('/')" class="brand">
        <img src="/logos/codefor-flensburg.svg" alt="" width="38" height="44" loading="lazy" />
        <span>{{ site.name }}</span>
      </NuxtLink>
      <p class="footer-tagline">{{ $t('footer.tagline') }}</p>
      <div class="footer-links">
        <div class="footer-social">
          <a :href="site.github" class="icon-button" aria-label="GitHub"><AppIcon name="github" :size="18" /></a>
          <a :href="site.social.mastodon" class="icon-button" aria-label="Mastodon" rel="me"><AppIcon name="social" :size="18" /></a>
          <a :href="`mailto:${site.email}`" class="icon-button" :aria-label="$t('common.contact')"><AppIcon name="mail" :size="18" /></a>
          <a :href="`/rss.xml?lang=${$i18n.locale}`" class="icon-button" aria-label="RSS"><AppIcon name="rss" :size="18" /></a>
        </div>
        <nav :aria-label="$t('footer.group0')">
          <NuxtLink v-for="item in ['mitmachen', 'veranstaltungen', 'team', 'daten-sind-daten']" :key="item" :to="localePath(`/${item}`)">{{ $t(`nav.${item}`) }}</NuxtLink>
        </nav>
        <nav :aria-label="$t('footer.group2')">
          <NuxtLink v-for="item in ['impressum', 'datenschutz', 'code-of-conduct']" :key="item" :to="localePath(`/${item}`)">{{ $t(`nav.${item}`) }}</NuxtLink>
        </nav>
      </div>
    </div>
  </footer>
</template>
