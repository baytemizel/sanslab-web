<script setup>
// 1200px içerik genişliği; kenar boşluğu 1440'ta 120px, 390'da 20px (Figma).
defineProps({ as: { type: String, default: 'div' } })
</script>

<template>
  <component :is="as" class="web-kap"><slot /></component>
</template>

<style scoped>
.web-kap {
  width: 100%;
  padding-inline: max(20px, calc((100% - 1200px) / 2));
}
</style>
