<script setup>
// Figma: Oyunlar — masaüstü 16:2484 / mobil 17:3457
import { computed } from 'vue'
import { GAMES } from '@/data/games.js'
import SectionHeading from '../components/SectionHeading.vue'
import GameCard from '../components/games/GameCard.vue'
import { useLocale } from '../i18n'

const { t } = useLocale()
// Kural satırları Figma'daki iki satırlı yazımla (games.js'teki tek satırlık özetten farklı)
const cards = computed(() =>
  GAMES.map((g) => ({ ...g, rule: t.value.games.rules[g.id][0], extra: t.value.games.rules[g.id][1] })),
)
</script>

<template>
  <section class="oyunlar">
    <SectionHeading :eyebrow="t.games.eyebrow" :title="t.games.title" :subtitle="t.games.subtitle" />
    <div class="kartlar">
      <GameCard
        v-for="c in cards"
        :id="c.id"
        :key="c.id"
        :name="c.name"
        :color="c.color"
        :rule="c.rule"
        :extra="c.extra"
      />
    </div>
  </section>
</template>

<style scoped>
.oyunlar {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 64px max(20px, calc((100% - 1200px) / 2));
}
.kartlar {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  align-items: start;
}
@media (min-width: 640px) {
  .kartlar {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (min-width: 1024px) {
  .oyunlar {
    gap: 56px;
    padding-block: 112px;
  }
  .kartlar {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 20px;
  }
}
</style>
