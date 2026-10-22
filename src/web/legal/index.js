// Yasal metinler — kaynak: "SansLab Legal Docs" (.docx, Sürüm 1.0, 22 Ekim 2026).
// docs/*.js dosyaları .docx'lerden dönüştürülmüştür; metni orada elle değiştirmeyin.
import gizlilik from './docs/gizlilik.js'
import kullanimSartlari from './docs/kullanim-sartlari.js'
import kvkk from './docs/kvkk.js'
import privacy from './docs/privacy.js'
import terms from './docs/terms.js'
import gdpr from './docs/gdpr.js'

// path: sitedeki adres · alt: diğer dildeki karşılığı
export const LEGAL_DOCS = {
  gizlilik: { path: '/gizlilik', lang: 'tr', doc: gizlilik, alt: 'privacy' },
  'kullanim-sartlari': { path: '/kullanim-kosullari', lang: 'tr', doc: kullanimSartlari, alt: 'terms' },
  kvkk: { path: '/kvkk', lang: 'tr', doc: kvkk },
  privacy: { path: '/en/privacy', lang: 'en', doc: privacy, alt: 'gizlilik' },
  terms: { path: '/en/terms', lang: 'en', doc: terms, alt: 'kullanim-sartlari' },
  gdpr: { path: '/en/gdpr', lang: 'en', doc: gdpr },
}

// Sayfa altındaki "Diğer yasal metinler" listesi (dile göre sıralı)
export const RELATED = {
  tr: ['gizlilik', 'kullanim-sartlari', 'kvkk', 'gdpr'],
  en: ['privacy', 'terms', 'gdpr', 'kvkk'],
}

export const UI = {
  tr: { toc: 'İçindekiler', related: 'Diğer yasal metinler', alt: 'English', back: 'Ana sayfaya dön' },
  en: { toc: 'Contents', related: 'Other legal documents', alt: 'Türkçe', back: 'Back to home' },
}
