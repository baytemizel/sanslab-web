<script setup>
// Figma: ŞansFormülü — masaüstü 16:2598 / mobil 17:3571
import AppIcon from '@/components/AppIcon.vue'
import Eyebrow from '../components/Eyebrow.vue'
import StatCard from '../components/formula/StatCard.vue'

const stats = [
  { value: '3.496', label: 'temiz çekiliş analiz edildi' },
  { value: '7', label: 'skor bileşeni' },
  { value: '6.000', label: 'aday kombinasyon her üretimde' },
  { value: '~4.9/6', label: 'kupon başına sıcak-liste sayısı' },
]
</script>

<template>
  <section class="sansformulu">
    <div class="kart">
      <div class="metin">
        <!-- Sola hizalı "Bölüm başlığı" (SectionHeading ortalı olduğu için burada ayrı kuruldu) -->
        <header class="baslik-blok">
          <Eyebrow>ŞansFormülü</Eyebrow>
          <h2 class="baslik">Arşiv analizli bileşik skor</h2>
          <p class="alt">
            3.496 temiz çekilişlik Milli Piyango arşivi analiz edildi; format değişimleri veriden tespit edilip dönemler
            ayrıştırıldı. Formül yedi bileşenle her kombinasyonu puanlar, binlerce aday arasından en yüksek skorluyu
            seçer.
          </p>
        </header>
        <div class="formul">
          <p class="denklem">SKOR = 0.15·F + 0.10·R + 0.10·G + 0.10·P + 0.15·S + 0.10·B + 0.30·A</p>
          <p class="bilesenler">
            frekans · son-50 form · gecikme · ikili sinerji · toplam bandı · desen uyumu · anti-kalabalık
          </p>
        </div>
        <p class="not">
          <AppIcon class="not-ikon" name="shield" :size="15" color="var(--vurgu-altin)" />
          <span>Kazanma olasılığını artırmaz; istatistiksel olarak skorlanmış kombinasyon üretir.</span>
        </p>
      </div>
      <div class="sayilar">
        <StatCard v-for="s in stats" :key="s.value" :value="s.value" :label="s.label" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.sansformulu {
  padding: 24px max(20px, calc((100% - 1200px) / 2)) 64px;
}
.kart {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 28px 22px;
  border-radius: 28px;
  background: var(--yuzey-promo);
  border: 1px solid var(--cizgi-promo);
}
.metin {
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
}
.baslik-blok {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}
.baslik {
  font: 800 30px/36px var(--font-sora);
  letter-spacing: -0.8px;
  color: var(--metin-birincil);
}
.alt {
  font: 400 15.5px/24px var(--font-inter);
  color: var(--metin-ikincil);
}
.formul {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px 16px;
  border-radius: 16px;
  background: rgba(7, 6, 15, 0.6);
  border: 1px solid var(--cizgi-kenar);
}
.denklem {
  font: 600 13px/20px var(--font-inter);
  color: var(--vurgu-altin);
}
.bilesenler {
  font: 400 12.5px/18px var(--font-inter);
  color: var(--metin-ikincil);
}
.not {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  font: 500 13px/19px var(--font-inter);
  color: var(--metin-ikincil);
}
.not-ikon {
  margin-top: 2px;
}
/* Figma mobilde 147px'lik kartlar 304px alana sığmadığı için alt alta düşüyor; burada 2×2 ızgara kullanıldı */
.sayilar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  align-items: start;
}

@media (min-width: 1024px) {
  .sansformulu {
    padding-top: 48px;
    padding-bottom: 112px;
  }
  .kart {
    flex-direction: row;
    gap: clamp(32px, 4vw, 56px);
    align-items: flex-start;
    padding: clamp(40px, 4vw, 56px);
    border-radius: 32px;
  }
  .metin {
    flex: 1 1 0;
  }
  .baslik-blok {
    gap: 16px;
  }
  .baslik {
    font-size: 44px;
    line-height: 52px;
    letter-spacing: -1.2px;
  }
  .alt {
    font-size: 18px;
    line-height: 28px;
  }
  .formul {
    padding: 16px 20px;
  }
  .denklem {
    font-size: 16px;
    line-height: 24px;
  }
  .bilesenler {
    font-size: 13px;
    line-height: 19px;
  }
  .not {
    align-items: center;
    font-size: 13.5px;
  }
  .not-ikon {
    margin-top: 0;
  }
  .sayilar {
    flex: 0 1 436px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
}
</style>
