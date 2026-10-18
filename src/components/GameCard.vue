<script setup>
// "Oyun Kartı" — parlayan renk küresi + isim + kural özeti.
import AppIcon from './AppIcon.vue'
import GlowOrb from './GlowOrb.vue'

defineProps({
  name: { type: String, required: true },
  rule: { type: String, required: true },
  color: { type: String, required: true },
  to: { type: [String, Object], required: true },
})
</script>

<template>
  <RouterLink :to="to" class="oyun-karti">
    <GlowOrb :color="color" />
    <span class="metin">
      <span class="t-kart-baslik">{{ name }}</span>
      <span class="t-govde-s ikincil">{{ rule }}</span>
    </span>
    <AppIcon name="chevron-right" :size="20" color="var(--vurgu-altin)" />
  </RouterLink>
</template>

<style scoped>
.oyun-karti {
  display: flex;
  gap: 15px;
  align-items: center;
  width: 100%;
  padding: 14px;
  border-radius: 22px;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
  transition: background 0.15s ease;
}
.oyun-karti:hover {
  background: rgba(255, 255, 255, 0.08);
}
.metin {
  display: flex;
  flex: 1 0 0;
  min-width: 0;
  flex-direction: column;
  gap: 3px;
}
.metin .t-kart-baslik {
  white-space: nowrap;
}
</style>
