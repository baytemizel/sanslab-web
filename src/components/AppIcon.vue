<script setup>
// Figma ikonları Feather setinden (stroke 2 / 24 birim). feather-icons birebir eşleşir.
import { computed } from 'vue'
import feather from 'feather-icons'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: Number, default: 24 },
  color: { type: String, default: 'currentColor' },
})

const svg = computed(() => {
  const icon = feather.icons[props.name]
  if (!icon) return ''
  return icon.toSvg({ width: props.size, height: props.size, 'stroke-width': 2, color: props.color })
})
</script>

<template>
  <span class="ikon" :style="{ width: `${size}px`, height: `${size}px` }" aria-hidden="true" v-html="svg" />
</template>

<style scoped>
.ikon {
  display: inline-flex;
  flex-shrink: 0;
}
.ikon :deep(svg) {
  display: block;
}
</style>
