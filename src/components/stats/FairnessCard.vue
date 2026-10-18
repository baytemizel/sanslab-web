<script setup>
// "Adillik sonucu" — ki-kare uyum testinin sonucu.
import AppIcon from '@/components/AppIcon.vue'

defineProps({
  fair: { type: Boolean, required: true },
  detail: { type: String, default: '' }, // test değerleri (ipucu metni)
})
</script>

<template>
  <section class="adillik" :class="{ sapma: !fair }" :title="detail" aria-live="polite">
    <span class="ikon">
      <AppIcon :name="fair ? 'check' : 'alert-triangle'" :size="18" color="var(--vurgu-altin-ustu)" />
    </span>
    <div class="metin">
      <template v-if="fair">
        <h2 class="baslik">Dağılım adil görünüyor</h2>
        <p class="aciklama">
          Sık ve seyrek sayılar arasındaki fark istatistiksel gürültü sınırında. Sömürülebilir bir yanlılık yok.
        </p>
      </template>
      <template v-else>
        <h2 class="baslik">Beklenenden sapma var</h2>
        <p class="aciklama">
          Bu örnekte sık ve seyrek sayılar arasındaki fark gürültü sınırının üzerinde. Adil çekilişlerde bu nadiren,
          tesadüfen olur; yeni bir örnekle tekrar dene.
        </p>
      </template>
    </div>
  </section>
</template>

<style scoped>
.adillik {
  display: flex;
  gap: 13px;
  align-items: flex-start;
  padding: 16px;
  border-radius: 20px;
  background: var(--yuzey-kart);
  border: 1.5px solid var(--vurgu-altin);
}
.adillik.sapma {
  border-color: var(--cizgi-promo);
}
.ikon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--vurgu-altin-dolgu);
}
.metin {
  display: flex;
  flex: 1 0 0;
  min-width: 0;
  flex-direction: column;
  gap: 4px;
}
.baslik {
  font: 700 16px/normal var(--font-sora);
  color: var(--metin-birincil);
}
.aciklama {
  font: 400 13px/19px var(--font-inter);
  color: var(--metin-ikincil);
}
</style>
