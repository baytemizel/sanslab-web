<script setup>
// Figma: 11 · İstatistik — Sayısal Loto (9:1417). Her oyun için çalışır.
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ScreenShell from '@/components/ScreenShell.vue'
import NavHeader from '@/components/NavHeader.vue'
import AppIcon from '@/components/AppIcon.vue'
import DrawBall from '@/components/DrawBall.vue'
import FrequencyChart from '@/components/stats/FrequencyChart.vue'
import FairnessCard from '@/components/stats/FairnessCard.vue'
import { gameById } from '@/data/games'
import { simulateDraws, DEFAULT_DRAWS } from '@/lib/stats'

const route = useRoute()
const game = computed(() => gameById(route.params.gameId))
const result = ref(null)

function run() {
  if (game.value) result.value = simulateDraws(game.value, DEFAULT_DRAWS)
}
watch(game, run, { immediate: true })

const fmt = new Intl.NumberFormat('tr-TR')
const drawsLabel = computed(() => `${fmt.format(result.value?.draws ?? DEFAULT_DRAWS)} çekiliş`)
const rangeLabel = computed(() => `${game.value.main.min}–${game.value.main.max}`)
const detail = computed(() => {
  const r = result.value
  if (!r) return ''
  const p = r.pValue < 0.001 ? '< 0,001' : `= ${r.pValue.toLocaleString('tr-TR', { maximumFractionDigits: 3 })}`
  return `χ² = ${r.chiSquare.toLocaleString('tr-TR', { maximumFractionDigits: 1 })} (sd ${r.df}), p ${p}`
})
</script>

<template>
  <ScreenShell v-if="game && result" :top="0" :bottom="40">
    <NavHeader title="Sayı İstatistikleri" :fallback="{ name: 'game', params: { gameId: game.id } }" />

    <section class="oyun-basligi">
      <span class="renk-cubugu" :style="{ background: game.color }" />
      <div class="metin">
        <h2 class="oyun-adi">{{ game.name }}</h2>
        <p class="t-govde-s ikincil">{{ drawsLabel }} · Geçmiş çekilişlerde sayı sıklığı</p>
      </div>
    </section>

    <div class="uyari">
      <AppIcon name="alert-circle" :size="15" color="var(--vurgu-altin)" />
      <p>Bu veriler geçmişe aittir ve geleceği TAHMİN ETMEZ. Adil bir çekilişte her sayının olasılığı eşittir.</p>
    </div>

    <h3 class="aralik t-etiket-bolum">{{ rangeLabel }}</h3>
    <FrequencyChart
      class="grafik"
      :items="result.items"
      :max-count="result.maxCount"
      :expected="result.expected"
      :most="result.mostFrequent"
      :least="result.leastFrequent"
      :color="game.color"
    />

    <ul class="aciklama" aria-label="Grafik açıklaması">
      <li><span class="isaret nokta" :style="{ background: game.color }" />En sık</li>
      <li><span class="isaret nokta seyrek" />En seyrek</li>
      <li><span class="isaret cizgi" />Beklenen</li>
    </ul>

    <h3 class="bolum t-etiket-bolum">En sık</h3>
    <div class="toplar">
      <DrawBall v-for="n in result.mostFrequent" :key="`s${n}`" :number="n" :color="game.color" :size="42" />
    </div>

    <h3 class="bolum bolum--ikinci t-etiket-bolum">En seyrek</h3>
    <div class="toplar">
      <DrawBall v-for="n in result.leastFrequent" :key="`y${n}`" :number="n" :color="game.color" :size="42" />
    </div>

    <FairnessCard class="adillik" :fair="result.fair" :detail="detail" />

    <button type="button" class="ornek-buton t-baglanti" @click="run">
      <AppIcon name="refresh-cw" :size="15" color="var(--vurgu-altin)" />
      Örnek veriyle göster
    </button>

    <p class="dipnot">Örnek: adil çekilişler yerel olarak simüle edildi. Gerçek sürümde resmi geçmiş veri yüklenir.</p>
  </ScreenShell>
</template>

<style scoped>
.oyun-basligi {
  display: flex;
  gap: 14px;
  align-items: center;
  margin-top: 12px;
  padding: 15px;
  border-radius: 20px;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
}
.renk-cubugu {
  width: 14px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 7px;
}
.oyun-basligi .metin {
  display: flex;
  flex: 1 0 0;
  min-width: 0;
  flex-direction: column;
  gap: 3px;
}
.oyun-adi {
  font: 800 20px/1 var(--font-sora);
  letter-spacing: -0.3px;
  color: var(--metin-birincil);
  padding: 2.5px 0; /* Figma satır kutusu 25px */
}
.uyari {
  display: flex;
  gap: 9px;
  align-items: flex-start;
  margin-top: 16px;
  padding: 13px;
  border-radius: 16px;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
}
.uyari p {
  flex: 1 0 0;
  min-width: 0;
  font: 400 12px/17px var(--font-inter);
  color: var(--metin-ikincil);
}
.aralik {
  margin-top: 22px;
}
.grafik {
  margin-top: 10px;
}
.aciklama {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 18px;
  justify-content: center;
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
}
.aciklama li {
  display: flex;
  gap: 6px;
  align-items: center;
  white-space: nowrap;
  font: 400 11.5px/17px var(--font-inter);
  color: var(--metin-ikincil);
}
.isaret.nokta {
  width: 10px;
  height: 10px;
  border-radius: 5px;
}
.isaret.seyrek {
  background: var(--metin-ikincil);
}
.isaret.cizgi {
  width: 14px;
  height: 3px;
  border-radius: 2px;
  background: var(--vurgu-altin);
}
.bolum {
  margin-top: 22px;
  text-align: center;
}
.bolum--ikinci {
  margin-top: 24px;
}
.toplar {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  justify-content: center;
  margin-top: 16px;
}
/* Dar ekranlarda 5 topun tek satırda kalması için aralık daralır */
@media (max-width: 340px) {
  .toplar {
    gap: 12px;
  }
}
.adillik {
  margin-top: 24px;
}
.ornek-buton {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  padding: 13px 0;
  border-radius: 14px;
  border: 1px solid var(--cizgi-kenar);
  color: var(--metin-birincil);
  transition: background 0.12s ease;
}
.ornek-buton:active {
  background: var(--yuzey-kart);
}
.dipnot {
  margin-top: 14px;
  font: 400 11px/16px var(--font-inter);
  color: var(--metin-ikincil);
  text-align: center;
}
</style>
