<script setup>
// Ekranlar bölümündeki tek telefon maketi (Figma "Telefon", 256.68×538.16).
// Görsel, gölge/parlama payıyla birlikte dışa aktarıldı (356×637.5): yanlarda 49.66px,
// üstte 34.42px, altta 64.92px pay. Kutu telefon gövdesinin boyutundadır; görsel
// yüzdelik negatif ofsetlerle taşırılır, böylece her genişlikte oranlar korunur.
defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
})
</script>

<template>
  <div class="telefon">
    <img :src="src" :alt="alt" width="356" height="638" loading="lazy" decoding="async" />
  </div>
</template>

<style scoped>
.telefon {
  position: relative;
  aspect-ratio: 256.68 / 538.16;
}
.telefon img {
  position: absolute;
  /* 356 / 256.68 */
  width: 138.694%;
  max-width: none;
  height: auto;
  /* -49.66 / 256.68 (genişliğe göre) */
  left: -19.347%;
  /* -34.42 / 538.16 (yüksekliğe göre) */
  top: -6.396%;
}
</style>
