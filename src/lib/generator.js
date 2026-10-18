// Kupon üretim modları ("Üretim Modu") — Figma 07–10 · Oyun ekranları.
//
// ÖNEMLİ: Hiçbir mod kazanma olasılığını artırmaz. Her çekiliş bağımsızdır ve her kombinasyonun
// şansı eşittir. Modlar yalnızca kombinasyonun "görünümünü" (dağılım) veya — Az Paylaşılan için —
// kazanılması hâlinde ikramiyenin kaç kişiyle paylaşılacağına dair beklentiyi değiştirir.
// Tüm modlar kriptografik rastgele (pickUnique) üzerine kurulu ret-örnekleme (rejection sampling)
// kullanır: rastgele kombinasyon çekilir, modun kuralına uymuyorsa yeniden çekilir.
import { pickUnique } from './random'

export const MODES = [
  {
    id: 'tam-rastgele',
    label: 'Tam Rastgele',
    premium: false,
    // Figma metni (8:778)
    description: 'Kriptografik rastgele, tüm sayılar eşit olasılıklı.',
  },
  {
    id: 'dengeli',
    label: 'Dengeli Dağılım',
    premium: true,
    // Figma'da bu modun açıklaması yok; onboarding metniyle uyumlu, iddiasız bir açıklama.
    description:
      'Tek/çift ve küçük/büyük sayıları dengeli dağıtır. Kazanma şansını ARTIRMAZ; yalnızca kombinasyonun görünümünü değiştirir.',
  },
  {
    id: 'az-paylasilan',
    label: 'Az Paylaşılan',
    premium: true,
    // Figma metni (8:1822)
    description:
      'Popüler seçimlerden (doğum günü, şanslı sayılar, desenler) kaçınır. Kazanma şansını ARTIRMAZ; kazanırsan ikramiyeyi daha az kişiyle paylaşman olasıdır.',
  },
  {
    id: 'sans-formulu',
    label: 'ŞansFormülü',
    premium: true,
    // Figma'da bu modun açıklaması yok; onboarding metniyle uyumlu, iddiasız bir açıklama.
    description:
      'Dengeli Dağılım ve Az Paylaşılan kurallarını birlikte uygular. Kazanma şansını ARTIRMAZ.',
    // Figma 10 · Hızlı On ekranında bu mod gösterilmiyor.
    excludeGames: ['hizli-on'],
  },
]

export const modeById = (id) => MODES.find((m) => m.id === id)
export const modesForGame = (gameId) => MODES.filter((m) => !m.excludeGames?.includes(gameId))

const MAX_TRIES = 400

// --- Kurallar ---------------------------------------------------------------

// Dengeli: tek/çift ve alt/üst yarı farkı en fazla 1 (tek sayıda adette en fazla 1 fark kaçınılmaz);
// sayılar aralığın onda birlik dilimlerine yayılır (bir dilimde en fazla ceil(adet/3)).
function isBalanced(nums, min, max) {
  const n = nums.length
  if (n < 2) return true
  const odd = nums.filter((x) => x % 2).length
  const mid = (min + max) / 2
  const low = nums.filter((x) => x <= mid).length
  if (Math.abs(odd - (n - odd)) > 1) return false
  if (Math.abs(low - (n - low)) > 1) return false
  const span = (max - min + 1) / 10
  const buckets = {}
  for (const x of nums) {
    const b = Math.floor((x - min) / span)
    buckets[b] = (buckets[b] || 0) + 1
    if (buckets[b] > Math.ceil(n / 3)) return false
  }
  return true
}

// Sık oynanan "şanslı" sayılar (yerel sezgisel liste).
const POPULAR = new Set([3, 7, 9, 11, 13, 17, 21, 23])

// Az paylaşılan: insanların sık seçtiği desenlerden kaçınır (yerel sezgisel kural):
// - Doğum günü etkisi: 1–31 arası sayılar en fazla adedin üçte biri kadar (aralık 31'den büyükse)
// - 3 veya daha fazla ardışık sayı yok
// - Tüm kombinasyon tek bir aritmetik dizi (ör. 5-10-15-20) değil
// - Aynı son rakamı paylaşan en fazla 2 sayı
// - En fazla 1 "şanslı" sayı
function isLessShared(nums, min, max) {
  const n = nums.length
  if (n < 2) return !POPULAR.has(nums[0]) && (max <= 31 || nums[0] > 31)
  if (max > 31) {
    // 31'in üstünde az sayı olan oyunlarda (Şans Topu: 32–34) sınır gevşetilir.
    const allowed = Math.max(Math.floor(n / 3), n - Math.floor((max - 31) / 2))
    const birthday = nums.filter((x) => x <= 31).length
    if (birthday > allowed) return false
  }
  let run = 1
  for (let i = 1; i < n; i++) {
    run = nums[i] === nums[i - 1] + 1 ? run + 1 : 1
    if (run >= 3) return false
  }
  if (n >= 3) {
    const d = nums[1] - nums[0]
    if (nums.every((x, i) => i === 0 || x - nums[i - 1] === d)) return false
  }
  const lastDigit = {}
  for (const x of nums) {
    lastDigit[x % 10] = (lastDigit[x % 10] || 0) + 1
    if (lastDigit[x % 10] > 2) return false
  }
  if (nums.filter((x) => POPULAR.has(x)).length > 1) return false
  return true
}

const RULES = {
  'tam-rastgele': () => true,
  dengeli: isBalanced,
  'az-paylasilan': isLessShared,
  'sans-formulu': (nums, min, max) => isBalanced(nums, min, max) && isLessShared(nums, min, max),
}

function pickWithRule(count, min, max, rule, exclude = []) {
  let last
  for (let i = 0; i < MAX_TRIES; i++) {
    last = pickUnique(count, min, max, exclude)
    if (rule(last, min, max)) return last
  }
  return last // kural sağlanamazsa (çok küçük havuz) son rastgele kombinasyon kullanılır
}

/**
 * Tek kupon üretir.
 * @param {object} game  data/games.js içindeki oyun
 * @param {string} modeId
 * @param {number} [count] ana sayı adedi (Hızlı On için 1–10)
 * @returns {{ gameId, mode, numbers: number[], extra: number[] }}
 */
export function generateCoupon(game, modeId, count = game.main.count) {
  const rule = RULES[modeId] || RULES['tam-rastgele']
  const { min, max } = game.main
  const numbers = modeId === 'tam-rastgele' ? pickUnique(count, min, max) : pickWithRule(count, min, max, rule)
  let extra = []
  if (game.extra) {
    const ex = game.extra
    // Joker ana sayılardan farklı olmalı; Şans Topu +1 ayrı havuzdan çekilir.
    extra = pickUnique(ex.count, ex.min, ex.max, ex.distinctFromMain ? numbers : [])
  }
  return { gameId: game.id, mode: modeId, numbers, extra }
}

export function generateCoupons(game, modeId, couponCount, count) {
  return Array.from({ length: couponCount }, () => generateCoupon(game, modeId, count))
}

const pad = (n) => String(n).padStart(2, '0')

// Panoya kopyalanacak metin, ör. "Sayısal Loto: 28 57 59 61 62 90 · Joker: 16"
export function couponToText(game, coupon) {
  let text = `${game.name}: ${coupon.numbers.map(pad).join(' ')}`
  if (game.extra && coupon.extra?.length) {
    const label = game.extra.label === '+1' ? game.name : game.extra.label
    text += ` · ${label}: ${coupon.extra.map(pad).join(' ')}`
  }
  return text
}
