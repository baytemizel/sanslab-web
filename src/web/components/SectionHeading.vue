<script setup>
// "Bölüm başlığı" — üst etiket + başlık + alt metin. Masaüstü 44/52, mobil 30/36.
import Eyebrow from './Eyebrow.vue'

defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <header class="bolum-basligi">
    <Eyebrow>{{ eyebrow }}</Eyebrow>
    <h2 class="baslik">{{ title }}</h2>
    <p v-if="subtitle" class="alt">{{ subtitle }}</p>
  </header>
</template>

<style scoped>
.bolum-basligi {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  text-align: center;
}
.baslik {
  font: 800 30px/36px var(--font-sora);
  letter-spacing: -0.8px;
  color: var(--metin-birincil);
}
.alt {
  font: 400 15.5px/24px var(--font-inter);
  color: var(--metin-ikincil);
}
@media (min-width: 1024px) {
  .bolum-basligi {
    gap: 16px;
  }
  .baslik {
    font-size: 44px;
    line-height: 52px;
    letter-spacing: -1.2px;
  }
  .alt {
    font-size: 18px;
    line-height: 28px;
  }
}
</style>
