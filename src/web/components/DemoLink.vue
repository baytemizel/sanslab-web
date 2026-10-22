<script setup>
// "Canlı demo bağlantısı" — uygulamanın web sürümünü yeni sekmede açar.
import AppIcon from '@/components/AppIcon.vue'
import { DEMO_ROUTE } from '../links'
import { useLocale } from '../i18n'

const { t } = useLocale()
</script>

<template>
  <RouterLink :to="DEMO_ROUTE" target="_blank" class="demo">
    {{ t.demo }}
    <AppIcon name="external-link" :size="15" color="var(--vurgu-altin)" />
  </RouterLink>
</template>

<style scoped>
.demo {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  font: 600 15px/normal var(--font-inter);
  color: var(--vurgu-altin);
  white-space: nowrap;
}
.demo:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
