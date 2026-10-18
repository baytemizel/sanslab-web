<script setup>
// "Web/Mağaza Rozeti" — App Store / Google Play
import appStoreLogo from '@/assets/web/app-store-logo.svg'
import googlePlayLogo from '@/assets/web/google-play-logo.svg'
import { STORE_LINKS } from '../links'

const props = defineProps({
  store: { type: String, default: 'app-store' }, // app-store | google-play
})
const isGoogle = props.store === 'google-play'
</script>

<template>
  <a class="rozet" :href="isGoogle ? STORE_LINKS.googlePlay : STORE_LINKS.appStore" target="_blank" rel="noopener">
    <img
      :src="isGoogle ? googlePlayLogo : appStoreLogo"
      :width="isGoogle ? 24 : 26"
      height="26"
      alt=""
    />
    <span class="metin">
      <span class="ust">{{ isGoogle ? "Google Play'den" : "App Store'dan" }}</span>
      <span class="alt">İndir</span>
    </span>
  </a>
</template>

<style scoped>
.rozet {
  display: inline-flex;
  gap: 12px;
  align-items: center;
  height: 60px;
  padding: 0 22px 0 18px;
  border-radius: 14px;
  background: #000;
  border: 1px solid rgba(255, 255, 255, 0.28);
  color: #fff;
  white-space: nowrap;
  transition: border-color 0.15s ease;
}
.rozet:hover {
  border-color: rgba(255, 255, 255, 0.5);
}
.rozet img {
  flex-shrink: 0;
}
.metin {
  display: flex;
  flex-direction: column;
  line-height: normal;
}
.ust {
  font: 500 11.5px/normal var(--font-inter);
}
.alt {
  font: 700 19px/normal var(--font-inter);
  letter-spacing: -0.2px;
}
</style>
