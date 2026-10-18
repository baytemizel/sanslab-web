<script setup>
// "Filtre Çipi" — Normal / Seçili
defineProps({
  selected: { type: Boolean, default: false },
})
defineEmits(['click'])
</script>

<template>
  <button type="button" class="cip t-buton-s" :class="{ secili: selected }" :aria-pressed="selected" @click="$emit('click')">
    <slot />
  </button>
</template>

<style scoped>
.cip {
  display: inline-flex;
  align-items: flex-start;
  flex-shrink: 0;
  padding: 8px 14px;
  border-radius: 999px;
  white-space: nowrap;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
  color: var(--metin-birincil);
}
.cip.secili {
  background: var(--vurgu-altin-dolgu);
  border-color: var(--vurgu-altin-dolgu);
  color: var(--vurgu-altin-ustu);
}
</style>
