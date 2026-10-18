<script setup>
// "Bilgi Notu"
import AppIcon from './AppIcon.vue'

defineProps({
  icon: { type: String, default: 'info' },
})
</script>

<template>
  <div class="bilgi-notu">
    <AppIcon :name="icon" :size="14" color="var(--metin-ikincil)" />
    <p class="t-govde-xs ikincil"><slot /></p>
  </div>
</template>

<style scoped>
.bilgi-notu {
  display: flex;
  gap: 9px;
  align-items: flex-start;
  width: 100%;
  padding: 13px;
  border-radius: 16px;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
}
.bilgi-notu p {
  flex: 1 0 0;
  min-width: 0;
}
</style>
