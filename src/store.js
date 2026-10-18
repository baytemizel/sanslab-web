// Uygulama durumu — tarayıcıda (localStorage) saklanır. Üyelik gerekmez.
import { reactive, watch } from 'vue'

const KEY = 'sanslab:v1'

const defaults = () => ({
  onboardingDone: false,
  premium: false,
  user: null, // { name, email, provider }
  language: 'tr',
  theme: 'koyu',
  coupons: [], // { id, gameId, mode, numbers: [], extra: [], createdAt, favorite }
  historySeenAt: 0,
})

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...defaults(), ...JSON.parse(raw) } : defaults()
  } catch {
    return defaults()
  }
}

export const store = reactive(load())

watch(
  store,
  (s) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(s))
    } catch {
      /* depolama kapalı olabilir */
    }
  },
  { deep: true },
)

// Ücretsiz katman: son 10 kupon ve 3 favori saklanır (Figma 12 · Kota bilgisi). Premium'da sınırsız.
export const FREE_HISTORY_LIMIT = 10
export const FREE_FAVORITE_LIMIT = 3

export function addCoupons(list) {
  const now = Date.now()
  const items = list.map((c, i) => ({
    id: `${now}-${i}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: now,
    favorite: false,
    extra: [],
    ...c,
  }))
  store.coupons.unshift(...items)
  if (!store.premium) {
    // favoriler korunur, en eskiler silinir
    while (store.coupons.length > FREE_HISTORY_LIMIT) {
      const idx = store.coupons.findLastIndex((c) => !c.favorite)
      if (idx === -1) break
      store.coupons.splice(idx, 1)
    }
  }
  return items
}

// Ücretsiz katmanda favori sınırı doluysa false döner.
export function toggleFavorite(id) {
  const c = store.coupons.find((x) => x.id === id)
  if (!c) return true
  if (!c.favorite && !store.premium && store.coupons.filter((x) => x.favorite).length >= FREE_FAVORITE_LIMIT) {
    return false
  }
  c.favorite = !c.favorite
  return true
}

export function removeCoupon(id) {
  const i = store.coupons.findIndex((x) => x.id === id)
  if (i !== -1) store.coupons.splice(i, 1)
}

export function clearHistory() {
  store.coupons.splice(0, store.coupons.length, ...store.coupons.filter((c) => c.favorite))
}

export function hasNewHistory() {
  return store.coupons.some((c) => c.createdAt > store.historySeenAt)
}

export function markHistorySeen() {
  store.historySeenAt = Date.now()
}

export function resetAll() {
  Object.assign(store, defaults())
}
