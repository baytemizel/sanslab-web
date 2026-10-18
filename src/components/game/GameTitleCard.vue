<script setup>
// "Oyun başlığı" — renk çubuğu + oyun adı/kuralı + İstatistik butonu (Figma 8:753).
import AppIcon from '../AppIcon.vue'

defineProps({
  name: { type: String, required: true },
  rule: { type: String, required: true },
  color: { type: String, required: true },
  statsTo: { type: [String, Object], default: null },
})
</script>

<template>
  <section class="oyun-basligi" :style="{ borderColor: color }">
    <span class="renk-cubugu" :style="{ background: color }" aria-hidden="true" />
    <div class="metin">
      <h1 class="ad">{{ name }}</h1>
      <p class="kural">{{ rule }}</p>
    </div>
    <RouterLink v-if="statsTo" :to="statsTo" class="istatistik t-buton-s">
      <AppIcon name="bar-chart-2" :size="16" :color="color" />
      <span>İstatistik</span>
    </RouterLink>
  </section>
</template>

<style scoped>
.oyun-basligi {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 15px;
  border-radius: 20px;
  border: 1px solid;
  background: var(--yuzey-kart);
}
.renk-cubugu {
  width: 14px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 7px;
}
.metin {
  display: flex;
  flex: 1 0 0;
  min-width: 0;
  flex-direction: column;
  gap: 3px;
}
.ad {
  font: 800 22px/normal var(--font-sora);
  letter-spacing: -0.4px;
  color: var(--metin-birincil);
}
.kural {
  font: 400 13px/20px var(--font-inter);
  color: var(--metin-ikincil);
}
.istatistik {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-shrink: 0;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid var(--cizgi-kenar);
  color: var(--metin-birincil);
  white-space: nowrap;
  transition: background 0.15s ease;
}
.istatistik:hover {
  background: var(--yuzey-kart);
}
</style>
