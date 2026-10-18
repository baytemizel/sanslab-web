<script setup>
// "Simge Butonu" — üst çubuk ve geri butonu: 42×42, köşe 14, cam kart dolgusu.
import AppIcon from './AppIcon.vue'

defineProps({
  icon: { type: String, required: true },
  label: { type: String, required: true },
  to: { type: [String, Object], default: null },
  dot: { type: Boolean, default: false }, // "Yeni kayıt noktası"
  iconColor: { type: String, default: 'var(--metin-birincil)' },
})
defineEmits(['click'])
</script>

<template>
  <component :is="to ? 'RouterLink' : 'button'" :to="to || undefined" :type="to ? undefined : 'button'" class="simge-buton" :aria-label="label" @click="$emit('click', $event)">
    <AppIcon :name="icon" :size="19" :color="iconColor" />
    <img v-if="dot" class="nokta" src="@/assets/yeni-kayit-noktasi.svg" width="7" height="7" alt="" />
  </component>
</template>

<style scoped>
.simge-buton {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 14px;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
}
.nokta {
  position: absolute;
  left: 26px;
  top: 8px;
}
</style>
