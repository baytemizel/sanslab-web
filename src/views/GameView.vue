<script setup>
// Figma: 07 · Oyun — Sayısal Loto (boş) 8:745, 08 · kupon üretildi 8:904,
// 09 · Şans Topu (10 kupon) 8:1118, 10 · Hızlı On (Premium mod seçili) 8:1788.
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ScreenShell from '@/components/ScreenShell.vue'
import ScreenHeader from '@/components/ScreenHeader.vue'
import AppIcon from '@/components/AppIcon.vue'
import GameTitleCard from '@/components/game/GameTitleCard.vue'
import ModePicker from '@/components/game/ModePicker.vue'
import SegmentedControl from '@/components/game/SegmentedControl.vue'
import NumberCountPicker from '@/components/game/NumberCountPicker.vue'
import EmptyState from '@/components/game/EmptyState.vue'
import CouponCard from '@/components/game/CouponCard.vue'
import GenerateBar from '@/components/game/GenerateBar.vue'
import { gameById } from '@/data/games'
import { generateCoupons, modeById, modesForGame } from '@/lib/generator'
import { store, addCoupons } from '@/store'

const route = useRoute()
const router = useRouter()

const game = computed(() => gameById(route.params.gameId))
const modes = computed(() => modesForGame(game.value.id))

const mode = ref('tam-rastgele')
const couponCount = ref(1)
const numberCount = ref(game.value.main.count)
const coupons = ref([])

// Aynı bileşen başka bir oyun için yeniden kullanılırsa durum sıfırlanır.
watch(
  () => route.params.gameId,
  () => {
    if (!game.value) return
    mode.value = 'tam-rastgele'
    couponCount.value = 1
    numberCount.value = game.value.main.count
    coupons.value = []
  },
)

const selectedMode = computed(() => modeById(mode.value))
const locked = computed(() => selectedMode.value.premium && !store.premium)
const selectable = computed(() => game.value.main.selectable)

const countOptions = [
  { value: 1, label: 'Tek Kupon' },
  { value: 10, label: '10 Kupon' },
]

let seq = 0
function generate() {
  // Premium modlar ücretsiz katmanda kilitli: Üret'e basınca Premium ekranına yönlendirilir.
  if (locked.value) {
    router.push({ name: 'premium' })
    return
  }
  const list = generateCoupons(
    game.value,
    mode.value,
    couponCount.value,
    selectable.value ? numberCount.value : game.value.main.count,
  )
  addCoupons(list)
  seq += 1
  coupons.value = list.map((c, i) => ({ ...c, key: `${seq}-${i}` }))
}

const showAd = computed(() => !store.premium)
// Figma: içerik sonu ile çerçeve sonu arası 170px (alt sabit alan içeriğin 14px üstüne biner).
// Reklam alanı (50 + 8) premium'da gizlenince boşluk da kısalır.
const bottomPad = computed(() => (showAd.value ? 136 : 78))
</script>

<template>
  <ScreenShell v-if="game" :top="8" :bottom="bottomPad">
    <ScreenHeader :icon-color="game.color" />

    <GameTitleCard
      class="oyun-basligi"
      :name="game.name"
      :rule="game.rule"
      :color="game.color"
      :stats-to="{ name: 'stats', params: { gameId: game.id } }"
    />

    <h2 class="etiket bolum-ilk">Üretim Modu</h2>
    <ModePicker v-model="mode" class="etiket-alti" :modes="modes" :color="game.color" />
    <div class="mod-aciklamasi">
      <AppIcon v-if="locked" name="lock" :size="11" color="var(--vurgu-altin)" />
      <p>{{ selectedMode.description }}</p>
    </div>

    <template v-if="selectable">
      <h2 class="etiket bolum">Sayı Adedi: {{ numberCount }}</h2>
      <NumberCountPicker
        v-model="numberCount"
        class="etiket-alti"
        :min="selectable.min"
        :max="selectable.max"
        :color="game.color"
      />
    </template>

    <h2 class="etiket bolum">Kuponların</h2>
    <SegmentedControl
      v-model="couponCount"
      class="etiket-alti"
      label="Kupon sayısı"
      :options="countOptions"
      :color="game.color"
    />

    <EmptyState v-if="!coupons.length" class="sonuc" :color="game.color" />
    <template v-else>
      <div class="sonuc kuponlar">
        <CouponCard
          v-for="(c, i) in coupons"
          :key="c.key"
          :game="game"
          :coupon="c"
          :title="coupons.length > 1 ? `Kolon ${i + 1}` : ''"
        />
      </div>
      <RouterLink :to="{ name: 'history' }" class="gecmis-baglantisi">
        <AppIcon name="clock" :size="14" color="var(--vurgu-altin)" />
        <span>Bu kuponlar geçmişine kaydedildi</span>
      </RouterLink>
    </template>

    <p class="uyari">Her çekiliş bağımsızdır; geçmiş sonuçlar gelecek sonuçları tahmin etmez.</p>

    <GenerateBar :color="game.color" :label="coupons.length ? 'Tekrar Üret' : 'Üret'" :show-ad="showAd" @generate="generate" />
  </ScreenShell>
</template>

<style scoped>
.oyun-basligi {
  margin-top: 18px;
}
/* Etiket/Alan */
.etiket {
  font: 700 11.5px/normal var(--font-inter);
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--metin-ikincil);
  opacity: 0.75;
}
.bolum-ilk {
  margin-top: 24px;
}
.bolum {
  margin-top: 22px;
}
.etiket-alti {
  margin-top: 10px;
}
.mod-aciklamasi {
  display: flex;
  gap: 5px;
  align-items: center;
  margin-top: 10px;
}
.mod-aciklamasi p {
  flex: 1 0 0;
  min-width: 0;
  font: 400 11.5px/16px var(--font-inter);
  color: var(--metin-ikincil);
  opacity: 0.75;
}
.sonuc {
  margin-top: 24px;
}
.kuponlar {
  display: flex;
  flex-direction: column;
  gap: 13px;
}
.gecmis-baglantisi {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 17px;
  padding: 12px;
  border-radius: 14px;
  border: 1px solid var(--cizgi-kenar);
  font: 600 13px/normal var(--font-inter);
  color: var(--metin-birincil);
  text-align: center;
  transition: background 0.15s ease;
}
.gecmis-baglantisi:hover {
  background: var(--yuzey-kart);
}
.uyari {
  margin-top: 14px;
  font: 400 11px/16px var(--font-inter);
  color: var(--metin-ikincil);
  text-align: center;
}
</style>
