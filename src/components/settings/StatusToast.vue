<script setup>
// Kısa bilgi mesajı (ör. "Satın Alımları Geri Yükle" sonucu). Figma'da karşılığı yok; mevcut kart stilleriyle çizilir.
import { ref, onBeforeUnmount } from 'vue'

const message = ref('')
let timer = 0

function show(text, ms = 2600) {
  message.value = text
  clearTimeout(timer)
  timer = setTimeout(() => (message.value = ''), ms)
}
onBeforeUnmount(() => clearTimeout(timer))
defineExpose({ show })
</script>

<template>
  <div class="toast-alani" role="status" aria-live="polite">
    <Transition name="toast">
      <p v-if="message" class="toast t-govde-s">{{ message }}</p>
    </Transition>
  </div>
</template>

<style scoped>
.toast-alani {
  position: fixed;
  left: 50%;
  bottom: calc(var(--alt-bosluk) + 24px);
  z-index: 30;
  width: min(350px, calc(100% - 40px));
  transform: translateX(-50%);
  pointer-events: none;
}
.toast {
  padding: 12px 16px;
  border-radius: 16px;
  background: var(--yuzey-kart-dolu, #1c1947);
  border: 1px solid var(--cizgi-kenar);
  color: var(--metin-birincil);
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
@media (prefers-reduced-motion: reduce) {
  .toast-enter-active,
  .toast-leave-active {
    transition: none;
  }
}
</style>
