<script setup>
// "Sayı adedi" — Hızlı On için 1–10 sayı adedi seçici (Figma 8:1826). Seçili: oyun rengi dolgu.
defineProps({
  min: { type: Number, default: 1 },
  max: { type: Number, default: 10 },
  modelValue: { type: Number, required: true },
  color: { type: String, required: true },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="sayi-adedi" role="radiogroup" aria-label="Sayı adedi">
    <button
      v-for="n in max - min + 1"
      :key="n"
      type="button"
      role="radio"
      class="adet"
      :class="{ secili: n + min - 1 === modelValue }"
      :aria-checked="n + min - 1 === modelValue"
      :style="n + min - 1 === modelValue ? { background: color, borderColor: color } : null"
      @click="$emit('update:modelValue', n + min - 1)"
    >
      {{ n + min - 1 }}
    </button>
  </div>
</template>

<style scoped>
.sayi-adedi {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}
.adet {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 13px;
  background: var(--yuzey-kart);
  border: 1.5px solid var(--cizgi-kenar);
  font: 700 14px/normal var(--font-sora);
  color: var(--metin-birincil);
  transition: background 0.15s ease, border-color 0.15s ease;
}
.adet.secili {
  color: #fff;
}
</style>
