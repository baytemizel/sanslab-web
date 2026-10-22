<script setup>
// Figma: Özellikler — masaüstü 16:2529 / mobil 17:3502
import SectionHeading from '../components/SectionHeading.vue'
import FeatureCard from '../components/features/FeatureCard.vue'

import { useLocale } from '../i18n'

const { t } = useLocale()
</script>

<template>
  <section class="ozellikler">
    <SectionHeading :eyebrow="t.features.eyebrow" :title="t.features.title" />
    <div class="kartlar">
      <FeatureCard v-for="f in t.features.items" :key="f.icon" :icon="f.icon" :title="f.title" :text="f.text" />
    </div>
  </section>
</template>

<style scoped>
.ozellikler {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px max(20px, calc((100% - 1200px) / 2)) 64px;
}
.kartlar {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 14px;
  align-items: start;
}
@media (min-width: 768px) {
  .kartlar {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (min-width: 1024px) {
  .ozellikler {
    gap: 56px;
    padding-top: 48px;
    padding-bottom: 112px;
  }
  .kartlar {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
  }
}
</style>
