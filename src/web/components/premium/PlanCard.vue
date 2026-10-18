<script setup>
// "Plan/Ücretsiz" ve "Plan/Premium" kartları (Figma 16:3066 / 16:3103, mobil 17:3770 / 17:3736)
import AppIcon from '@/components/AppIcon.vue'

const props = defineProps({
  variant: { type: String, default: 'free' }, // free | premium
  title: { type: String, required: true },
  price: { type: String, required: true },
  period: { type: String, required: true },
  features: { type: Array, required: true },
})
const isPremium = props.variant === 'premium'
</script>

<template>
  <article class="plan" :class="`plan--${variant}`">
    <h3 class="ad">{{ title }}</h3>
    <p class="fiyat">
      <span class="tutar">{{ price }}</span>
      <span class="donem">{{ period }}</span>
    </p>
    <hr class="ayrac" />
    <ul class="ozellikler">
      <li v-for="f in features" :key="f" class="ozellik">
        <span class="tik">
          <AppIcon
            name="check"
            :size="12"
            :color="isPremium ? 'var(--vurgu-altin-ustu)' : 'var(--metin-birincil)'"
          />
        </span>
        <span>{{ f }}</span>
      </li>
    </ul>
    <slot />
  </article>
</template>

<style scoped>
.plan {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 26px 22px;
  border-radius: 26px;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
}
.plan--premium {
  background: var(--yuzey-altin-ton);
  border: 1.5px solid var(--vurgu-altin-dolgu);
}
.ad {
  font: 700 22px/normal var(--font-sora);
  color: var(--metin-birincil);
}
.plan--premium .ad {
  font: italic 800 28px/normal var(--font-playfair);
}
.fiyat {
  display: flex;
  flex-wrap: wrap;
  gap: 0 8px;
  align-items: flex-end;
  line-height: normal;
}
.tutar {
  font: 800 38px/normal var(--font-sora);
  letter-spacing: -1.2px;
  color: var(--metin-birincil);
  white-space: nowrap;
}
.plan--premium .tutar {
  color: var(--vurgu-altin);
}
.donem {
  font: 500 13.5px/normal var(--font-inter);
  color: var(--metin-ikincil);
  white-space: pre-wrap;
}
.ayrac {
  width: 100%;
  height: 1px;
  margin: 0;
  border: 0;
  background: var(--cizgi-ince);
}
.ozellikler {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.ozellik {
  display: flex;
  gap: 12px;
  align-items: center;
  font: 500 15px/normal var(--font-inter);
  color: var(--metin-birincil);
}
.tik {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 11px;
  background: var(--yuzey-secili);
}
.plan--premium .tik {
  background: var(--vurgu-altin-dolgu);
}

@media (min-width: 1024px) {
  .plan {
    gap: 22px;
    padding: 36px;
    border-radius: 28px;
  }
  .ad {
    font-size: 24px;
  }
  .plan--premium .ad {
    font-size: 30px;
  }
  .fiyat {
    column-gap: 10px;
  }
  .tutar {
    font-size: 44px;
    letter-spacing: -1.4px;
  }
  .donem {
    font-size: 15px;
  }
  .ozellikler {
    gap: 14px;
  }
  .ozellik {
    font-size: 15.5px;
  }
}
</style>
