<script setup>
// Dil seçici — nav'da "İndir" butonunun sağında; bayrak + kod, açılır listede TR / EN.
// Seçenekler aynı sayfanın diğer dildeki karşılığına gider (useLocale().switchTo).
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from '@/components/AppIcon.vue'
import FlagIcon from './FlagIcon.vue'
import { LOCALES, MESSAGES, useLocale } from '../i18n'

const { lang, t, switchTo } = useLocale()
const open = ref(false)
const root = ref(null)
const route = useRoute()
watch(() => route.fullPath, () => (open.value = false))

const onDocClick = (e) => {
  if (open.value && !root.value?.contains(e.target)) open.value = false
}
const onKey = (e) => {
  if (e.key === 'Escape' && open.value) {
    open.value = false
    root.value?.querySelector('.secici')?.focus()
  }
}
onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div ref="root" class="dil">
    <button
      type="button"
      class="secici"
      :aria-expanded="open"
      aria-haspopup="true"
      aria-controls="dil-listesi"
      :aria-label="`${t.lang.label}: ${t.lang.name}`"
      @click="open = !open"
    >
      <FlagIcon :code="lang" />
      <span class="kod">{{ lang.toUpperCase() }}</span>
      <AppIcon class="ok" :class="{ 'ok--acik': open }" name="chevron-down" :size="16" color="var(--metin-ikincil)" />
    </button>
    <ul v-show="open" id="dil-listesi" class="liste" :aria-label="t.lang.label">
      <li v-for="code in LOCALES" :key="code">
        <RouterLink
          :to="switchTo(code)"
          class="secenek"
          :class="{ 'secenek--secili': code === lang }"
          :hreflang="code"
          :lang="code"
          :aria-current="code === lang ? 'true' : undefined"
          @click="open = false"
        >
          <FlagIcon :code="code" />
          <span class="ad">{{ MESSAGES[code].lang.name }}</span>
          <span class="kod">{{ code.toUpperCase() }}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dil {
  position: relative;
}
.secici {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 12px;
  border-radius: 999px;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
  transition: border-color 0.15s ease;
}
.secici:hover,
.secici[aria-expanded='true'] {
  border-color: var(--cizgi-altin-ton);
}
.kod {
  font: 700 13px/normal var(--font-inter);
  letter-spacing: 0.6px;
  color: var(--metin-birincil);
}
.ok {
  transition: transform 0.15s ease;
}
.ok--acik {
  transform: rotate(180deg);
}
.liste {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 30;
  min-width: 180px;
  margin: 0;
  padding: 6px;
  list-style: none;
  border-radius: 16px;
  background: var(--yuzey-kart-dolu);
  border: 1px solid var(--cizgi-kenar);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
}
.secenek {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  font: 500 14.5px/normal var(--font-inter);
  color: var(--metin-birincil);
}
.secenek:hover,
.secenek:focus-visible {
  background: var(--yuzey-secili);
}
.secenek .ad {
  flex: 1;
}
.secenek .kod {
  font-size: 11.5px;
  color: var(--metin-ikincil);
}
.secenek--secili .kod {
  color: var(--vurgu-altin);
}
@media (max-width: 1023px) {
  .secici {
    height: 40px;
    padding: 0 10px;
    border-radius: 12px;
  }
}
</style>
