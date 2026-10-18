<script setup>
// Figma: Ekranlar — masaüstü 16:2626 / mobil 17:3599
import SectionHeading from '../components/SectionHeading.vue'
import PhoneShot from '../components/screens/PhoneShot.vue'
import ekranOyun from '@/assets/web/ekran-oyun.webp'
import ekranIstatistik from '@/assets/web/ekran-istatistik.webp'
import ekranGecmis from '@/assets/web/ekran-gecmis.webp'
import ekranAnaSayfa from '@/assets/web/ekran-ana-sayfa-acik.webp'

// mobil: true → mobil Figma çerçevesinde de görünür (mobilde yalnızca 2 telefon var)
const phones = [
  { src: ekranOyun, mobil: true, alt: 'Sayısal Loto oyun ekranı: üretim modu seçimi ve üretilen kupon (koyu tema)' },
  { src: ekranIstatistik, mobil: false, alt: 'Sayısal Loto sayı istatistikleri ekranı: en sık ve en seyrek çıkan sayılar' },
  { src: ekranGecmis, mobil: false, alt: 'Kupon geçmişi ekranı: favoriler ve oyunlara göre kayıtlı kuponlar' },
  { src: ekranAnaSayfa, mobil: true, alt: 'Açık temada ana sayfa: oyun seçimi ve Premium şeridi' },
]
</script>

<template>
  <section class="ekranlar">
    <SectionHeading
      eyebrow="EKRANLAR"
      title="Gece Çekilişi tasarımı"
      subtitle="Koyu ve açık temada, her ekran aynı imza dille."
    />
    <div class="telefonlar">
      <PhoneShot
        v-for="p in phones"
        :key="p.src"
        :src="p.src"
        :alt="p.alt"
        class="telefonlar__oge"
        :class="{ 'telefonlar__oge--genis': !p.mobil }"
      />
    </div>
  </section>
</template>

<style scoped>
.ekranlar {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px 20px 64px;
  /* telefon parlamaları yanlardan taşmasın */
  overflow-x: clip;
}
.telefonlar {
  display: flex;
  gap: 14px;
  justify-content: center;
}
.telefonlar__oge {
  flex: 0 1 165.6px;
  min-width: 0;
}
.telefonlar__oge--genis {
  display: none;
}

/* Tablet: dört telefonun hepsi tek satırda */
@media (min-width: 640px) {
  .telefonlar {
    gap: 24px;
  }
  .telefonlar__oge {
    flex-basis: 256.68px;
  }
  .telefonlar__oge--genis {
    display: block;
  }
}

@media (min-width: 1024px) {
  .ekranlar {
    gap: 56px;
    padding: 48px max(20px, calc((100% - 1200px) / 2)) 112px;
  }
  .telefonlar {
    gap: 32px;
  }
}
</style>
