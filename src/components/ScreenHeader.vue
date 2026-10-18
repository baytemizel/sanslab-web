<script setup>
// "Ekran başlığı" — 42px geri butonu (Simge Butonu + chevron-left) ve isteğe bağlı ortalı başlık.
// Oyun ekranlarında ikon oyun rengini, Ayarlar'da altın rengini alır.
import IconButton from './IconButton.vue'
import { goBack } from '@/lib/goBack'

const props = defineProps({
  title: { type: String, default: '' },
  iconColor: { type: String, default: 'var(--vurgu-altin)' },
  fallback: { type: [String, Object], default: () => ({ name: 'home' }) },
})
</script>

<template>
  <header class="ekran-basligi">
    <IconButton icon="chevron-left" label="Geri" :icon-color="iconColor" @click="goBack(props.fallback)" />
    <template v-if="title">
      <h1 class="baslik">{{ title }}</h1>
      <span class="bosluk" aria-hidden="true" />
    </template>
    <slot />
  </header>
</template>

<style scoped>
.ekran-basligi {
  display: flex;
  gap: 12px;
  align-items: center;
  min-height: 42px;
}
.baslik {
  flex: 1 0 0;
  min-width: 0;
  text-align: center;
  font: 700 17px/normal var(--font-sora);
  color: var(--metin-birincil);
}
.bosluk {
  width: 42px;
  flex-shrink: 0;
}
</style>
