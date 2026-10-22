<script setup>
// "Oyun/…" kartı — masaüstü 16:2491 / mobil 17:3464
import { ref, onMounted, onBeforeUnmount } from 'vue'
import GlowOrb from '@/components/GlowOrb.vue'
import { useLocale } from '../../i18n'

defineProps({
  id: { type: String, required: true },
  name: { type: String, required: true },
  color: { type: String, required: true },
  rule: { type: String, required: true }, // ikincil renkli satır
  extra: { type: String, default: '' }, // oyun renginde vurgulu satır
})

const { t } = useLocale()

// Küre: mobil 44px, masaüstü 52px
const mq = typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)') : null
const orbSize = ref(mq?.matches ? 52 : 44)
const onChange = (e) => (orbSize.value = e.matches ? 52 : 44)
onMounted(() => mq?.addEventListener('change', onChange))
onBeforeUnmount(() => mq?.removeEventListener('change', onChange))
</script>

<template>
  <RouterLink
    class="oyun-karti"
    :to="{ name: 'game', params: { gameId: id } }"
    target="_blank"
    rel="noopener"
    :aria-label="`${name} — ${t.games.tryDemo}`"
  >
    <GlowOrb :color="color" :size="orbSize" />
    <h3 class="ad">{{ name }}</h3>
    <p class="kural">
      <span>{{ rule }}</span>
      <span v-if="extra" class="ek" :style="{ color }">{{ extra }}</span>
    </p>
  </RouterLink>
</template>

<style scoped>
.oyun-karti {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  min-width: 0;
  padding: 20px 18px;
  border-radius: 22px;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
  color: inherit;
  text-decoration: none;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;
}
.oyun-karti:hover {
  border-color: var(--cizgi-altin-ton);
  transform: translateY(-2px);
}
.oyun-karti:focus-visible {
  outline: 2px solid var(--vurgu-altin);
  outline-offset: 3px;
}
.ad {
  font: 700 17px/normal var(--font-sora);
  letter-spacing: -0.3px;
  color: var(--metin-birincil);
}
.kural {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font: 400 13.5px/normal var(--font-inter);
  color: var(--metin-ikincil);
}
.ek {
  font-weight: 600;
}

@media (min-width: 1024px) {
  .oyun-karti {
    gap: 14px;
    padding: 24px 22px;
  }
  .ad {
    font-size: 20px;
  }
  .kural {
    font-size: 14px;
  }
}
</style>
