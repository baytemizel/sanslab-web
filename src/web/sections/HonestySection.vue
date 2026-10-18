<script setup>
// Figma: Dürüstlük ve indirme — masaüstü 16:3138 / mobil 17:3808
import AppIcon from '@/components/AppIcon.vue'
import StoreBadge from '../components/StoreBadge.vue'
</script>

<template>
  <section class="durustluk">
    <!-- "Şeffaf ve dürüst" -->
    <div class="kart">
      <span class="kalkan">
        <AppIcon class="kalkan__ikon kalkan__ikon--mobil" name="shield" :size="22" color="var(--vurgu-altin-ustu)" />
        <AppIcon class="kalkan__ikon kalkan__ikon--masaustu" name="shield" :size="24" color="var(--vurgu-altin-ustu)" />
      </span>
      <div class="kart__metin">
        <h2 class="kart__baslik">Şeffaf ve dürüst</h2>
        <p class="kart__aciklama">
          Şans oyunlarında her çekiliş bağımsızdır. Geçmiş sonuçlar geleceği tahmin etmez ve hiçbir yöntem —
          ŞansFormülü dahil — kazanma olasılığını artırmaz. ŞansLab yalnızca kupon doldurmayı kolaylaştıran bir
          eğlence aracıdır; gerçek para ile oyun, bahis veya kupon satışı içermez. 18+ · Milli Piyango İdaresi ile
          bağlantılı değildir.
        </p>
      </div>
    </div>

    <!-- "İndirme bandı" — nav'daki "İndir" butonu buraya bağlanır -->
    <div id="indir" class="bant">
      <h2 class="bant__baslik">Kuponunu şimdi üret</h2>
      <p class="bant__alt">Ücretsiz indir · Üyelik gerekmez · 18+</p>
      <div class="rozetler">
        <StoreBadge store="app-store" />
        <StoreBadge store="google-play" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.durustluk {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 20px 64px;
}

.kart {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 22px;
  border-radius: 24px;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
}
.kalkan {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 15px;
  background: var(--vurgu-altin-dolgu);
}
.kalkan .kalkan__ikon--masaustu {
  display: none;
}
.kart__metin {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}
.kart__baslik {
  font: 700 20px/normal var(--font-sora);
  letter-spacing: 0;
  color: var(--metin-birincil);
}
.kart__aciklama {
  font: 400 14.5px/22px var(--font-inter);
  color: var(--metin-ikincil);
}

.bant {
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
  padding: 40px 20px;
  border-radius: 28px;
  border: 1px solid var(--cizgi-promo);
  background:
    radial-gradient(80% 90% at 50% 0%, rgba(244, 192, 74, 0.25) 0%, rgba(244, 192, 74, 0) 100%),
    linear-gradient(180deg, rgb(42, 38, 96) 0%, rgb(28, 25, 71) 100%);
  text-align: center;
  scroll-margin-top: 64px;
}
.bant__baslik {
  font: 800 30px/normal var(--font-sora);
  letter-spacing: -0.8px;
  color: var(--metin-birincil);
}
.bant__alt {
  font: 500 15px/normal var(--font-inter);
  color: var(--metin-ikincil);
}
.rozetler {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

@media (min-width: 1024px) {
  .durustluk {
    gap: 40px;
    padding: 48px max(20px, calc((100% - 1200px) / 2)) 112px;
  }
  .kart {
    flex-direction: row;
    gap: 20px;
    align-items: flex-start;
    padding: 32px 36px;
  }
  .kalkan {
    width: 52px;
    height: 52px;
    border-radius: 16px;
  }
  .kalkan .kalkan__ikon--mobil {
    display: none;
  }
  .kalkan .kalkan__ikon--masaustu {
    display: inline-flex;
  }
  .kart__metin {
    flex: 1 1 0;
    gap: 8px;
  }
  .kart__baslik {
    font-size: 22px;
  }
  .kart__aciklama {
    font-size: 15px;
    line-height: 23px;
  }
  .bant {
    gap: 20px;
    padding: 64px 24px;
    border-radius: 32px;
    background:
      radial-gradient(60% 90% at 50% 0%, rgba(244, 192, 74, 0.25) 0%, rgba(244, 192, 74, 0) 100%),
      linear-gradient(180deg, rgb(42, 38, 96) 0%, rgb(28, 25, 71) 100%);
    scroll-margin-top: 80px;
  }
  .bant__baslik {
    font-size: 44px;
    letter-spacing: -1.2px;
  }
  .bant__alt {
    font-size: 17px;
  }
  .rozetler {
    flex-direction: row;
    gap: 14px;
  }
}
</style>
