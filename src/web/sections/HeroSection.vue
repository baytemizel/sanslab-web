<script setup>
// Figma: Hero — masaüstü 16:2383 / mobil 17:3382
import DrawBall from '@/components/DrawBall.vue'
import Eyebrow from '../components/Eyebrow.vue'
import StoreBadge from '../components/StoreBadge.vue'
import DemoLink from '../components/DemoLink.vue'
import telefon from '@/assets/web/hero-telefon.webp'
import telefonMobil from '@/assets/web/hero-telefon-mobil.webp'

const balls = [
  { n: 7, color: '#f5333b' },
  { n: 23, color: '#ffa62b' },
  { n: 34, color: '#ff49a3' },
  { n: 11, color: '#9d62ff' },
  { n: 49, color: '#6c8bff' },
]
</script>

<template>
  <section class="hero">
    <div class="metin">
      <Eyebrow>5 Şans Oyunu · Ücretsiz</Eyebrow>
      <h1 class="baslik">Şansını dene,<br /><span class="altin">kuponunu üret</span></h1>
      <p class="aciklama">
        Sayısal Loto, Süper Loto, Şans Topu, On Numara ve Hızlı On için saniyeler içinde kupon. Kriptografik
        rastgelelik, akıllı üretim modları, Türkçe ve İngilizce.
      </p>
      <div class="rozetler">
        <StoreBadge store="app-store" />
        <StoreBadge store="google-play" />
      </div>
      <DemoLink />
      <div class="toplar" aria-hidden="true">
        <DrawBall v-for="b in balls" :key="b.n" :number="b.n" :color="b.color" :size="50.6" />
      </div>
    </div>

    <div class="telefon-alani">
      <!-- Telefon gövdesi Figma'dan dışa aktarıldı (köşeler şeffaf); gölge ve altın parlama CSS ile -->
      <picture>
        <source media="(min-width: 1024px)" :srcset="telefon" width="414" height="868" />
        <img
          class="telefon"
          :src="telefonMobil"
          width="323"
          height="677"
          alt="ŞansLab uygulamasının ana ekranı: oyun seçimi ve Premium şeridi"
          fetchpriority="high"
        />
      </picture>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  gap: 44px;
  align-items: center;
  padding: 40px 20px 56px;
  overflow: hidden;
  background:
    radial-gradient(273px 444.5px at 50% 152.4px, rgba(244, 192, 74, 0.2) 0%, rgba(244, 192, 74, 0.05) 50%, rgba(244, 192, 74, 0) 100%),
    linear-gradient(180deg, rgb(22, 19, 52) 0%, rgb(10, 9, 24) 100%);
}
.metin {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  max-width: 350px;
  text-align: center;
}
.baslik {
  font: 800 40px/46px var(--font-sora);
  letter-spacing: -1.2px;
  color: var(--metin-birincil);
}
.aciklama {
  font: 400 16px/25px var(--font-inter);
  color: var(--metin-ikincil);
}
.rozetler {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}
/* Mobilde Figma'da hero topları yok */
.toplar {
  display: none;
  gap: 22px;
}
.telefon-alani {
  display: flex;
  justify-content: center;
  width: 100%;
}
/* Figma Telefon (mobil): 322.92×677.04, köşe 46.02, gölgeler ölçekli */
.telefon {
  display: block;
  width: min(322.92px, calc(100vw - 67.08px));
  max-width: none;
  height: auto;
  border-radius: 14.25% / 6.8%;
  box-shadow:
    0 23.4px 46.8px rgba(0, 0, 0, 0.45),
    0 18.72px 62.4px rgba(244, 192, 74, 0.2);
}

@media (min-width: 1024px) {
  .hero {
    flex-direction: row;
    gap: 64px;
    padding: 88px max(20px, calc((100% - 1200px) / 2)) 104px;
    background:
      radial-gradient(648px 742px at 70% 190.8px, rgba(244, 192, 74, 0.2) 0%, rgba(244, 192, 74, 0.05) 50%, rgba(244, 192, 74, 0) 100%),
      linear-gradient(180deg, rgb(22, 19, 52) 0%, rgb(10, 9, 24) 100%);
  }
  .metin {
    flex: 1 1 702px;
    max-width: 702px;
    gap: 28px;
    align-items: flex-start;
    text-align: left;
  }
  .baslik {
    font-size: clamp(56px, 5vw, 72px);
    line-height: 1.083;
    letter-spacing: -2.4px;
  }
  .aciklama {
    font-size: 19px;
    line-height: 30px;
  }
  .rozetler {
    flex-direction: row;
    gap: 14px;
  }
  .toplar {
    display: flex;
    /* hâle için alt/sağ pay */
    padding: 0 12.65px 12.65px 0;
  }
  .telefon-alani {
    flex: 0 0 auto;
    width: auto;
    padding-right: 20px;
  }
  /* Figma Telefon (masaüstü): 414×868, köşe 59 */
  .telefon {
    width: 414px;
    box-shadow:
      0 30px 60px rgba(0, 0, 0, 0.45),
      0 24px 80px rgba(244, 192, 74, 0.2);
  }
}
@media (min-width: 1024px) and (max-width: 1279px) {
  .telefon {
    width: 332px;
  }
}
</style>
