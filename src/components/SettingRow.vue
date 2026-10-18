<script setup>
// "Ayar Satırı" — altın tonlu ikon kutusu + etiket + sağda değer veya ok.
import AppIcon from './AppIcon.vue'

defineProps({
  icon: { type: String, required: true },
  label: { type: String, required: true },
  value: { type: String, default: '' },
  chevron: { type: Boolean, default: false },
  to: { type: [String, Object], default: null },
  href: { type: String, default: '' },
  static: { type: Boolean, default: false }, // tıklanamaz bilgi satırı (ör. Sürüm)
})
defineEmits(['click'])
</script>

<template>
  <component
    :is="to ? 'RouterLink' : href ? 'a' : static ? 'div' : 'button'"
    :to="to || undefined"
    :href="href || undefined"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener' : undefined"
    :type="to || href || static ? undefined : 'button'"
    class="ayar-satiri"
    @click="$emit('click', $event)"
  >
    <span class="ikon-kutusu">
      <slot name="icon"><AppIcon :name="icon" :size="16" color="var(--vurgu-altin)" /></slot>
    </span>
    <span class="etiket t-satir-etiket">{{ label }}</span>
    <span v-if="value" class="deger t-govde-m ikincil">{{ value }}</span>
    <AppIcon v-if="chevron" name="chevron-right" :size="18" color="var(--metin-ikincil)" />
  </component>
</template>

<style scoped>
.ayar-satiri {
  display: flex;
  gap: 13px;
  align-items: center;
  width: 100%;
  padding: 13px 14px;
  border-radius: 16px;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
  text-align: left;
}
.ikon-kutusu {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--yuzey-altin-ton);
}
.etiket {
  flex: 1 0 0;
  min-width: 0;
  color: var(--metin-birincil);
}
.deger {
  white-space: nowrap;
}
</style>
