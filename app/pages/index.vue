<script setup lang="ts">
useLocalizedSeo('meta.homeTitle', 'meta.homeDescription')
</script>

<template>
  <div class="site-page">
    <AppHeader />
    <main id="main-content">
      <HeroSection />
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
