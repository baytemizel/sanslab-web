<script setup>
// "Avantajlar" (11:2329) — altın onay işaretli avantaj listesi.
import AppIcon from '@/components/AppIcon.vue'

defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <ul class="avantajlar">
    <li v-for="item in items" :key="item" class="avantaj">
      <span class="onay" aria-hidden="true"><AppIcon name="check" :size="13" color="var(--vurgu-altin-ustu)" /></span>
      <span class="metin">{{ item }}</span>
    </li>
  </ul>
</template>

<style scoped>
.avantajlar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0;
  padding: 20px;
  list-style: none;
  border-radius: 22px;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
}
.avantaj {
  display: flex;
  gap: 13px;
  align-items: center;
}
.onay {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--vurgu-altin-dolgu);
}
.metin {
  flex: 1 0 0;
  min-width: 0;
  font: 500 13.5px/normal var(--font-inter);
  color: var(--metin-birincil);
}
</style>
