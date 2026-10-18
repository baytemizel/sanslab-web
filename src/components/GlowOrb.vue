<script setup>
// "Küre" — oyun kartındaki parlayan renk küresi (46px, hâle ile 60px).
import { useId } from 'vue'

defineProps({
  color: { type: String, required: true },
  size: { type: Number, default: 46 },
})
const id = useId()
</script>

<template>
  <span class="kure" :style="{ width: `${size}px`, height: `${size}px` }">
    <svg :width="size * 60 / 46" :height="size * 60 / 46" viewBox="0 0 60 60" aria-hidden="true">
      <defs>
        <radialGradient :id="`k-${id}`" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(23.28 21.6) scale(33.6)">
          <stop stop-color="white" stop-opacity="0.85" />
          <stop offset="0.4" :stop-color="color" />
          <stop offset="1" :stop-color="color" />
        </radialGradient>
      </defs>
      <circle cx="30" cy="30" r="30" :fill="color" fill-opacity="0.35" />
      <circle cx="30" cy="30" r="21" :fill="`url(#k-${id})`" />
    </svg>
  </span>
</template>

<style scoped>
.kure {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
}
.kure svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
}
</style>
