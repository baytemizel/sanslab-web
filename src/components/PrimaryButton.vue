<script setup>
// "Birincil Buton" — Altın (Premium/Devam), Oyun (oyun rengi gradyanı, Üret), Hayalet (çerçeveli).
// Yükseklik 58, köşe 18.
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  variant: { type: String, default: 'gold' }, // gold | game | ghost
  color: { type: String, default: '#f5333b' }, // game varyantı için oyun rengi
  icon: { type: String, default: '' },
  to: { type: [String, Object], default: null },
  disabled: { type: Boolean, default: false },
})

const style = computed(() => {
  if (props.variant !== 'game') return {}
  return {
    backgroundImage: `linear-gradient(170.59deg, color-mix(in srgb, ${props.color}, white 18%) 0%, ${props.color} 50%, color-mix(in srgb, ${props.color}, black 16%) 100%)`,
  }
})
const iconColor = computed(() =>
  props.variant === 'gold' ? 'var(--vurgu-altin-ustu)' : props.variant === 'game' ? '#fff' : 'var(--metin-birincil)',
)
</script>

<template>
  <component
    :is="to ? 'RouterLink' : 'button'"
    :to="to || undefined"
    :type="to ? undefined : 'button'"
    :disabled="to ? undefined : disabled"
    class="buton t-buton-l"
    :class="`buton--${variant}`"
    :style="style"
  >
    <AppIcon v-if="icon" :name="icon" :size="18" :color="iconColor" />
    <span><slot /></span>
  </component>
</template>

<style scoped>
.buton {
  display: flex;
  gap: 9px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 58px;
  padding: 0 22px;
  border-radius: 18px;
  white-space: nowrap;
  transition: transform 0.12s ease, filter 0.12s ease;
}
.buton:active {
  transform: scale(0.985);
}
.buton:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.buton--gold {
  color: var(--vurgu-altin-ustu);
  background-image: linear-gradient(170.59deg, rgb(255, 216, 118) 0%, rgb(244, 192, 74) 50%, rgb(224, 160, 46) 100%);
  filter: drop-shadow(0 6px 9px rgba(244, 192, 74, 0.5));
}
.buton--game {
  color: #fff;
  filter: drop-shadow(0 6px 6px rgba(0, 0, 0, 0.25));
}
.buton--ghost {
  color: var(--metin-birincil);
  border: 1.5px solid var(--cizgi-kenar);
}
</style>
