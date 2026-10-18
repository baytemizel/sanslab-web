<script setup>
// Figma: 05 · Giriş (Hoş geldin) (6:526)
import { useRouter } from 'vue-router'
import ScreenShell from '@/components/ScreenShell.vue'
import CloseButton from '@/components/CloseButton.vue'
import appleLogo from '@/assets/onboarding/apple-logo.svg'
import googleLogo from '@/assets/onboarding/google-logo.svg'
import facebookLogo from '@/assets/onboarding/facebook-logo.svg'
import { store } from '@/store'

const router = useRouter()

const PROVIDERS = [
  { id: 'apple', label: 'Apple ile devam et', logo: appleLogo, size: 20 },
  { id: 'google', label: 'Google ile devam et', logo: googleLogo, size: 18 },
  { id: 'facebook', label: 'Facebook ile devam et', logo: facebookLogo, size: 20 },
]

function goHome() {
  store.onboardingDone = true
  router.replace({ name: 'home' })
}

// DEMO: Arka uç yok — sağlayıcıya göre yer tutucu bir kullanıcı oluşturulur.
// TODO: gerçek kimlik doğrulama entegrasyonu
function signIn(provider) {
  store.user = { name: 'Misafir Kullanıcı', email: '', provider }
  goHome()
}
</script>

<template>
  <ScreenShell :top="8" :bottom="8" :gutter="24">
    <!-- Kapat satırı (6:662) -->
    <div class="kapat-satiri">
      <CloseButton @click="goHome" />
    </div>

    <h1 class="baslik">Hoş geldin</h1>
    <p class="aciklama">
      Giriş yapmak zorunlu değildir. Yalnızca Premium'unu ve geçmişini cihazlar arasında taşımak için gerekir.
    </p>

    <div class="esnek-bosluk" />

    <!-- Giriş seçenekleri (6:538) -->
    <div class="secenekler">
      <button
        v-for="p in PROVIDERS"
        :key="p.id"
        type="button"
        class="sosyal"
        :class="`sosyal--${p.id}`"
        @click="signIn(p.id)"
      >
        <img :src="p.logo" alt="" :width="p.size" :height="p.size" />
        <span>{{ p.label }}</span>
      </button>
      <button type="button" class="misafir" @click="goHome">Misafir olarak devam et</button>
    </div>
  </ScreenShell>
</template>

<style scoped>
.kapat-satiri {
  display: flex;
  justify-content: flex-end;
}
.baslik {
  margin-top: 10px;
  font: 800 28px/normal var(--font-sora);
  letter-spacing: -0.6px;
  color: var(--metin-birincil);
}
.aciklama {
  margin-top: 8px;
  font: 400 14.5px/21px var(--font-inter);
  color: var(--metin-ikincil);
}
.esnek-bosluk {
  flex: 1 0 24px;
}
.secenekler {
  display: flex;
  flex-direction: column;
  gap: 11px;
}
.sosyal {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 54px;
  padding: 0 18px;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid;
  font: 600 15.5px/normal var(--font-inter);
  white-space: nowrap;
  transition: transform 0.12s ease;
}
.sosyal:active {
  transform: scale(0.985);
}
.sosyal img {
  display: block;
  flex-shrink: 0;
}
.sosyal--apple {
  background: #fff;
  border-color: #fff;
  color: #000;
}
.sosyal--google {
  background: #131314;
  border-color: #8e918f;
  color: #e3e3e3;
}
.sosyal--facebook {
  background: #1877f2;
  border-color: #1877f2;
  color: #fff;
}
.misafir {
  align-self: center;
  padding: 12px 0 10px;
  font: 600 13.5px/normal var(--font-inter);
  color: var(--metin-ikincil);
  text-decoration: underline;
  text-underline-position: from-font;
}
</style>
