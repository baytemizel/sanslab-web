<script setup>
// "Kota bilgisi" — ücretsiz katman sınırı ve Premium bağlantısı.
import AppIcon from '@/components/AppIcon.vue'
import { FREE_HISTORY_LIMIT, FREE_FAVORITE_LIMIT } from '@/store'

defineProps({
  premium: { type: Boolean, default: false },
})
</script>

<template>
  <div class="kota">
    <AppIcon :name="premium ? 'check-circle' : 'info'" :size="14" color="var(--vurgu-altin)" />
    <p v-if="premium" class="metin">Premium: kupon geçmişin sınırsız saklanır.</p>
    <p v-else class="metin">
      Ücretsiz katman: son {{ FREE_HISTORY_LIMIT }} kupon ve {{ FREE_FAVORITE_LIMIT }} favori saklanır. Premium ile sınırsız.
    </p>
    <RouterLink v-if="!premium" :to="{ name: 'premium' }" class="premium">Premium</RouterLink>
  </div>
</template>

<style scoped>
.kota {
  display: flex;
  gap: 9px;
  align-items: center;
  padding: 13px;
  border-radius: 16px;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
}
.metin {
  flex: 1 0 0;
  min-width: 0;
  font: 400 12px/17px var(--font-inter);
  color: var(--metin-ikincil);
}
.premium {
  flex-shrink: 0;
  padding: 4px 0 4px 4px;
  font: 700 12.5px/normal var(--font-inter);
  letter-spacing: 0.4px;
  color: var(--vurgu-altin);
}
</style>
