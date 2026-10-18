<script setup>
// "Slayt" — onboarding içeriği (Figma 6:5): altın ikon kutusu, başlık, açıklama, isteğe bağlı çekiliş topları.
import AppIcon from '@/components/AppIcon.vue'
import DrawBall from '@/components/DrawBall.vue'

defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  balls: { type: Array, default: null }, // [{ n, color }]
})
</script>

<template>
  <section class="slayt">
    <span class="ikon-kutu" aria-hidden="true">
      <AppIcon :name="icon" :size="32" color="var(--vurgu-altin-ustu)" />
    </span>
    <h1 class="baslik t-onboarding">{{ title }}</h1>
    <p class="aciklama t-govde-onboarding ikincil">{{ text }}</p>
    <div v-if="balls" class="toplar" aria-hidden="true">
      <DrawBall v-for="b in balls" :key="b.n" :number="b.n" :color="b.color" :size="44" />
    </div>
  </section>
</template>

<style scoped>
.slayt {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 32px;
  text-align: center;
}
.ikon-kutu {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 74px;
  height: 74px;
  border-radius: 24px;
  background: var(--vurgu-altin-dolgu);
}
.baslik {
  margin-top: 28px;
  width: 100%;
  max-width: 326px;
  color: var(--metin-birincil);
}
.aciklama {
  margin-top: 14px;
  width: 100%;
  max-width: 326px;
}
.toplar {
  display: flex;
  gap: 9px;
  margin-top: 26px;
  padding: 0 9px 9px 0;
}
</style>
