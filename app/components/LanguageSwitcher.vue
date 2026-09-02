<script setup lang="ts">
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localeCodes = ['de', 'da', 'en'] as const
const preference = useCookie<string>('oklab_locale', {
  maxAge: 60 * 60 * 24 * 365,
  sameSite: 'lax',
  secure: true,
})

function remember(code: string) {
  preference.value = code
}
</script>

<template>
  <nav class="language-switcher" :aria-label="$t('a11y.languageNav')">
    <NuxtLink
      v-for="code in localeCodes"
      :key="code"
      :to="switchLocalePath(code)"
      :lang="code"
      :hreflang="code"
      :aria-label="$t(`language.${code}`)"
      :aria-current="code === locale ? 'page' : undefined"
      class="language-link"
      :class="{ active: code === locale }"
      @click="remember(code)"
    >
      {{ code }}
    </NuxtLink>
  </nav>
</template>
