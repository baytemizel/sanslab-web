<script setup>
// Figma: 01–04 · Onboarding 1/4 (6:2), 2/4 (6:153), 3/4 (6:282), 4/4 (6:403)
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ScreenShell from '@/components/ScreenShell.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import OnboardingSlide from '@/components/onboarding/OnboardingSlide.vue'
import PageDots from '@/components/onboarding/PageDots.vue'
import { store } from '@/store'

const SLIDES = [
  {
    icon: 'zap',
    title: "ŞansLab'a hoş geldin",
    text: 'Sayısal Loto, Süper Loto, Şans Topu, On Numara ve Hızlı On için saniyeler içinde kupon üret. Üyelik gerekmez.',
    balls: [
      { n: 7, color: 'var(--oyun-sayisal)' },
      { n: 23, color: 'var(--oyun-super)' },
      { n: 34, color: 'var(--oyun-sans-topu)' },
      { n: 11, color: 'var(--oyun-on-numara)' },
      { n: 49, color: 'var(--oyun-hizli-on)' },
    ],
  },
  {
    icon: 'sliders',
    title: 'Dört üretim modu',
    text: 'Tam Rastgele herkese açık. Dengeli Dağılım, Az Paylaşılan ve ŞansFormülü modları kombinasyonun görünümünü ve beklenen paylaşımını değiştirir.',
  },
  {
    icon: 'shield',
    title: 'Dürüst olalım',
    text: 'Hiçbir mod kazanma olasılığını artırmaz. Her çekiliş bağımsızdır ve her sayının şansı eşittir. Az Paylaşılan modu yalnızca kazanman hâlinde ikramiyeyi daha az kişiyle paylaşma ihtimalini yükseltir.',
  },
  {
    icon: 'alert-circle',
    title: 'Önemli bilgilendirme',
    text: 'ŞansLab bağımsız bir sayı üretme aracıdır. Milli Piyango veya herhangi bir resmi operatörle bağlantısı yoktur, bilet satmaz ve para kazandırmaz. 18 yaşından küçükler kullanamaz.',
  },
]
const LAST = SLIDES.length

const route = useRoute()
const router = useRouter()

const step = computed(() => {
  const n = Number(route.params.step || 1)
  return Number.isInteger(n) && n >= 1 && n <= LAST ? n : 1
})
const slide = computed(() => SLIDES[step.value - 1])
const isLast = computed(() => step.value === LAST)

// Geçiş yönü: ileri = sola kayar, geri = sağa kayar
const direction = ref('ileri')
watch(step, (n, o) => {
  direction.value = n > o ? 'ileri' : 'geri'
})

function goTo(n) {
  if (n < 1 || n > LAST || n === step.value) return
  router.replace({ name: 'onboarding', params: { step: String(n) } })
}
const next = () => goTo(step.value + 1)
const prev = () => goTo(step.value - 1)

// "Atla": yasal bilgilendirme (18 yaş onayı) atlanamaz, bu yüzden son adıma geçer.
const skip = () => goTo(LAST)

function finish() {
  store.onboardingDone = true
  router.replace({ name: 'login' })
}

// Kaydırma (pointer) ile adım değiştirme
let startX = null
let startY = 0
function onPointerDown(e) {
  if (e.pointerType === 'mouse' && e.button !== 0) return
  startX = e.clientX
  startY = e.clientY
}
function onPointerUp(e) {
  if (startX === null) return
  const dx = e.clientX - startX
  const dy = e.clientY - startY
  startX = null
  if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return
  dx < 0 ? next() : prev()
}
const onPointerCancel = () => (startX = null)

// Klavye okları
function onKey(e) {
  if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return
  if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
}
onMounted(() => {
  window.addEventListener('keydown', onKey)
  // Geçersiz adım parametresi → 1. adım
  if (String(step.value) !== route.params.step) router.replace({ name: 'onboarding', params: { step: String(step.value) } })
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <ScreenShell :top="0" :bottom="20" :gutter="0">
    <!-- Üst çubuk (6:3) -->
    <div class="ust-cubuk">
      <button v-if="!isLast" type="button" class="atla t-baglanti ikincil" @click="skip">Atla</button>
    </div>

    <!-- Slayt (6:5) -->
    <main
      class="slayt-alani"
      @pointerdown="onPointerDown"
      @pointerup="onPointerUp"
      @pointercancel="onPointerCancel"
    >
      <Transition :name="`kay-${direction}`" mode="out-in">
        <OnboardingSlide
          :key="step"
          :icon="slide.icon"
          :title="slide.title"
          :text="slide.text"
          :balls="slide.balls"
        />
      </Transition>
    </main>

    <!-- Sayfa noktaları (6:40) -->
    <PageDots class="noktalar" :count="LAST" :current="step" @select="goTo" />

    <!-- Alt bölüm (6:45 / 6:420) -->
    <div class="alt-bolum">
      <PrimaryButton v-if="!isLast" @click="next">Devam</PrimaryButton>
      <template v-else>
        <PrimaryButton @click="finish">Anladım, başla</PrimaryButton>
        <p class="onay">Devam ederek 18 yaşından büyük olduğunu ve yukarıdaki bilgilendirmeyi okuduğunu onaylarsın.</p>
      </template>
    </div>
  </ScreenShell>
</template>

<style scoped>
.ust-cubuk {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 44px;
  padding: 0 22px;
}
.atla {
  padding: 8px 0;
}
.slayt-alani {
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  touch-action: pan-y;
  user-select: none;
}
.noktalar {
  align-self: center;
  padding-bottom: 22px;
}
.alt-bolum {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0 24px;
}
.onay {
  font: 400 11px/16px var(--font-inter);
  color: var(--metin-ikincil);
  text-align: center;
}

/* Slayt geçişleri */
.kay-ileri-enter-active,
.kay-ileri-leave-active,
.kay-geri-enter-active,
.kay-geri-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.kay-ileri-enter-from,
.kay-geri-leave-to {
  opacity: 0;
  transform: translateX(32px);
}
.kay-ileri-leave-to,
.kay-geri-enter-from {
  opacity: 0;
  transform: translateX(-32px);
}
@media (prefers-reduced-motion: reduce) {
  .kay-ileri-enter-active,
  .kay-ileri-leave-active,
  .kay-geri-enter-active,
  .kay-geri-leave-active {
    transition: none;
  }
}
</style>
