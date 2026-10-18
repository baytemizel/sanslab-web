<script setup>
// "Boş durum" — kesikli çerçeve + oyun rengi küre (Figma 8:788).
// Küre Figma'da tek bir daire (oyun rengi, %50 opaklık); oyun rengine göre CSS ile çizilir.
defineProps({
  color: { type: String, required: true },
})
</script>

<template>
  <div class="bos-durum">
    <span class="kure" :style="{ background: color }" aria-hidden="true" />
    <p>Üretmek için aşağıdaki butona dokun</p>
  </div>
</template>

<style scoped>
.bos-durum {
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  padding: 46px 16px;
  border-radius: 22px;
  border: 1.5px dashed var(--cizgi-kenar);
  text-align: center;
}
.kure {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  opacity: 0.5;
}
p {
  font: 400 13.5px/20px var(--font-inter);
  color: var(--metin-ikincil);
}
</style>
