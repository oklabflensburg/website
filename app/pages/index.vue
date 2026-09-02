<script setup lang="ts">
useLocalizedSeo('meta.homeTitle', 'meta.homeDescription')
</script>

<template>
  <div class="site-page">
    <AppHeader />
    <main id="main-content">
      <HeroSection />
      <AboutLabSection />
      <TechnologyPaths />
      <FeaturedProject />
      <ProjectGrid />
      <ContributorsSection />
      <VolunteerSection />
      <OpenTasksSection />
      <MeetingSection />
    </main>
    <AppFooter />
  </div>
</template>
