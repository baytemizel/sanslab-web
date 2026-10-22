// Web sitesi dili rotadan gelir: Türkçe "/" altında, İngilizce "/en" altında (route meta.lang).
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import tr from './tr.js'
import en from './en.js'

export const MESSAGES = { tr, en }
export const LOCALES = ['tr', 'en']
export const HOME = { tr: 'landing', en: 'landing-en' }

export function useLocale() {
  const route = useRoute()
  const lang = computed(() => route.meta.lang || 'tr')
  const t = computed(() => MESSAGES[lang.value])
  // Ana sayfa bölümüne bağlantı (diğer sayfalardan da çalışır)
  const section = (id) => ({ name: HOME[lang.value], hash: `#${id}` })
  const home = computed(() => ({ name: HOME[lang.value] }))
  // Dil seçicide hedef: aynı sayfanın diğer dildeki karşılığı (rotada meta.alt), yoksa ana sayfa
  const switchTo = (target) => {
    if (target === lang.value) return route.fullPath
    if (route.meta.alt) return route.meta.alt
    return { name: HOME[target], hash: route.name === HOME[lang.value] ? route.hash : '' }
  }
  return { lang, t, section, home, switchTo }
}
