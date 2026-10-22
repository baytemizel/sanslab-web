<script setup>
import { useLocale } from '../i18n'

defineProps({ size: { type: Number, default: null } })
const { t, home } = useLocale()
</script>

<template>
  <RouterLink :to="home" class="logo" :style="size ? { fontSize: `${size}px` } : undefined" :aria-label="t.nav.home">
    <span>Şans</span><span class="altin">Lab</span>
  </RouterLink>
</template>

<style scoped>
.logo {
  display: inline-flex;
  font-family: var(--font-sora);
  font-weight: 800;
  letter-spacing: -0.5px;
  line-height: normal;
  white-space: nowrap;
  color: var(--metin-birincil);
}
</style>
