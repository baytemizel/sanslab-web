# ŞansLab — Vue 3 web arayüzü

Figma: [ŞansLab — Mobil Arayüz](https://www.figma.com/design/cKFcGjAXR2i713jyIeuiwZ/)

- **Web sitesi** (`/`): "Ana sayfa — sanslab.oditteknoloji.com" (node `19:4537`) — masaüstü 1440 (`16:2370`) ve mobil 390 (`17:3369`).
- **Uygulama / canlı demo** (`/uygulama`): "📱 Ekranlar — Koyu" sayfasındaki 16 ekran + "🧩 Bileşenler".

## Gereksinimler

- Node 22 (`.nvmrc`), Vite 6, Vue 3, Vue Router 4

```bash
nvm use 22
```

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

## Yapı

```
src/
  styles/tokens.css     Figma değişkenleri (metin/*, vurgu/*, yuzey/*, cizgi/*) ve oyun renkleri
  styles/base.css       Sıfırlama + Figma metin stilleri (.t-hero, .t-govde-s …)
  components/           Figma "Bileşenler" sayfasının karşılıkları
    AppIcon.vue         İkon/* (Feather — feather-icons paketi)
    DrawBall.vue        Çekiliş Topu (Normal / Özel, 44/42/32)
    GlowOrb.vue         Oyun kartı küresi
    PrimaryButton.vue   Birincil Buton (Altın / Oyun / Hayalet)
    IconButton.vue      Simge Butonu
    CloseButton.vue     Kapat Butonu
    GameCard.vue        Oyun Kartı
    SettingRow.vue      Ayar Satırı
    InfoNote.vue        Bilgi Notu
    FilterChip.vue      Filtre Çipi
    ScreenHeader.vue    Ekran başlığı (geri + başlık)
    NavHeader.vue       Gezinme başlığı (native)
    AppBackground.vue   Arka Plan (Gece Çekilişi)
    ScreenShell.vue     390px ekran kabuğu
  views/                Uygulama ekranları (01–16)
  layouts/AppLayout.vue Uygulama yerleşimi (arka plan)
  web/                  Web sitesi: LandingView, sections/, components/ (nav, footer, mağaza rozeti…), links.js
  data/games.js         Oyun tanımları
  lib/                  Rastgele sayı, üretici, istatistik yardımcıları
  store.js              localStorage'da saklanan uygulama durumu
  router.js             Rotalar
```

## Rotalar

| Rota | Figma |
| --- | --- |
| `/` | Web sitesi (Hero, Oyunlar, Özellikler, ŞansFormülü, Ekranlar, Premium, Şeffaflık + İndir) |
| `/uygulama/hosgeldin/1…4` | 01–04 Onboarding |
| `/uygulama/giris` | 05 Giriş |
| `/uygulama` | 06 Ana Sayfa |
| `/uygulama/oyun/:oyun` | 07–10 Oyun (sayisal-loto, super-loto, sans-topu, on-numara, hizli-on) |
| `/uygulama/istatistik/:oyun` | 11 İstatistik |
| `/uygulama/gecmis` | 12 Kupon Geçmişi |
| `/uygulama/ayarlar` | 13 Ayarlar |
| `/uygulama/ayarlar/sorumlu-oyun` | 14 Sorumlu Oyun alt sayfası |
| `/uygulama/premium` | 15 Premium |
| `/uygulama/hesap` | 16 Hesap |

## Notlar

- iOS durum çubuğu ve ana ekran çubuğu web'de çizilmez; yerine `env(safe-area-inset-*)` boşlukları kullanılır.
- Giriş, satın alma ve hesap silme işlemleri arka uç olmadığı için demo olarak yerel durumu değiştirir (`TODO` yorumlarıyla işaretli).
- Mağaza bağlantıları ve yasal sayfa adresleri `src/web/links.js` içinde `TODO` olarak işaretli.
