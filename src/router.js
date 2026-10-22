import { createRouter, createWebHistory } from 'vue-router'
import { store } from './store'
import { gameById } from './data/games'

const gameGuard = (to) => (gameById(to.params.gameId) ? true : { name: 'home' })

const routes = [
  // Web sitesi — Figma "Ana sayfa — sanslab.oditteknoloji.com" (19:4537)
  {
    path: '/',
    name: 'landing',
    component: () => import('./web/LandingView.vue'),
    meta: { title: 'ŞansLab — Şansını dene, kuponunu üret', lang: 'tr' },
  },
  {
    path: '/en',
    name: 'landing-en',
    component: () => import('./web/LandingView.vue'),
    meta: { title: 'ŞansLab — Try your luck, generate your ticket', lang: 'en' },
  },
  // Yasal metinler (src/web/legal) — mağaza kayıtlarında bu adresler kullanılır
  // alt: dil seçicide diğer dildeki karşılık (KVKK ↔ GDPR bildirimleri)
  ...[
    ['/gizlilik', 'gizlilik', 'Gizlilik Politikası', 'tr', '/en/privacy'],
    ['/kullanim-kosullari', 'kullanim-sartlari', 'Kullanım Şartları', 'tr', '/en/terms'],
    ['/kvkk', 'kvkk', 'KVKK Aydınlatma Metni', 'tr', '/en/gdpr'],
    ['/en/privacy', 'privacy', 'Privacy Policy', 'en', '/gizlilik'],
    ['/en/terms', 'terms', 'Terms of Use', 'en', '/kullanim-kosullari'],
    ['/en/gdpr', 'gdpr', 'GDPR Privacy Notice', 'en', '/kvkk'],
  ].map(([path, docKey, title, lang, alt]) => ({
    path,
    name: `legal-${docKey}`,
    component: () => import('./web/LegalView.vue'),
    props: { docKey },
    meta: { title, lang, alt },
  })),
  // Hesap yok; silme talimatları Gizlilik Politikası'nın 7. bölümünde.
  { path: '/hesap-silme', redirect: { path: '/gizlilik', hash: '#hesap-ve-verilerin-silinmesi' } },
  // Uygulama / canlı demo — Figma "📱 Ekranlar — Koyu"
  {
    path: '/uygulama',
    component: () => import('./layouts/AppLayout.vue'),
    meta: { app: true },
    children: [
      { path: '', name: 'home', component: () => import('./views/HomeView.vue'), meta: { title: 'Ana Sayfa' } },
      {
        path: 'hosgeldin/:step(\\d)?',
        name: 'onboarding',
        component: () => import('./views/OnboardingView.vue'),
        meta: { title: 'Hoş geldin' },
      },
      { path: 'giris', name: 'login', component: () => import('./views/LoginView.vue'), meta: { title: 'Giriş' } },
      { path: 'oyun/:gameId', name: 'game', component: () => import('./views/GameView.vue'), beforeEnter: gameGuard },
      { path: 'istatistik/:gameId', name: 'stats', component: () => import('./views/StatsView.vue'), beforeEnter: gameGuard },
      { path: 'gecmis', name: 'history', component: () => import('./views/HistoryView.vue'), meta: { title: 'Kupon Geçmişi' } },
      {
        path: 'ayarlar',
        name: 'settings',
        component: () => import('./views/SettingsView.vue'),
        meta: { title: 'Ayarlar' },
        children: [
          {
            path: 'sorumlu-oyun',
            name: 'responsible-gaming',
            component: () => import('./views/ResponsibleGamingSheet.vue'),
          },
        ],
      },
      { path: 'premium', name: 'premium', component: () => import('./views/PremiumView.vue'), meta: { title: 'Premium' } },
      { path: 'hesap', name: 'account', component: () => import('./views/AccountView.vue'), meta: { title: 'Hesap' } },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    // Yapışkan web menüsü: mobil 64px, masaüstü 80px (scroll-margin-top router'da dikkate alınmaz)
    if (to.hash) return { el: to.hash, top: window.innerWidth >= 1024 ? 104 : 80, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  // Uygulamanın ilk ziyaretinde karşılama akışı gösterilir.
  if (to.meta.app && !store.onboardingDone && !['onboarding', 'login'].includes(to.name)) {
    return { name: 'onboarding', params: { step: '1' } }
  }
})

router.afterEach((to) => {
  const game = to.params.gameId && gameById(to.params.gameId)
  document.documentElement.lang = to.meta.lang || 'tr'
  if (to.name === 'landing' || to.name === 'landing-en') document.title = to.meta.title
  else document.title = `${game ? game.name : to.meta.title || 'Uygulama'} · ŞansLab`
})
