import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import type { Theme } from 'vitepress'
import HireUsCard from './components/HireUsCard.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  // Both slots belong to the doc layout only, so the home page stays untouched.
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'aside-outline-after': () => h(HireUsCard, { placement: 'aside' }),
      'doc-footer-before': () => h(HireUsCard, { placement: 'footer' }),
    }),
} satisfies Theme
