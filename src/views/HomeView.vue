<script setup>
// Figma: 06 · Ana Sayfa (8:524)
import { computed } from 'vue'
import ScreenShell from '@/components/ScreenShell.vue'
import IconButton from '@/components/IconButton.vue'
import DrawBall from '@/components/DrawBall.vue'
import GameCard from '@/components/GameCard.vue'
import InfoNote from '@/components/InfoNote.vue'
import AppIcon from '@/components/AppIcon.vue'
import { GAMES } from '@/data/games'
import { hasNewHistory } from '@/store'

const heroBalls = [
  { n: 7, color: '#f5333b' },
  { n: 23, color: '#ffa62b' },
  { n: 34, color: '#ff49a3' },
  { n: 11, color: '#9d62ff' },
  { n: 49, color: '#6c8bff' },
]
const showDot = computed(() => hasNewHistory())
</script>

<template>
  <ScreenShell :top="14" :bottom="44">
    <header class="ust-cubuk">
      <h1 class="marka t-marka">Şans<span class="altin">Lab</span></h1>
      <nav class="aksiyonlar">
        <IconButton icon="clock" label="Kupon geçmişi" :to="{ name: 'history' }" :dot="showDot" />
        <IconButton icon="settings" label="Ayarlar" :to="{ name: 'settings' }" />
      </nav>
    </header>

    <h2 class="hero t-hero">Şansını dene,<br />kuponunu üret</h2>
    <p class="alt-baslik t-govde-l ikincil">Kupon oluşturmak istediğin oyunu seç</p>

    <div class="hero-toplar" aria-hidden="true">
      <DrawBall v-for="b in heroBalls" :key="b.n" :number="b.n" :color="b.color" :size="44" />
    </div>

    <RouterLink :to="{ name: 'premium' }" class="premium-seridi">
      <span class="tac"><AppIcon name="star" :size="16" color="var(--vurgu-altin-ustu)" /></span>
      <span class="metin">
        <span class="t-premium-m">Premium</span>
        <span class="t-govde-s ikincil">Reklamsız deneyim, tüm modlar ve sınırsız geçmiş</span>
      </span>
      <AppIcon name="chevron-right" :size="20" color="var(--vurgu-altin)" />
    </RouterLink>

    <h3 class="bolum t-etiket-bolum">Bir oyun seç</h3>
    <div class="oyunlar">
      <GameCard
        v-for="g in GAMES"
        :key="g.id"
        :name="g.name"
        :rule="g.rule"
        :color="g.color"
        :to="{ name: 'game', params: { gameId: g.id } }"
      />
    </div>

    <InfoNote class="not">
      Bu uygulama yalnızca sayı üretir. Hiçbir çekilişle resmi bağlantısı yoktur ve kazanmayı garanti etmez.
    </InfoNote>
  </ScreenShell>
</template>

<style scoped>
.ust-cubuk {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.marka {
  white-space: nowrap;
}
.aksiyonlar {
  display: flex;
  gap: 10px;
}
.hero {
  margin-top: 26px;
}
.alt-baslik {
  margin-top: 8px;
  max-width: 300px;
}
.hero-toplar {
  display: flex;
  gap: 25px;
  margin-top: 22px;
  padding: 0 9px 9px 0;
}
/* Dar ekranlarda topların sığması için aralık daralır */
@media (max-width: 370px) {
  .hero-toplar {
    gap: clamp(9px, calc((100vw - 40px - 220px - 9px) / 4), 25px);
  }
}
.premium-seridi {
  display: flex;
  gap: 13px;
  align-items: center;
  margin-top: 22px;
  padding: 15px;
  border-radius: 20px;
  background: var(--yuzey-promo);
  border: 1px solid var(--cizgi-promo);
}
.tac {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--vurgu-altin-dolgu);
}
.premium-seridi .metin {
  display: flex;
  flex: 1 0 0;
  min-width: 0;
  flex-direction: column;
  gap: 2px;
}
.bolum {
  margin-top: 26px;
}
.oyunlar {
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin-top: 14px;
}
.not {
  margin-top: 21px;
}
</style>
