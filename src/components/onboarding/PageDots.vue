<script setup>
// "Sayfa noktaları" (Figma 6:40) — etkin nokta 22×8 altın, diğerleri 8×8.
defineProps({
  count: { type: Number, required: true },
  current: { type: Number, required: true }, // 1 tabanlı
})
defineEmits(['select'])
</script>

<template>
  <div class="noktalar" role="tablist" aria-label="Tanıtım adımları">
    <button
      v-for="i in count"
      :key="i"
      type="button"
      role="tab"
      class="nokta"
      :class="{ etkin: i === current }"
      :aria-selected="i === current"
      :aria-label="`${i}. adım`"
      @click="$emit('select', i)"
    />
  </div>
</template>

<style scoped>
.noktalar {
  display: flex;
  gap: 7px;
  align-items: center;
}
.nokta {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: var(--cizgi-kenar);
  transition: width 0.2s ease, background-color 0.2s ease;
}
.nokta.etkin {
  width: 22px;
  background: var(--vurgu-altin-dolgu);
}
</style>
