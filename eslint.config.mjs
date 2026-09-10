import withNuxt from './.nuxt/eslint.config.mjs'
export default withNuxt(
  {
    ignores: [
      '.output/**',
      '.data/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
    },
  },
)
