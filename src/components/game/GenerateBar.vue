<script setup>
// "Alt sabit alan" — görünüm alanının altına sabit; reklam alanı (ücretsiz katman) + Üret butonu (Figma 8:891).
import PrimaryButton from '../PrimaryButton.vue'

defineProps({
  color: { type: String, required: true },
  label: { type: String, default: 'Üret' },
  showAd: { type: Boolean, default: true },
})
defineEmits(['generate'])
</script>

<template>
  <div class="alt-sabit">
    <div class="ic">
      <div v-if="showAd" class="banner" aria-label="Reklam alanı">
        <span>Reklam alanı · AdMob uyarlanabilir banner</span>
      </div>
      <PrimaryButton variant="game" :color="color" icon="refresh-cw" @click="$emit('generate')">{{ label }}</PrimaryButton>
    </div>
  </div>
</template>

<style scoped>
.alt-sabit {
  position: fixed;
  z-index: 5;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  pointer-events: none;
}
.ic {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: var(--ekran-genislik);
  /* Figma: pt 24, pb 44 (34 ana ekran çubuğu + 10) */
  padding: 24px 20px calc(var(--alt-bosluk) + 10px);
  background: linear-gradient(to bottom, rgba(10, 9, 24, 0) 0%, #0a0918 30%, #0a0918 100%);
  pointer-events: auto;
}
.banner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  padding: 0 12px;
  border-radius: 8px;
  background: var(--yuzey-kart);
  border: 1px dashed var(--cizgi-kenar);
  text-align: center;
}
.banner span {
  font: 400 11px/16px var(--font-inter);
  color: var(--metin-ikincil);
  opacity: 0.7;
}
</style>
