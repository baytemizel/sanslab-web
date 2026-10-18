<script setup>
// "Arka Plan (Gece Çekilişi)" — tüm ekranların altındaki sabit tuval.
import arkaPlan from '@/assets/arka-plan-koyu.svg'
</script>

<template>
  <div class="arka-plan" aria-hidden="true">
    <img :src="arkaPlan" alt="" width="390" height="844" />
  </div>
</template>

<style scoped>
.arka-plan {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  background: linear-gradient(127.6deg, rgb(22, 19, 52) 7.483%, rgb(10, 9, 24) 92.517%);
  pointer-events: none;
}
.arka-plan img {
  position: absolute;
  top: 0;
  left: 50%;
  width: max(100%, 390px);
  height: 100%;
  min-height: 844px;
  transform: translateX(-50%);
  object-fit: cover;
  object-position: top center;
}
</style>
