<script setup>
// "Sayı/…" kartı — masaüstü 16:2614 / mobil 17:3587
defineProps({
  value: { type: String, required: true },
  label: { type: String, required: true },
})
</script>

<template>
  <div class="sayi">
    <p class="deger">{{ value }}</p>
    <p class="etiket">{{ label }}</p>
  </div>
</template>

<style scoped>
.sayi {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  padding: 18px 16px;
  border-radius: 18px;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
}
.deger {
  font: 800 26px/normal var(--font-sora);
  letter-spacing: -0.8px;
  color: var(--vurgu-altin);
  white-space: nowrap;
}
.etiket {
  font: 400 13px/18px var(--font-inter);
  color: var(--metin-ikincil);
}
@media (min-width: 1024px) {
  .sayi {
    padding: 22px 20px;
    border-radius: 20px;
  }
  .deger {
    font-size: 34px;
    letter-spacing: -1px;
  }
  .etiket {
    font-size: 13.5px;
    line-height: 19px;
  }
}
</style>
