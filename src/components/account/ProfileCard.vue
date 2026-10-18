<script setup>
// "Profil" (11:2492) — avatar baş harfi, ad, e-posta ve üyelik rozeti.
import { computed } from 'vue'
import AppIcon from '@/components/AppIcon.vue'

const props = defineProps({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  premium: { type: Boolean, default: false },
})
const initial = computed(() => (props.name || props.email || '?').trim().charAt(0).toLocaleUpperCase('tr'))
</script>

<template>
  <section class="profil" aria-label="Profil">
    <span class="avatar" aria-hidden="true">{{ initial }}</span>
    <h2 class="ad">{{ name }}</h2>
    <p class="eposta t-govde-m ikincil">{{ email }}</p>
    <span class="rozet" :class="{ 'rozet--premium': premium }">
      <AppIcon :name="premium ? 'star' : 'user'" :size="12" :color="premium ? 'var(--vurgu-altin)' : 'var(--metin-ikincil)'" />
      {{ premium ? 'Premium' : 'Ücretsiz' }}
    </span>
  </section>
</template>

<style scoped>
.profil {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  border-radius: 24px;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
  text-align: center;
}
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 68px;
  flex-shrink: 0;
  border-radius: 22px;
  background: var(--vurgu-altin-dolgu);
  font: 800 28px/normal var(--font-sora);
  letter-spacing: -0.6px;
  color: var(--vurgu-altin-ustu);
}
.ad {
  max-width: 100%;
  margin-top: 14px;
  font: 800 20px/normal var(--font-sora);
  letter-spacing: -0.3px;
  color: var(--metin-birincil);
  overflow-wrap: anywhere;
}
.eposta {
  max-width: 100%;
  margin-top: 4px;
  overflow-wrap: anywhere;
}
.rozet {
  display: inline-flex;
  gap: 5px;
  align-items: center;
  margin-top: 14px;
  padding: 5px 11px;
  border-radius: 999px;
  border: 1px solid var(--cizgi-kenar);
  font: 700 11.5px/normal var(--font-inter);
  letter-spacing: 0.4px;
  color: var(--metin-ikincil);
  white-space: nowrap;
}
/* Figma'da yalnızca "Ücretsiz" rozeti var; Premium görünümü mevcut altın tokenlarla türetildi. */
.rozet--premium {
  border-color: var(--cizgi-promo);
  color: var(--vurgu-altin);
}
</style>
