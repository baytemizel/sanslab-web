// Web sitesi bağlantıları.
// TODO: mağaza sayfaları yayınlandığında gerçek URL'ler girilecek.
export const STORE_LINKS = {
  appStore: 'https://apps.apple.com/',
  googlePlay: 'https://play.google.com/store',
}

export const NAV_LINKS = [
  { id: 'oyunlar', label: 'Oyunlar' },
  { id: 'ozellikler', label: 'Özellikler' },
  { id: 'sansformulu', label: 'ŞansFormülü' },
  { id: 'ekranlar', label: 'Ekranlar' },
  { id: 'premium', label: 'Premium' },
]

export const DEMO_ROUTE = { name: 'home' }

// Yasal metinlerdeki iletişim adresiyle aynı
export const CONTACT = {
  email: 'support@odit.com.tr',
}

// Rotalar: src/router.js · içerik: src/web/legal
export const LEGAL_LINKS = {
  privacy: '/gizlilik',
  terms: '/kullanim-kosullari',
  kvkk: '/kvkk',
  deleteAccount: '/hesap-silme',
}
