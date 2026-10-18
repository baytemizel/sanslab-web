<script setup>
// Figma: "Ana sayfa — sanslab.oditteknoloji.com" (19:4537)
// Masaüstü 16:2370 (1440) · Mobil 17:3369 (390)
import WebNav from './components/WebNav.vue'
import WebFooter from './components/WebFooter.vue'
import HeroSection from './sections/HeroSection.vue'
import GamesSection from './sections/GamesSection.vue'
import FeaturesSection from './sections/FeaturesSection.vue'
import FormulaSection from './sections/FormulaSection.vue'
import ScreensSection from './sections/ScreensSection.vue'
import PremiumSection from './sections/PremiumSection.vue'
import HonestySection from './sections/HonestySection.vue'
</script>

<template>
  <div class="site">
    <WebNav />
    <main>
      <HeroSection />
      <GamesSection id="oyunlar" />
      <FeaturesSection id="ozellikler" />
      <FormulaSection id="sansformulu" />
      <ScreensSection id="ekranlar" />
      <PremiumSection id="premium" />
      <HonestySection />
    </main>
    <WebFooter />
  </div>
</template>

<style scoped>
.site {
  min-height: 100dvh;
  background: var(--arka-plan-alt);
  overflow-x: clip;
}
main > :deep(section[id]) {
  scroll-margin-top: 64px;
}
@media (min-width: 1024px) {
  main > :deep(section[id]) {
    scroll-margin-top: 80px;
  }
}
</style>
