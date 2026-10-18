<script setup>
// "Özellik/…" kartı — masaüstü 16:2535 (dikey) / mobil 17:3508 (yatay)
import AppIcon from '@/components/AppIcon.vue'

defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
})
</script>

<template>
  <article class="ozellik">
    <span class="ikon-kutu">
      <AppIcon class="ikon ikon-mobil" :name="icon" :size="20" color="var(--vurgu-altin)" />
      <AppIcon class="ikon ikon-masaustu" :name="icon" :size="22" color="var(--vurgu-altin)" />
    </span>
    <div class="metin">
      <h3 class="baslik">{{ title }}</h3>
      <p class="aciklama">{{ text }}</p>
    </div>
  </article>
</template>

<style scoped>
.ozellik {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 20px 18px;
  border-radius: 20px;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
}
.ikon-kutu {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 13px;
  background: var(--yuzey-altin-ton);
}
.ikon-masaustu {
  display: none;
}
.metin {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}
.baslik {
  font: 700 17px/normal var(--font-sora);
  letter-spacing: -0.3px;
  color: var(--metin-birincil);
}
.aciklama {
  font: 400 14.5px/22px var(--font-inter);
  color: var(--metin-ikincil);
}

@media (min-width: 1024px) {
  .ozellik {
    flex-direction: column;
    gap: 12px;
    padding: 26px 26px 28px;
    border-radius: 22px;
  }
  .ikon-kutu {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    /* Figma: kutunun altında 6px'lik boş çerçeve + 12px aralık */
    margin-bottom: 6px;
  }
  .ikon-mobil {
    display: none;
  }
  .ikon-masaustu {
    display: inline-flex;
  }
  .metin {
    gap: 12px;
    width: 100%;
  }
  .baslik {
    font-size: 20px;
  }
  .aciklama {
    font-size: 15px;
    line-height: 23px;
  }
}
</style>
