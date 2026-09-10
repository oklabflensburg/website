/** Prevent user input being lost before Vue has attached its event handlers. */
export function useInteractiveReady() {
  const ready = ref(false)
  onMounted(() => {
    ready.value = true
  })
  return ready
}
