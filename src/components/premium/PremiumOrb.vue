<script setup>
// "Altın taç küresi" (11:2317) — 56px küre; sinyal halkaları 112px SVG olarak kutunun dışına taşar.
import orbUrl from '@/assets/premium/altin-tac-kuresi.svg'
</script>

<template>
  <span class="kure" aria-hidden="true">
    <img :src="orbUrl" width="112" height="112" alt="" />
  </span>
</template>

<style scoped>
.kure {
  position: relative;
  display: block;
  width: 56px;
  height: 56px;
  flex-shrink: 0;
}
.kure img {
  position: absolute;
  top: -28px;
  left: -28px;
  display: block;
  max-width: none;
}
</style>
