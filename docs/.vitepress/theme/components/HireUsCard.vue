<script setup lang="ts">
// Cross-sell for the paid customization service at marketplace.botble.com/customize.
//
// Docs readers are the site's largest audience of people actively building on Botble, but until
// this every "beyond the scope of this help file" pointed them at email only. Rendered twice from
// the layout: in the right aside on wide screens, and above the doc footer where the aside is
// hidden - CSS shows exactly one of the two.
//
// `from=docs` is the attribution whitelist value on the marketplace side; utm_content carries the
// product slug so GA shows which product's docs send the leads.
import { computed } from 'vue'
import { useData } from 'vitepress'

const props = defineProps<{ placement: 'aside' | 'footer' }>()

const { page } = useData()

const href = computed(() => {
  const product = page.value.relativePath.split('/')[0] || 'home'
  const params = new URLSearchParams({
    from: 'docs',
    utm_source: 'docs',
    utm_medium: props.placement,
    utm_content: product,
  })

  return `https://marketplace.botble.com/customize?${params}`
})
</script>

<template>
  <div class="hire-us-card" :class="`hire-us-card--${placement}`">
    <p class="hire-us-card__title">Need it customized?</p>
    <p class="hire-us-card__body">
      Custom features, theme changes, server setup, migrations and upgrades - built by the Botble team.
      Quick fixes from $99, fixed quote within 1 business day.
    </p>
    <a class="hire-us-card__link" :href="href" target="_blank" rel="noopener">Get a free quote &rarr;</a>
  </div>
</template>

<style scoped>
.hire-us-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  padding: 16px;
}

.hire-us-card--aside {
  margin-top: 24px;
}

.hire-us-card--footer {
  margin-bottom: 24px;
}

/* The aside is only shown from 1280px up (VitePress default), so the footer copy takes over below it. */
@media (min-width: 1280px) {
  .hire-us-card--footer {
    display: none;
  }
}

.hire-us-card__title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.hire-us-card__body {
  margin: 6px 0 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.hire-us-card__link {
  display: inline-block;
  margin-top: 10px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.hire-us-card__link:hover {
  text-decoration: underline;
}
</style>
