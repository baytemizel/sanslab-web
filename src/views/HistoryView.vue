<script setup>
// Figma: 12 · Kupon Geçmişi (9:1714)
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import ScreenShell from '@/components/ScreenShell.vue'
import NavHeader from '@/components/NavHeader.vue'
import FilterChip from '@/components/FilterChip.vue'
import AppIcon from '@/components/AppIcon.vue'
import QuotaCard from '@/components/history/QuotaCard.vue'
import CouponCard from '@/components/history/CouponCard.vue'
import EmptyHistory from '@/components/history/EmptyHistory.vue'
import { GAMES, gameById } from '@/data/games'
import { store, toggleFavorite, removeCoupon, clearHistory, markHistorySeen } from '@/store'

const router = useRouter()
onMounted(markHistorySeen)

// Ücretsiz katmanda favori sınırı (3) dolduysa Premium ekranına yönlendirilir.
function onFavorite(id) {
  if (!toggleFavorite(id)) router.push({ name: 'premium' })
}

// En yeni en üstte
const coupons = computed(() => [...store.coupons].sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0)))
const favoriteCount = computed(() => store.coupons.filter((c) => c.favorite).length)
const countLabel = computed(() => `${store.coupons.length} kupon · ${favoriteCount.value} favori`)

// Çipler: Tümü, ★ Favoriler, ardından geçmişte bulunan oyunlar (oyun sırasıyla)
const filters = computed(() => {
  const present = new Set(store.coupons.map((c) => c.gameId))
  return [
    { id: 'all', label: 'Tümü' },
    { id: 'fav', label: '★ Favoriler' },
    ...GAMES.filter((g) => present.has(g.id)).map((g) => ({ id: g.id, label: g.name })),
  ]
})
const filter = ref('all')
watch(filters, (list) => {
  if (!list.some((f) => f.id === filter.value)) filter.value = 'all'
})

const visible = computed(() => {
  if (filter.value === 'all') return coupons.value
  if (filter.value === 'fav') return coupons.value.filter((c) => c.favorite)
  return coupons.value.filter((c) => c.gameId === filter.value)
})

function onRemove(id) {
  removeCoupon(id)
}

const removable = computed(() => store.coupons.length - favoriteCount.value)
function onClearAll() {
  if (!removable.value) {
    window.alert('Silinecek kupon yok. Favori kuponlar korunur; silmek için önce favoriden çıkar.')
    return
  }
  const msg = favoriteCount.value
    ? `${removable.value} kupon silinecek. Favorilerin (${favoriteCount.value}) korunur. Devam edilsin mi?`
    : `Tüm kuponlar (${removable.value}) silinecek. Devam edilsin mi?`
  if (window.confirm(msg)) clearHistory()
}

// Dışa aktarma Premium özelliği; ücretsiz katmanda Premium ekranına yönlendirir.
const pad = (n) => String(n).padStart(2, '0')
function onExport() {
  if (!store.premium) {
    router.push({ name: 'premium' })
    return
  }
  const fmt = new Intl.DateTimeFormat('tr-TR', { dateStyle: 'short', timeStyle: 'short' })
  const lines = coupons.value.map((c) => {
    const g = gameById(c.gameId)
    let line = `${fmt.format(new Date(c.createdAt))}\t${g?.name ?? c.gameId}\t${c.numbers.map(pad).join(' ')}`
    if (c.extra?.length) line += `\t${g?.extra?.label ?? '+'}: ${c.extra.map(pad).join(' ')}`
    if (c.favorite) line += '\t★'
    return line
  })
  const blob = new Blob([`ŞansLab kupon geçmişi\n\n${lines.join('\n')}\n`], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `sanslab-kuponlar-${new Date().toISOString().slice(0, 10)}.txt`
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <ScreenShell :top="0" :bottom="40">
    <NavHeader title="Kupon Geçmişi" />

    <QuotaCard class="kota" :premium="store.premium" />

    <template v-if="store.coupons.length">
      <div class="filtreler" role="toolbar" aria-label="Kupon filtreleri">
        <FilterChip v-for="f in filters" :key="f.id" :selected="filter === f.id" @click="filter = f.id">
          {{ f.label }}
        </FilterChip>
      </div>

      <h2 class="sayac">{{ countLabel }}</h2>

      <TransitionGroup v-if="visible.length" tag="div" name="kupon" class="kuponlar">
        <CouponCard
          v-for="c in visible"
          :key="c.id"
          :coupon="c"
          @favorite="onFavorite"
          @remove="onRemove"
        />
      </TransitionGroup>
      <EmptyHistory v-else class="kuponlar" filtered @reset="filter = 'all'" />

      <div class="alt-aksiyonlar">
        <button type="button" class="alt-buton" @click="onExport">
          <AppIcon :name="store.premium ? 'download' : 'lock'" :size="15" color="var(--vurgu-altin)" />
          <span>Dışa aktar</span>
        </button>
        <button type="button" class="alt-buton alt-buton--sil" @click="onClearAll">
          <AppIcon name="trash-2" :size="15" color="var(--metin-ikincil)" />
          <span>Tümünü sil</span>
        </button>
      </div>
    </template>

    <EmptyHistory v-else class="bos" />
  </ScreenShell>
</template>

<style scoped>
.kota {
  margin-top: 12px;
}
.filtreler {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  margin: 16px calc(-1 * var(--ekran-yan, 20px)) 0;
  min-height: 38px;
  padding: 0 var(--ekran-yan, 20px);
  overflow-x: auto;
  scrollbar-width: none;
  overscroll-behavior-x: contain;
}
.filtreler::-webkit-scrollbar {
  display: none;
}
.sayac {
  margin-top: 18px;
  font: 700 11.5px/14px var(--font-inter);
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--metin-ikincil);
}
.kuponlar {
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin-top: 12px;
}
.kupon-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.kupon-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
.kupon-move {
  transition: transform 0.2s ease;
}
.alt-aksiyonlar {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
.alt-buton {
  display: flex;
  flex: 1 0 0;
  min-width: 0;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: 13px 0;
  border-radius: 14px;
  border: 1px solid var(--cizgi-kenar);
  font: 600 13.5px/normal var(--font-inter);
  color: var(--metin-birincil);
  white-space: nowrap;
}
.alt-buton:active {
  background: var(--yuzey-kart);
}
.alt-buton--sil {
  color: var(--metin-ikincil);
}
.bos {
  margin-top: 16px;
}
</style>
