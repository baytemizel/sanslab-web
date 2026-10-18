// Sayı istatistikleri — adil çekilişlerin yerel simülasyonu ve basit adillik testi.
// Gerçek sürümde resmi geçmiş veri yüklenecek; şimdilik kriptografik RNG ile simüle edilir.
import { pickUnique } from './random.js'

export const DEFAULT_DRAWS = 1000
// Anlamlılık düzeyi: adil bir üreteçte "sapma" sonucu yalnızca ~%0,1 olasılıkla görülür.
export const FAIRNESS_ALPHA = 0.001

// Standart normal dağılımın kümülatif fonksiyonu (Abramowitz–Stegun 7.1.26 erf yaklaşımı).
function normalCdf(z) {
  const t = 1 / (1 + 0.3275911 * (Math.abs(z) / Math.SQRT2))
  const poly = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))))
  const erf = 1 - poly * Math.exp(-(z * z) / 2)
  return z >= 0 ? (1 + erf) / 2 : (1 - erf) / 2
}

// Ki-kare üst kuyruk olasılığı (Wilson–Hilferty yaklaşımı; df ≥ 10 için yeterince hassas).
export function chiSquarePValue(x2, df) {
  const k = 2 / (9 * df)
  const z = (Math.cbrt(x2 / df) - (1 - k)) / Math.sqrt(k)
  return 1 - normalCdf(z)
}

/**
 * Oyunun ana sayıları için `draws` adet adil çekiliş simüle eder.
 * Her çekilişte `main.count` tekrarsız sayı [min, max] aralığından seçilir.
 */
export function simulateDraws(game, draws = DEFAULT_DRAWS) {
  const { count, min, max } = game.main
  const counts = new Array(max - min + 1).fill(0)
  for (let d = 0; d < draws; d++) {
    for (const n of pickUnique(count, min, max)) counts[n - min]++
  }
  return analyze(counts, { draws, count, min })
}

/**
 * Sıklık analizi + uniform dağılıma karşı ki-kare uyum testi.
 * Çekilişler tekrarsız olduğundan her sayının sayımı Binom(n, k/N) dağılır ve sayımlar
 * negatif ilişkilidir; Σ(O−E)²/E · (N−1)/(N−k) istatistiği yaklaşık χ²(N−1) dağılır.
 */
export function analyze(counts, { draws, count, min, top = 5 }) {
  const N = counts.length
  const expected = (draws * count) / N
  const items = counts.map((c, i) => ({ number: i + min, count: c }))

  const byFreq = [...items].sort((a, b) => b.count - a.count || a.number - b.number)
  const mostFrequent = byFreq.slice(0, top).map((x) => x.number)
  const leastFrequent = [...items]
    .sort((a, b) => a.count - b.count || a.number - b.number)
    .slice(0, top)
    .map((x) => x.number)

  const raw = counts.reduce((s, o) => s + ((o - expected) ** 2) / expected, 0)
  const chiSquare = count < N ? (raw * (N - 1)) / (N - count) : raw
  const df = N - 1
  const pValue = chiSquarePValue(chiSquare, df)

  return {
    draws,
    expected,
    items,
    maxCount: byFreq[0].count,
    mostFrequent,
    leastFrequent,
    chiSquare,
    df,
    pValue,
    fair: pValue >= FAIRNESS_ALPHA,
  }
}
