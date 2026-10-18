<script setup>
// Figma: 14 · Ayarlar — Sorumlu Oyun (11:2056): "Karartma" (11:2291) + "Alt sayfa" (11:2292).
// /ayarlar/sorumlu-oyun alt rotası; Ayarlar ekranının üstünde açılır.
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import AppIcon from '@/components/AppIcon.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'

const router = useRouter()
const sheet = ref(null)
const open = ref(false)
let previousFocus = null

function close() {
  // Ayarlar'dan açıldıysa geri gidilir (geçmişte fazladan kayıt kalmaz), doğrudan açıldıysa üst rotaya geçilir.
  const settingsPath = router.resolve({ name: 'settings' }).fullPath
  if (window.history.state?.back === settingsPath) router.back()
  else router.replace({ name: 'settings' })
}

function onKey(e) {
  if (e.key === 'Escape') {
    e.preventDefault()
    close()
    return
  }
  // Basit odak tuzağı: Tab, sayfa içinde döner.
  if (e.key === 'Tab' && sheet.value) {
    const items = sheet.value.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')
    if (!items.length) return
    const first = items[0]
    const last = items[items.length - 1]
    if (e.shiftKey && (document.activeElement === first || document.activeElement === sheet.value)) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

onMounted(() => {
  previousFocus = document.activeElement
  open.value = true
  document.addEventListener('keydown', onKey)
  document.documentElement.style.overflow = 'hidden'
  requestAnimationFrame(() => sheet.value?.focus())
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  document.documentElement.style.overflow = ''
  if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus()
})
</script>

<template>
  <Teleport to="body">
    <div class="katman">
      <Transition name="karartma" appear>
        <div v-if="open" class="karartma" aria-hidden="true" @click="close" />
      </Transition>
      <Transition name="alt-sayfa" appear>
        <section
          v-if="open"
          ref="sheet"
          class="alt-sayfa"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sorumlu-oyun-baslik"
          tabindex="-1"
        >
          <span class="ikon"><AppIcon name="shield" :size="24" color="var(--vurgu-altin-ustu)" /></span>
          <h2 id="sorumlu-oyun-baslik" class="baslik">Sorumlu Oyun</h2>
          <p class="metin">
            Şans oyunları eğlence amaçlıdır, gelir kaynağı değildir. Bütçeni aşma, kaybettiklerini geri kazanmaya
            çalışma. Oyun alışkanlığın seni kaygılandırıyorsa Yeşilay danışma hattına (115) başvurabilirsin.
          </p>
          <PrimaryButton class="kapat" @click="close">Kapat</PrimaryButton>
        </section>
      </Transition>
    </div>
  </Teleport>
</template>

<style scoped>
.katman {
  position: fixed;
  inset: 0;
  z-index: 20;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.karartma {
  position: absolute;
  inset: 0;
  background: var(--kaplama-modal, rgba(5, 4, 15, 0.7));
}
.alt-sayfa {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: var(--ekran-genislik);
  max-height: 100dvh;
  overflow-y: auto;
  padding: 26px 26px calc(var(--alt-bosluk) + 26px);
  border-radius: 28px 28px 0 0;
  background: var(--yuzey-kart-dolu, #1c1947);
  border: 1px solid var(--cizgi-kenar);
  border-bottom: 0;
  outline: none;
}
.ikon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 16px;
  background: var(--vurgu-altin-dolgu);
}
.baslik {
  margin-top: 14px;
  font: 800 20px/normal var(--font-sora);
  letter-spacing: -0.3px;
  color: var(--metin-birincil);
  text-align: center;
}
.metin {
  margin-top: 12px;
  font: 400 14px/22px var(--font-inter);
  color: var(--metin-ikincil);
  text-align: center;
}
.kapat {
  margin-top: 22px;
  flex-shrink: 0;
}

.karartma-enter-active,
.karartma-leave-active {
  transition: opacity 0.25s ease;
}
.karartma-enter-from,
.karartma-leave-to {
  opacity: 0;
}
.alt-sayfa-enter-active {
  transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}
.alt-sayfa-enter-from {
  transform: translateY(100%);
}
@media (prefers-reduced-motion: reduce) {
  .karartma-enter-active,
  .alt-sayfa-enter-active {
    transition: none;
  }
}
</style>
