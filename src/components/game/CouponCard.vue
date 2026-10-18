<script setup>
// "Kupon" kartı — başlık satırı (Kolon N + kopyala), ana sayılar, ayraç, ek top (Joker / Şans Topu).
// Figma 8:948 (tek kupon, başlıksız) ve 8:1162 (10 kupon, "Kolon N").
import { computed, ref } from 'vue'
import AppIcon from '../AppIcon.vue'
import DrawBall from '../DrawBall.vue'
import { couponToText } from '@/lib/generator'

const props = defineProps({
  game: { type: Object, required: true },
  coupon: { type: Object, required: true },
  title: { type: String, default: '' },
})

const extraLabel = computed(() => {
  if (!props.game.extra) return ''
  return props.game.extra.label === '+1' ? props.game.name : props.game.extra.label
})

const copied = ref(false)
let timer
// Eski yöntem: Clipboard API kullanılamadığında (izin yok / güvenli olmayan bağlam).
function legacyCopy(text) {
  const ta = document.createElement('textarea')
  ta.value = text
  ta.setAttribute('readonly', '')
  ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none'
  document.body.appendChild(ta)
  ta.select()
  let ok = false
  try {
    ok = document.execCommand('copy')
  } catch {
    ok = false
  }
  ta.remove()
  return ok
}

async function copy() {
  const text = couponToText(props.game, props.coupon)
  let ok = false
  try {
    await navigator.clipboard.writeText(text)
    ok = true
  } catch {
    ok = legacyCopy(text)
  }
  if (!ok) return
  copied.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (copied.value = false), 1600)
}
</script>

<template>
  <article class="kupon">
    <div class="baslik-satiri">
      <div class="sol">
        <template v-if="title">
          <span class="nokta" :style="{ background: game.color }" aria-hidden="true" />
          <span class="kolon">{{ title }}</span>
        </template>
      </div>
      <button type="button" class="kopyala" :aria-label="copied ? 'Kopyalandı' : 'Kuponu kopyala'" @click="copy">
        <AppIcon :name="copied ? 'check' : 'copy'" :size="14" :color="copied ? game.color : 'var(--metin-ikincil)'" />
      </button>
      <span class="sr-only" aria-live="polite">{{ copied ? 'Kopyalandı' : '' }}</span>
    </div>

    <p v-if="game.extra" class="havuz">Ana Sayılar</p>
    <div class="toplar">
      <DrawBall
        v-for="(n, i) in coupon.numbers"
        :key="`${coupon.key}-${n}`"
        class="top"
        :style="{ '--i': i }"
        :number="n"
        :color="game.color"
        :size="32"
      />
    </div>

    <template v-if="game.extra && coupon.extra?.length">
      <hr class="ayrac" />
      <p class="havuz" :style="{ color: game.color }">{{ extraLabel }}</p>
      <div class="toplar">
        <DrawBall
          v-for="n in coupon.extra"
          :key="`${coupon.key}-x${n}`"
          class="top"
          :style="{ '--i': coupon.numbers.length }"
          :number="n"
          :color="game.color"
          :size="32"
          special
        />
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
  align-items: center;
  min-height: 30px;
}
.sol {
  display: flex;
  flex: 1 0 0;
  min-width: 0;
  gap: 8px;
  align-items: center;
}
.nokta {
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 50%;
}
.kolon {
  font: 600 12.5px/normal var(--font-inter);
  letter-spacing: 0.3px;
  color: var(--metin-ikincil);
  white-space: nowrap;
}
.kopyala {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 15px;
  border: 1px solid var(--cizgi-kenar);
  transition: background 0.15s ease;
}
.kopyala:hover {
  background: var(--yuzey-kart);
}
.havuz {
  margin-top: 12px;
  font: 700 10.5px/normal var(--font-inter);
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  color: var(--metin-ikincil);
}
.toplar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px 21px;
  margin-top: 12px;
}
.ayrac {
  width: 100%;
  height: 1px;
  margin: 22px 0 0;
  border: 0;
  background: rgba(255, 255, 255, 0.09);
}
.ayrac + .havuz {
  margin-top: 20px;
}
/* Dar ekranlarda toplar arası boşluk daralır */
@media (max-width: 370px) {
  .toplar {
    gap: 12px 14px;
  }
}

/* Toplar kısa bir "çekiliş" animasyonuyla gelir */
.top {
  animation: top-gel 0.42s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  animation-delay: calc(var(--i, 0) * 55ms);
}
@keyframes top-gel {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.4);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .top {
    animation: none;
  }
}
</style>
