<script setup>
// "Kapat Butonu" — 36×36, köşe 18.
import AppIcon from './AppIcon.vue'

defineProps({
  label: { type: String, default: 'Kapat' },
  to: { type: [String, Object], default: null },
})
</script>

<template>
  <component :is="to ? 'RouterLink' : 'button'" :to="to || undefined" :type="to ? undefined : 'button'" class="kapat" :aria-label="label">
    <AppIcon name="x" :size="20" color="var(--metin-birincil)" />
  </component>
</template>

<style scoped>
.kapat {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 18px;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
}
</style>
