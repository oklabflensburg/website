import { findTranslationGroup, type TranslationGroup } from '#shared/utils/translations'

export function useTranslations() {
  const { data } = useNuxtData<TranslationGroup[]>('translations')
  const route = useRoute()
  const current = computed(() => findTranslationGroup(data.value ?? [], route.path))
  return { groups: data, current }
}
