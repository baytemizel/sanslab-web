<script setup>
// Figma: Premium — masaüstü 16:3060 / mobil 17:3730
import SectionHeading from '../components/SectionHeading.vue'
import PlanCard from '../components/premium/PlanCard.vue'

const freeFeatures = [
  'Tüm 5 oyun',
  "Tekli ve 10'lu kupon",
  'Tam Rastgele modu',
  'Sayı istatistikleri',
  'Son 10 kupon ve 3 favori',
  'Reklam destekli',
]
const premiumFeatures = [
  'Reklamsız deneyim',
  'Dengeli · Az Paylaşılan · ŞansFormülü',
  'Sınırsıza yakın geçmiş ve favoriler',
  'Geçmişi tek dokunuşla dışa aktar',
  'Yeni özelliklere erken erişim',
]
</script>

<template>
  <section class="premium">
    <SectionHeading eyebrow="PREMIUM" title="Temel ücretsiz, Premium ayrıcalık" />

    <div class="planlar">
      <PlanCard class="plan-ucretsiz" title="Ücretsiz" price="$0" period="her zaman" :features="freeFeatures" />
      <PlanCard
        class="plan-premium"
        variant="premium"
        title="Premium"
        price="$4,90"
        period="/ yıl  ·  ya da $0,49 / ay"
        :features="premiumFeatures"
      >
        <!-- Premium uygulama içinden alınır → indirme bandına götürür -->
        <a class="cta" href="#indir">Uygulamada Premium'a geç</a>
      </PlanCard>
    </div>

    <p class="yasal">
      Abonelik mağaza hesabından faturalandırılır; dönem bitiminden en az 24 saat önce iptal edilmezse otomatik
      yenilenir.
    </p>
  </section>
</template>

<style scoped>
.premium {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px 20px 64px;
}
.planlar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 560px;
  margin-inline: auto;
}
/* Mobilde Premium kartı önce gelir */
.plan-premium {
  order: -1;
}
.cta {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 8px 4px;
  border-radius: 16px;
  background-image: linear-gradient(170.26deg, rgb(255, 216, 118) 0%, rgb(244, 192, 74) 50%, rgb(224, 160, 46) 100%);
  font: 700 16px/normal var(--font-inter);
  color: var(--vurgu-altin-ustu);
  text-align: center;
  transition: filter 0.15s ease;
}
.cta:hover {
  filter: brightness(1.05);
}
.yasal {
  font: 400 12.5px/18px var(--font-inter);
  color: var(--metin-ikincil);
  text-align: center;
}

@media (min-width: 1024px) {
  .premium {
    gap: 56px;
    padding: 48px max(20px, calc((100% - 1200px) / 2)) 112px;
  }
  .planlar {
    flex-direction: row;
    gap: 24px;
    align-items: flex-start;
    justify-content: center;
    max-width: none;
  }
  .planlar > * {
    flex: 0 1 460px;
    min-width: 0;
  }
  .plan-premium {
    order: 0;
  }
  .cta {
    min-height: 54px;
    background-image: linear-gradient(172.02deg, rgb(255, 216, 118) 0%, rgb(244, 192, 74) 50%, rgb(224, 160, 46) 100%);
  }
  .yasal {
    font-size: 13px;
    line-height: 19px;
  }
}
</style>
