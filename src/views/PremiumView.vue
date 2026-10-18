<script setup>
// Figma: 15 · Premium (satın alma) (11:2310)
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ScreenShell from '@/components/ScreenShell.vue'
import CloseButton from '@/components/CloseButton.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import PremiumOrb from '@/components/premium/PremiumOrb.vue'
import BenefitList from '@/components/premium/BenefitList.vue'
import PlanCard from '@/components/premium/PlanCard.vue'
import StatusToast from '@/components/settings/StatusToast.vue'
import { LINKS, RESTORE_MESSAGE } from '@/components/settings/links'
import { goBack } from '@/lib/goBack'
import { store } from '@/store'

const router = useRouter()

const benefits = [
  'Reklamları tamamen kaldır',
  'Tüm üretim modları: Dengeli · Az Paylaşılan · ŞansFormülü',
  'Sınırsıza yakın kupon geçmişi ve favoriler',
  'Geçmişini tek dokunuşla dışa aktar',
  'Geliştirmeyi destekle, yeni özelliklere erken eriş',
]
const plans = [
  { id: 'aylik', title: 'Aylık', price: '$0,49', note: 'Her ay yenilenir' },
  { id: 'yillik', title: 'Yıllık', price: '$4,90', note: 'Aylık $0,41', badge: '%17 tasarruf' },
]
const selectedPlan = ref('yillik')

function onPlanKey(e) {
  if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return
  e.preventDefault()
  const i = plans.findIndex((p) => p.id === selectedPlan.value)
  const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1
  const next = (i + step + plans.length) % plans.length
  selectedPlan.value = plans[next].id
  e.currentTarget.children[next]?.focus()
}

function purchase() {
  // TODO: mağaza / ödeme entegrasyonu — şimdilik demo: seçilen plan ne olursa olsun Premium etkinleşir.
  store.premium = true
  router.replace({ name: 'home' })
}

const toast = ref(null)
function restore() {
  // TODO: mağaza / ödeme entegrasyonu
  toast.value?.show(store.premium ? 'Premium üyeliğin zaten etkin.' : RESTORE_MESSAGE)
}
</script>

<template>
  <ScreenShell :top="8" :bottom="24" :gutter="24">
    <div class="kapat-satiri">
      <CloseButton @click="goBack({ name: 'home' })" />
    </div>

    <PremiumOrb class="kure" />
    <h1 class="baslik">Premium</h1>
    <p class="alt-baslik">Reklamsız deneyim, tüm modlar ve sınırsız geçmiş</p>

    <BenefitList class="avantajlar" :items="benefits" />

    <h2 id="odeme-periyodu" class="periyot">Ödeme periyodu</h2>
    <div class="planlar" role="radiogroup" aria-labelledby="odeme-periyodu" @keydown="onPlanKey">
      <PlanCard
        v-for="p in plans"
        :key="p.id"
        :title="p.title"
        :price="p.price"
        :note="p.note"
        :badge="p.badge"
        :selected="selectedPlan === p.id"
        @select="selectedPlan = p.id"
      />
    </div>

    <PrimaryButton class="cta" @click="purchase">Premium'a Geç</PrimaryButton>
    <button type="button" class="geri-yukle t-baglanti" @click="restore">Satın Alımları Geri Yükle</button>

    <p class="yasal">
      Ödeme, onaydan sonra mağaza hesabından tahsil edilir. Abonelik, dönem bitiminden en az 24 saat önce iptal
      edilmezse otomatik yenilenir. Aboneliği mağaza hesabı ayarlarından yönetebilir veya iptal edebilirsin.
    </p>
    <nav class="yasal-baglantilar" aria-label="Yasal bağlantılar">
      <a :href="LINKS.terms" target="_blank" rel="noopener">Kullanım Koşulları</a>
      <span class="ayrac" aria-hidden="true">·</span>
      <a :href="LINKS.privacy" target="_blank" rel="noopener">Gizlilik Politikası</a>
    </nav>

    <StatusToast ref="toast" />
  </ScreenShell>
</template>

<style scoped>
.kapat-satiri {
  display: flex;
  justify-content: flex-end;
}
.kure {
  align-self: center;
  margin-top: 30px;
}
.baslik {
  margin-top: 26px;
  font: italic 800 26px/normal var(--font-playfair);
  letter-spacing: 0.3px;
  color: var(--metin-birincil);
  text-align: center;
}
.alt-baslik {
  margin-top: 2px;
  font: 400 13px/20px var(--font-inter);
  color: var(--metin-ikincil);
  opacity: 0.7;
  text-align: center;
}
.avantajlar {
  margin-top: 26px;
}
.periyot {
  margin-top: 24px;
  font: 700 11.5px/normal var(--font-inter);
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--metin-ikincil);
  opacity: 0.75;
}
.planlar {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-top: 10px;
}
.cta {
  margin-top: 22px;
  color: #fff;
}
.geri-yukle {
  align-self: stretch;
  padding: 16px 0;
  color: var(--metin-ikincil);
  text-align: center;
}
.yasal {
  font: 400 11px/16px var(--font-inter);
  color: var(--metin-ikincil);
  text-align: center;
}
.yasal-baglantilar {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  white-space: nowrap;
}
.yasal-baglantilar a {
  font: 600 11.5px/normal var(--font-inter);
  color: var(--vurgu-altin);
}
.ayrac {
  font: 400 11px/16px var(--font-inter);
  color: var(--metin-ikincil);
}
</style>
