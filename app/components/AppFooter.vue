<script setup lang="ts">
import { site } from '#shared/config/site'
const localePath = useLocalePath()
</script>
<template>
  <footer class="footer">
    <div class="shell">
      <div class="footer-inner">
        <div class="footer-identity">
          <NuxtLink :to="localePath('/')" class="brand">
            <AppLogo loading="lazy" />
          </NuxtLink>
          <p class="footer-tagline">{{ $t('footer.tagline') }}</p>
          <p class="footer-meeting">
            <AppIcon name="calendar" />
            <span>{{ $t('footer.meeting', { day: $t('meeting.every', { day: $t(`weekdays.${site.meeting.weekday}`) }), start: site.meeting.start, end: site.meeting.end }) }}<br />{{ site.meeting.location }}</span>
          </p>
          <div class="button-row">
            <NuxtLink :to="localePath('/mitmachen')" class="button">{{ $t('footer.joinCta') }} <AppIcon name="arrow" :size="16" /></NuxtLink>
            <SiteLink :href="site.github" class="button button-secondary"><AppIcon name="github" :size="18" />{{ $t('footer.githubCta') }}</SiteLink>
          </div>
        </div>
        <nav class="footer-group" :aria-label="$t('footer.community')">
          <p class="footer-group-title">{{ $t('footer.community') }}</p>
          <ul>
            <li v-for="item in ['mitmachen', 'veranstaltungen', 'team', 'daten-sind-daten']" :key="item">
              <NuxtLink :to="localePath(`/${item}`)">{{ $t(`nav.${item}`) }}</NuxtLink>
            </li>
          </ul>
        </nav>
        <nav class="footer-group" :aria-label="$t('footer.explore')">
          <p class="footer-group-title">{{ $t('footer.explore') }}</p>
          <ul>
            <li v-for="item in ['projekte', 'blog', 'ueber-uns', 'kontakt']" :key="item">
              <NuxtLink :to="localePath(`/${item}`)">{{ $t(`nav.${item}`) }}</NuxtLink>
            </li>
          </ul>
        </nav>
        <nav class="footer-group" :aria-label="$t('footer.follow')">
          <p class="footer-group-title">{{ $t('footer.follow') }}</p>
          <ul>
            <li><SiteLink :href="site.github"><AppIcon name="github" :size="18" />GitHub</SiteLink></li>
            <li><SiteLink :href="site.social.mastodon" rel="me"><AppIcon name="social" :size="18" />Mastodon</SiteLink></li>
            <li><SiteLink :href="`/rss.xml?lang=${$i18n.locale}`"><AppIcon name="rss" :size="18" />RSS</SiteLink></li>
            <li><SiteLink :href="`mailto:${site.contact.email}`"><AppIcon name="mail" :size="18" />{{ $t('footer.email') }}</SiteLink></li>
          </ul>
        </nav>
      </div>
      <div class="footer-meta">
        <div class="footer-affiliations">
          <i18n-t keypath="footer.network" tag="p">
            <template #network><SiteLink :href="site.network.url">{{ site.network.name }}</SiteLink></template>
          </i18n-t>
          <i18n-t keypath="footer.carrier" tag="p">
            <template #association><NuxtLink :to="localePath('/daten-sind-daten')">{{ site.association.name }}</NuxtLink></template>
          </i18n-t>
        </div>
        <nav :aria-label="$t('footer.legal')">
          <NuxtLink v-for="item in ['impressum', 'datenschutz', 'code-of-conduct']" :key="item" :to="localePath(`/${item}`)">{{ $t(`nav.${item}`) }}</NuxtLink>
        </nav>
      </div>
    </div>
  </footer>
</template>
