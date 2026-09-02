<template>
  <section id="network" class="network section-shell">
    <div>
      <h2>{{ $t('about.title') }}</h2>
      <p>{{ $t('about.text') }}</p>
      <a href="https://codefor.de/flensburg/">{{ $t('about.link') }} <Icon name="lucide:arrow-up-right" /></a>
    </div>
    <img src="/logos/code-for-germany.svg" alt="Code for Germany" width="160" height="82">
  </section>
  <footer class="site-footer">
    <div class="footer-inner">
      <span>OK Lab Flensburg · {{ $t('footer.tagline') }}</span>
      <nav aria-label="Footer">
        <a href="https://github.com/oklabflensburg">GitHub</a>
        <a href="https://norden.social/@oklabflensburg">Mastodon</a>
        <a href="mailto:info@oklabflensburg.de">{{ $t('common.contact') }}</a>
        <a href="/legacy/impressum.html">{{ $t('footer.imprint') }} & {{ $t('footer.privacy') }}</a>
        <a href="/legacy/lizenz.html">{{ $t('footer.license') }}</a>
      </nav>
    </div>
  </footer>
</template>
