<script setup>
// "Kupon sayısı" — iki seçenekli bölümlü kontrol (Figma 8:782).
defineProps({
  options: { type: Array, required: true }, // [{ value, label }]
  modelValue: { type: [Number, String], required: true },
  color: { type: String, required: true },
  label: { type: String, default: '' },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="bolumlu" role="radiogroup" :aria-label="label || undefined">
    <button
      v-for="o in options"
      :key="o.value"
      type="button"
      role="radio"
      class="secenek"
      :class="{ secili: o.value === modelValue }"
      :aria-checked="o.value === modelValue"
      :style="o.value === modelValue ? { borderColor: color, color } : null"
      @click="$emit('update:modelValue', o.value)"
    >
      {{ o.label }}
    </button>
  </div>
</template>

<style scoped>
.bolumlu {
  display: flex;
  padding: 5px;
  border-radius: 14px;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
}
.secenek {
  display: flex;
  flex: 1 0 0;
  min-width: 0;
  justify-content: center;
  padding: 11px 8px;
  border-radius: 12px;
  border: 1px solid transparent;
  font: 600 13.5px/normal var(--font-inter);
  color: var(--metin-ikincil);
  white-space: nowrap;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
.secenek.secili {
  background: rgba(255, 255, 255, 0.1);
}
</style>
