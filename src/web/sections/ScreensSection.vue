<script setup>
// Figma: Ekranlar — masaüstü 16:2626 / mobil 17:3599
import SectionHeading from '../components/SectionHeading.vue'
import PhoneShot from '../components/screens/PhoneShot.vue'
import ekranOyun from '@/assets/web/ekran-oyun.webp'
import ekranIstatistik from '@/assets/web/ekran-istatistik.webp'
import ekranGecmis from '@/assets/web/ekran-gecmis.webp'
import ekranAnaSayfa from '@/assets/web/ekran-ana-sayfa-acik.webp'
import { useLocale } from '../i18n'

const { t } = useLocale()

// mobil: true → mobil Figma çerçevesinde de görünür (mobilde yalnızca 2 telefon var); alt metinler t.screens.alts sırasıyla
const phones = [
  { src: ekranOyun, mobil: true },
  { src: ekranIstatistik, mobil: false },
  { src: ekranGecmis, mobil: false },
  { src: ekranAnaSayfa, mobil: true },
]
</script>

<template>
  <section class="ekranlar">
    <SectionHeading :eyebrow="t.screens.eyebrow" :title="t.screens.title" :subtitle="t.screens.subtitle" />
    <div class="telefonlar">
      <PhoneShot
        v-for="(p, i) in phones"
        :key="p.src"
        :src="p.src"
        :alt="t.screens.alts[i]"
        class="telefonlar__oge"
        :class="{ 'telefonlar__oge--genis': !p.mobil }"
      />
    </div>
  </section>
</template>

<style scoped>
.ekranlar {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px 20px 64px;
  /* telefon parlamaları yanlardan taşmasın */
  overflow-x: clip;
}
.telefonlar {
  display: flex;
  gap: 14px;
  justify-content: center;
}
.telefonlar__oge {
  flex: 0 1 165.6px;
  min-width: 0;
}
.telefonlar__oge--genis {
  display: none;
}

/* Tablet: dört telefonun hepsi tek satırda */
@media (min-width: 640px) {
  .telefonlar {
    gap: 24px;
  }
  .telefonlar__oge {
    flex-basis: 256.68px;
  }
  .telefonlar__oge--genis {
    display: block;
  }
}

@media (min-width: 1024px) {
  .ekranlar {
    gap: 56px;
    padding: 48px max(20px, calc((100% - 1200px) / 2)) 112px;
  }
  .telefonlar {
    gap: 32px;
  }
}
</style>
