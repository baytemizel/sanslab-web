<script setup>
// "Seçim" — Ayarlar'daki segmentli seçim (Dil, Tema). Seçili seçenek altın çerçeveli.
const props = defineProps({
  options: { type: Array, required: true }, // [{ value, label }]
  label: { type: String, required: true }, // erişilebilirlik etiketi
})
const model = defineModel({ type: String, required: true })

function onKey(e, i) {
  const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
  if (!step) return
  e.preventDefault()
  const next = (i + step + props.options.length) % props.options.length
  model.value = props.options[next].value
  e.currentTarget.parentElement.children[next]?.focus()
}
</script>

<template>
  <div class="secim" role="radiogroup" :aria-label="label">
    <button
      v-for="(o, i) in options"
      :key="o.value"
      type="button"
      role="radio"
      class="secenek"
      :class="{ 'secenek--secili': o.value === model }"
      :aria-checked="o.value === model"
      :tabindex="o.value === model ? 0 : -1"
      @click="model = o.value"
      @keydown="onKey($event, i)"
    >
      {{ o.label }}
    </button>
  </div>
</template>

<style scoped>
.secim {
  display: flex;
  align-items: flex-start;
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
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
.secenek--secili {
  background: var(--yuzey-secili, rgba(255, 255, 255, 0.1));
  border-color: var(--vurgu-altin);
  color: var(--vurgu-altin);
}
</style>
