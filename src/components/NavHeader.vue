<script setup>
// "Gezinme başlığı (native)" — 44px yükseklik, solda 28px chevron-left, ortada başlık.
// ScreenShell içinde kenar boşluklarını taşarak tam genişlik kaplar.
import AppIcon from './AppIcon.vue'
import { goBack } from '@/lib/goBack'

const props = defineProps({
  title: { type: String, required: true },
  iconColor: { type: String, default: 'var(--vurgu-altin)' },
  fallback: { type: [String, Object], default: () => ({ name: 'home' }) },
})
</script>

<template>
  <header class="gezinme-basligi">
    <button type="button" class="geri" aria-label="Geri" @click="goBack(props.fallback)">
      <AppIcon name="chevron-left" :size="28" :color="iconColor" />
    </button>
    <h1 class="baslik">{{ title }}</h1>
  </header>
</template>

<style scoped>
.gezinme-basligi {
  position: relative;
  height: 44px;
  margin: 0 calc(-1 * var(--ekran-yan, 20px));
}
.geri {
  position: absolute;
  left: 8px;
  top: 8px;
  display: flex;
}
.baslik {
  position: absolute;
  left: 50%;
  top: 10px;
  width: 250px;
  max-width: calc(100% - 88px);
  transform: translateX(-50%);
  text-align: center;
  font: 700 17px/normal var(--font-sora);
  color: var(--metin-birincil);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
