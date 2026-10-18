<script setup>
// "Mod seçimi" — 2 sütunlu mod butonları (Figma 8:767). Seçili: oyun rengi kenar + metin.
defineProps({
  modes: { type: Array, required: true },
  modelValue: { type: String, required: true },
  color: { type: String, required: true },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="mod-secimi" role="radiogroup" aria-label="Üretim modu">
    <button
      v-for="m in modes"
      :key="m.id"
      type="button"
      role="radio"
      class="mod"
      :class="{ secili: m.id === modelValue }"
      :aria-checked="m.id === modelValue"
      :style="m.id === modelValue ? { borderColor: color, color } : null"
      @click="$emit('update:modelValue', m.id)"
    >
      {{ m.label }}
    </button>
  </div>
</template>

<style scoped>
.mod-secimi {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 10.5px;
}
.mod {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 13px 14px;
  border-radius: 12px;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
  font: 600 13.5px/normal var(--font-inter);
  color: var(--metin-ikincil);
  text-align: center;
  white-space: nowrap;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
.mod.secili {
  background: rgba(255, 255, 255, 0.1);
}
@media (max-width: 340px) {
  .mod {
    padding-inline: 8px;
    white-space: normal;
  }
}
</style>
