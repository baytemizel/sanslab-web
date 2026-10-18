<script setup>
// Boş durum — "Adillik sonucu" kartının görsel diliyle (altın ikon kutusu + Sora başlık + açıklama).
import AppIcon from '@/components/AppIcon.vue'

defineProps({
  filtered: { type: Boolean, default: false }, // filtre sonucu boşsa
})
defineEmits(['reset'])
</script>

<template>
  <section class="bos">
    <span class="ikon">
      <AppIcon :name="filtered ? 'filter' : 'clock'" :size="18" color="var(--vurgu-altin-ustu)" />
    </span>
    <template v-if="filtered">
      <h2 class="baslik">Bu filtrede kupon yok</h2>
      <p class="aciklama">Başka bir filtre seç ya da tüm kuponlarını görüntüle.</p>
      <button type="button" class="baglanti t-baglanti" @click="$emit('reset')">Tümünü göster</button>
    </template>
    <template v-else>
      <h2 class="baslik">Henüz kupon yok</h2>
      <p class="aciklama">Ürettiğin kuponlar burada saklanır. Favorilere eklediklerin her zaman korunur.</p>
      <RouterLink :to="{ name: 'home' }" class="baglanti t-baglanti">
        <AppIcon name="plus" :size="15" color="var(--vurgu-altin)" />
        Kupon üret
      </RouterLink>
    </template>
  </section>
</template>

<style scoped>
.bos {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 28px 20px 20px;
  border-radius: 20px;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
  text-align: center;
}
.ikon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  margin-bottom: 10px;
  border-radius: 12px;
  background: var(--vurgu-altin-dolgu);
}
.baslik {
  font: 700 16px/normal var(--font-sora);
  color: var(--metin-birincil);
}
.aciklama {
  max-width: 260px;
  font: 400 13px/19px var(--font-inter);
  color: var(--metin-ikincil);
}
.baglanti {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  margin-top: 14px;
  padding: 13px 0;
  border-radius: 14px;
  border: 1px solid var(--cizgi-kenar);
  color: var(--metin-birincil);
}
</style>
