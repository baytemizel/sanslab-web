<script setup>
// Figma: Premium — masaüstü 16:3060 / mobil 17:3730
import SectionHeading from '../components/SectionHeading.vue'
import PlanCard from '../components/premium/PlanCard.vue'

import { useLocale } from '../i18n'

const { t } = useLocale()
</script>

<template>
  <section class="premium">
    <SectionHeading :eyebrow="t.premium.eyebrow" :title="t.premium.title" />

    <div class="planlar">
      <PlanCard
        class="plan-ucretsiz"
        :title="t.premium.free.title"
        :price="t.premium.free.price"
        :period="t.premium.free.period"
        :features="t.premium.freeFeatures"
      />
      <PlanCard
        class="plan-premium"
        variant="premium"
        :title="t.premium.paid.title"
        :price="t.premium.paid.price"
        :period="t.premium.paid.period"
        :features="t.premium.premiumFeatures"
      >
        <!-- Premium uygulama içinden alınır → indirme bandına götürür -->
        <a class="cta" href="#indir">{{ t.premium.cta }}</a>
      </PlanCard>
    </div>

    <p class="yasal">{{ t.premium.legal }}</p>
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
