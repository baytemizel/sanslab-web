<script setup>
// "Plan" (Aylık / Yıllık) — seçilebilir ödeme periyodu kartı. Seçili kart altın çerçeve + dolu radyo.
import radioSelected from '@/assets/premium/radyo-secili.svg'

defineProps({
  title: { type: String, required: true },
  price: { type: String, required: true },
  note: { type: String, required: true },
  badge: { type: String, default: '' },
  selected: { type: Boolean, default: false },
})
defineEmits(['select'])
</script>

<template>
  <button
    type="button"
    role="radio"
    class="plan"
    :class="{ 'plan--secili': selected }"
    :aria-checked="selected"
    :tabindex="selected ? 0 : -1"
    @click="$emit('select')"
  >
    <span class="baslik">
      <span class="ad">{{ title }}</span>
      <img v-if="selected" class="radyo" :src="radioSelected" width="20" height="20" alt="" />
      <span v-else class="radyo radyo--bos" aria-hidden="true" />
    </span>
    <span class="fiyat">{{ price }}</span>
    <span class="not t-govde-xs ikincil">{{ note }}</span>
    <span v-if="badge" class="rozet">{{ badge }}</span>
  </button>
</template>

<style scoped>
.plan {
  position: relative;
  display: flex;
  flex: 1 0 0;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
  padding: 18px 16px 16px;
  border-radius: 18px;
  background: var(--yuzey-kart);
  border: 1.5px solid var(--cizgi-kenar);
  text-align: left;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}
.plan--secili {
  background: var(--yuzey-altin-ton);
  border-color: var(--vurgu-altin-dolgu);
}
.baslik {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.ad {
  font: 700 16px/normal var(--font-sora);
  color: var(--metin-birincil);
  white-space: nowrap;
}
.radyo {
  display: block;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
.radyo--bos {
  border: 2px solid var(--cizgi-kenar);
  border-radius: 10px;
}
.fiyat {
  margin-top: 12px;
  font: 800 20px/normal var(--font-sora);
  letter-spacing: -0.3px;
  color: var(--metin-birincil);
  white-space: nowrap;
}
.plan--secili .fiyat {
  color: var(--vurgu-altin);
}
.not {
  margin-top: 4px;
  white-space: nowrap;
}
.rozet {
  position: absolute;
  top: -11.5px;
  right: 10.5px;
  padding: 3px 8px;
  border-radius: 999px;
  background: var(--vurgu-altin-dolgu);
  font: 700 10.5px/normal var(--font-inter);
  letter-spacing: 0.4px;
  color: var(--vurgu-altin-ustu);
  white-space: nowrap;
}
</style>
