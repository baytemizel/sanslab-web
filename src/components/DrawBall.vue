<script setup>
// "Çekiliş Topu" — Normal: koyu yüz + renkli halka; Özel (Joker / Şans Topu): dolu renk.
// Figma'daki Hale / Yüz / Parlama katmanları oyun rengine göre parametrik çizilir.
import { computed, useId } from 'vue'

const props = defineProps({
  number: { type: [Number, String], required: true },
  color: { type: String, default: 'var(--oyun-sayisal)' },
  size: { type: Number, default: 44 }, // 44 | 42 | 32
  special: { type: Boolean, default: false },
})

const id = useId()
const r = computed(() => props.size / 2)
const yuzR = computed(() => props.size / 2 - 1.5)
const label = computed(() => String(props.number).padStart(2, '0'))
const fontSize = computed(() => `${props.size * 0.4}px`)
</script>

<template>
  <span class="top" :style="{ width: `${size}px`, height: `${size}px` }">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" overflow="visible" aria-hidden="true">
      <defs>
        <radialGradient
          :id="`p-${id}`"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          :gradientTransform="`translate(${1.5 + yuzR * 2 * 0.34} ${1.5 + yuzR * 2 * 0.3}) scale(${yuzR * 2 * 0.75})`"
        >
          <template v-if="special">
            <stop stop-color="white" stop-opacity="0.55" />
            <stop offset="0.35" stop-color="white" stop-opacity="0.12" />
            <stop offset="1" stop-opacity="0.18" />
          </template>
          <template v-else>
            <stop stop-color="white" stop-opacity="0.22" />
            <stop offset="0.35" stop-color="white" stop-opacity="0.04" />
            <stop offset="1" stop-opacity="0" />
          </template>
        </radialGradient>
      </defs>
      <circle :cx="r" :cy="r" :r="size * 0.75" :fill="color" :fill-opacity="special ? 0.5 : 0.32" />
      <circle
        v-if="special"
        :cx="r"
        :cy="r"
        :r="yuzR"
        :fill="color"
      />
      <circle v-else :cx="r" :cy="r" :r="yuzR" fill="#0E0C24" :stroke="color" stroke-width="1.5" />
      <circle :cx="r" :cy="r" :r="yuzR" :fill="`url(#p-${id})`" />
    </svg>
    <span class="numara" :style="{ fontSize, color: special ? '#fff' : color }">{{ label }}</span>
  </span>
</template>

<style scoped>
.top {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
}
.top svg {
  position: absolute;
  inset: 0;
  display: block;
}
.numara {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sora);
  font-weight: 700;
  letter-spacing: 0.5px;
  line-height: normal;
}
</style>
