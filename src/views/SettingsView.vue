<script setup>
// Figma: 13 · Ayarlar (11:1818). "Sorumlu Oyun" alt sayfası (14 · 11:2056) alt rota olarak <RouterView /> içinde açılır.
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ScreenShell from '@/components/ScreenShell.vue'
import ScreenHeader from '@/components/ScreenHeader.vue'
import SettingRow from '@/components/SettingRow.vue'
import SegmentedChoice from '@/components/settings/SegmentedChoice.vue'
import StatusToast from '@/components/settings/StatusToast.vue'
import { LINKS, APP_VERSION, RESTORE_MESSAGE } from '@/components/settings/links'
import { store } from '@/store'

const route = useRoute()
const sheetOpen = computed(() => route.name === 'responsible-gaming')

const accountRow = computed(() =>
  store.user
    ? { label: store.user.name || store.user.email, value: '', to: { name: 'account' } }
    : { label: 'Misafir kullanıcı', value: 'Giriş yap', to: { name: 'login' } },
)

const languages = [
  { value: 'tr', label: 'Türkçe' },
  { value: 'en', label: 'English' },
]
// TODO: Açık tema — Figma'da yalnızca "Tema=Açık" arka plan varyantı (3:228) var, açık ekranlar yok.
// Seçim saklanır; uygulama şimdilik her durumda koyu temayla çizilir.
const themes = [
  { value: 'sistem', label: 'Sistem' },
  { value: 'acik', label: 'Açık' },
  { value: 'koyu', label: 'Koyu' },
]

const toast = ref(null)
function restorePurchases() {
  // TODO: mağaza / ödeme entegrasyonu
  toast.value?.show(store.premium ? 'Premium üyeliğin zaten etkin.' : RESTORE_MESSAGE)
}
</script>

<template>
  <ScreenShell :top="8" :bottom="44">
    <div class="icerik" :inert="sheetOpen || undefined">
      <ScreenHeader title="Ayarlar" />

      <h2 class="bolum bolum--ilk t-etiket-bolum">Hesap</h2>
      <div class="grup">
        <SettingRow icon="user" :label="accountRow.label" :value="accountRow.value" :chevron="!!store.user" :to="accountRow.to" />
        <SettingRow icon="clock" label="Kupon Geçmişi" :value="String(store.coupons.length)" :to="{ name: 'history' }" />
        <SettingRow class="premium-satir" icon="star" label="Premium" chevron :to="{ name: 'premium' }" />
      </div>

      <h2 class="bolum t-etiket-bolum">Dil</h2>
      <SegmentedChoice v-model="store.language" class="secim" label="Dil" :options="languages" />

      <h2 class="bolum t-etiket-bolum">Tema</h2>
      <SegmentedChoice v-model="store.theme" class="secim" label="Tema" :options="themes" />

      <h2 class="bolum t-etiket-bolum">Hakkında</h2>
      <div class="grup">
        <SettingRow icon="shield" label="Sorumlu Oyun" chevron :to="{ name: 'responsible-gaming' }" />
        <SettingRow icon="lock" label="Gizlilik Politikası" chevron :href="LINKS.privacy" />
        <SettingRow icon="file-text" label="Kullanım Koşulları" chevron :href="LINKS.terms" />
        <SettingRow icon="mail" label="Destek" chevron :href="LINKS.support" />
        <SettingRow icon="refresh-ccw" label="Satın Alımları Geri Yükle" chevron @click="restorePurchases" />
        <div class="surum"><SettingRow icon="info" label="Sürüm" :value="APP_VERSION" static /></div>
      </div>
    </div>

    <StatusToast ref="toast" />
    <RouterView />
  </ScreenShell>
</template>

<style scoped>
.icerik {
  display: flex;
  flex-direction: column;
}
.bolum {
  margin-top: 26px;
}
.bolum--ilk {
  margin-top: 18px;
}
.grup {
  display: flex;
  flex-direction: column;
  gap: 11px;
  margin-top: 12px;
}
.secim {
  margin-top: 12px;
}
/* Ayar Satırı / Premium varyantı */
.premium-satir {
  background: var(--yuzey-altin-ton);
  border-color: var(--cizgi-altin-ton, rgba(244, 192, 74, 0.28));
}
.premium-satir :deep(.ikon-kutusu) {
  background: var(--yuzey-altin-ton-guclu, rgba(244, 192, 74, 0.2));
}
.premium-satir :deep(.etiket) {
  font: italic 800 17px/normal var(--font-playfair);
}
/* Sürüm satırı yalnızca bilgi gösterir, etkileşimli değildir */
.surum {
  display: flex;
}
.surum :deep(.ayar-satiri) {
  cursor: default;
}
</style>
