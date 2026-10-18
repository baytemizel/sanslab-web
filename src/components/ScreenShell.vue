<script setup>
// Ekran kabuğu: Figma'daki 390px mobil çerçeveyi web'de ortalar.
// iOS Durum Çubuğu (47px) ve Ana Ekran Çubuğu (34px) web'de çizilmez; yerine güvenli alan boşlukları kullanılır.
defineProps({
  top: { type: Number, default: 14 }, // Durum çubuğunun altından itibaren üst boşluk (Figma: pt - 47)
  bottom: { type: Number, default: 44 }, // Ana ekran çubuğunun üstündeki alt boşluk (Figma: pb - 34)
  gutter: { type: Number, default: 20 },
})
</script>

<template>
  <div
    class="ekran"
    :style="{
      '--ekran-ust': `${top}px`,
      '--ekran-alt': `${bottom}px`,
      '--ekran-yan': `${gutter}px`,
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.ekran {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  max-width: var(--ekran-genislik);
  min-height: 100dvh;
  margin: 0 auto;
  padding: calc(var(--ust-bosluk) + var(--ekran-ust)) var(--ekran-yan) calc(var(--alt-bosluk) + var(--ekran-alt));
}
</style>
