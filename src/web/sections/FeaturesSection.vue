<script setup>
// Figma: Özellikler — masaüstü 16:2529 / mobil 17:3502
import SectionHeading from '../components/SectionHeading.vue'
import FeatureCard from '../components/features/FeatureCard.vue'

const features = [
  { icon: 'zap', title: 'Saniyeler içinde kupon', text: 'Oyun seç, dokun — tekli ya da tek dokunuşla 10 kupon. İkisi de ücretsiz.' },
  {
    icon: 'cpu',
    title: 'Kriptografik rastgelelik',
    text: 'CSPRNG + reddetme örneklemesi: modülo yanlılığı yok, her sayı gerçekten eşit olasılıklı.',
  },
  {
    icon: 'sliders',
    title: '4 üretim modu',
    text: 'Tam Rastgele · Dengeli · Az Paylaşılan · ŞansFormülü — her biri ne yaptığını açıkça söyler.',
  },
  {
    icon: 'bar-chart-2',
    title: 'Sayı istatistikleri',
    text: 'Sıklık grafiği, en sık / en seyrek toplar ve “dağılım adil mi?” okuması.',
  },
  {
    icon: 'moon',
    title: 'Gece & Gündüz teması',
    text: 'Parlayan çekiliş topları ve altın vurgularla “Gece Çekilişi” tasarımı; aydınlık varyantıyla.',
  },
  {
    icon: 'globe',
    title: 'TR & EN · çevrimdışı',
    text: 'Tam yerelleştirme; internet olmadan da kupon üretir. Kuponu tek dokunuşla kopyala.',
  },
]
</script>

<template>
  <section class="ozellikler">
    <SectionHeading eyebrow="Özellikler" title="Hızlı, adil, akıllı" />
    <div class="kartlar">
      <FeatureCard v-for="f in features" :key="f.icon" :icon="f.icon" :title="f.title" :text="f.text" />
    </div>
  </section>
</template>

<style scoped>
.ozellikler {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px max(20px, calc((100% - 1200px) / 2)) 64px;
}
.kartlar {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 14px;
  align-items: start;
}
@media (min-width: 768px) {
  .kartlar {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (min-width: 1024px) {
  .ozellikler {
    gap: 56px;
    padding-top: 48px;
    padding-bottom: 112px;
  }
  .kartlar {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
  }
}
</style>
