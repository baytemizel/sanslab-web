<script setup>
// "Kupon" kartı — başlık satırı (oyun adı + tarih, yıldız/kopyala/sil), ana sayılar ve varsa ek top.
import { computed, ref } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import DrawBall from '@/components/DrawBall.vue'
import { gameById } from '@/data/games'

const props = defineProps({
  coupon: { type: Object, required: true },
})
const emit = defineEmits(['favorite', 'remove'])

// Ek top etiketi: Figma'da Şans Topu kuponunda "+1" yerine "Şans Topu" yazar.
const EXTRA_LABELS = { 'sans-topu': 'Şans Topu' }

const game = computed(() => gameById(props.coupon.gameId))
const color = computed(() => game.value?.color ?? 'var(--oyun-sayisal)')
const extra = computed(() => props.coupon.extra ?? [])
const extraLabel = computed(() => EXTRA_LABELS[props.coupon.gameId] ?? game.value?.extra?.label ?? 'Ek sayı')


const pad = (n) => String(n).padStart(2, '0')
const copied = ref(false)
let timer
async function copy() {
  let text = `${game.value?.name ?? ''}: ${props.coupon.numbers.map(pad).join(' ')}`
  if (extra.value.length) text += ` · ${extraLabel.value}: ${extra.value.map(pad).join(' ')}`
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => (copied.value = false), 1500)
  } catch {
    window.prompt('Kuponu kopyala:', text)
  }
}
</script>

<template>
  <article class="kupon">
    <header class="baslik-satiri">
      <div class="sol">
        <h2 class="oyun-adi">{{ game?.name ?? 'Kupon' }}</h2>
      </div>
      <div class="aksiyonlar">
        <button
          type="button"
          class="aksiyon"
          :class="{ favori: coupon.favorite }"
          :aria-pressed="coupon.favorite"
          :aria-label="coupon.favorite ? 'Favorilerden çıkar' : 'Favorilere ekle'"
          @click="emit('favorite', coupon.id)"
        >
          <AppIcon name="star" :size="14" :color="coupon.favorite ? 'var(--vurgu-altin-dolgu)' : 'var(--metin-ikincil)'" />
        </button>
        <button type="button" class="aksiyon" :aria-label="copied ? 'Kopyalandı' : 'Sayıları kopyala'" @click="copy">
          <AppIcon :name="copied ? 'check' : 'copy'" :size="14" :color="copied ? 'var(--vurgu-altin)' : 'var(--metin-ikincil)'" />
        </button>
        <button type="button" class="aksiyon" aria-label="Kuponu sil" @click="emit('remove', coupon.id)">
          <AppIcon name="trash-2" :size="14" color="var(--metin-ikincil)" />
        </button>
      </div>
    </header>

    <h3 class="etiket">Ana Sayılar</h3>
    <div class="toplar">
      <DrawBall v-for="n in coupon.numbers" :key="`a${n}`" :number="n" :color="color" :size="32" />
    </div>

    <template v-if="extra.length">
      <hr class="ayrac" />
      <h3 class="etiket etiket--ek" :style="{ color }">{{ extraLabel }}</h3>
      <div class="toplar">
        <DrawBall v-for="n in extra" :key="`e${n}`" :number="n" :color="color" :size="32" special />
      </div>
    </template>
  </article>
</template>

<style scoped>
.kupon {
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 22px;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
}
.baslik-satiri {
  display: flex;
  min-height: 30px;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
}
.sol {
  display: flex;
  flex: 1 0 0;
  min-width: 0;
  gap: 8px;
  align-items: baseline;
}
.oyun-adi {
  font: 600 12.5px/normal var(--font-inter);
  letter-spacing: 0.3px;
  color: var(--metin-ikincil);
  white-space: nowrap;
}
.aksiyonlar {
  display: flex;
  gap: 7px;
  flex-shrink: 0;
}
.aksiyon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid var(--cizgi-kenar);
  transition: background 0.12s ease;
}
.aksiyon:active {
  background: var(--cizgi-kenar);
}
.aksiyon.favori :deep(svg) {
  fill: var(--vurgu-altin-dolgu);
}
.etiket {
  margin-top: 12px;
  font: 700 10.5px/13px var(--font-inter);
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  color: var(--metin-ikincil);
}
.toplar {
  display: flex;
  flex-wrap: wrap;
  gap: 14px 21px;
  justify-content: center;
  margin-top: 12px;
}
@media (max-width: 360px) {
  .toplar {
    column-gap: 8px;
  }
}
.ayrac {
  width: 100%;
  height: 1px;
  margin: 22px 0 0;
  border: 0;
  background: var(--cizgi-ince);
}
.etiket--ek {
  margin-top: 20px;
}
</style>
