<script setup>
// Dil seçicideki bayraklar (TR: Türk bayrağı, EN: Birleşik Krallık bayrağı)
import { useId } from 'vue'

defineProps({ code: { type: String, required: true } }) // tr | en
const id = useId() // aynı sayfada birden çok UK bayrağı için benzersiz clipPath
</script>

<template>
  <svg v-if="code === 'tr'" class="bayrak" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="1200" height="800" fill="#e30a17" />
    <circle cx="425" cy="400" r="200" fill="#fff" />
    <circle cx="475" cy="400" r="160" fill="#e30a17" />
    <polygon fill="#fff" points="583.334,400 764.235,458.779 652.431,304.894 652.431,495.106 764.235,341.221" />
  </svg>
  <svg v-else class="bayrak" viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <clipPath :id="`${id}-t`">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
    </clipPath>
    <rect width="60" height="30" fill="#012169" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6" />
    <path d="M0,0 L60,30 M60,0 L0,30" :clip-path="`url(#${id}-t)`" stroke="#c8102e" stroke-width="4" />
    <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10" />
    <path d="M30,0 v30 M0,15 h60" stroke="#c8102e" stroke-width="6" />
  </svg>
</template>

<style scoped>
.bayrak {
  display: block;
  flex-shrink: 0;
  width: 22px;
  height: 16px;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.14);
}
</style>
