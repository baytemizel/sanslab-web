<script setup>
// "Sıklık grafiği (yatay kaydırılır)" — sayı başına bir çubuk (9px, 3px aralık, 150px tavan).
// En sık 5 sayı oyun rengiyle, en seyrek 5 sayı ikincil renkle; kesikli altın çizgi beklenen değer.
import { computed } from 'vue'

const props = defineProps({
  items: { type: Array, required: true }, // [{ number, count }]
  maxCount: { type: Number, required: true },
  expected: { type: Number, required: true },
  most: { type: Array, default: () => [] },
  least: { type: Array, default: () => [] },
  color: { type: String, default: 'var(--oyun-sayisal)' },
})

const BAR_MAX = 150
const scale = computed(() => (props.maxCount > 0 ? BAR_MAX / props.maxCount : 0))
const mostSet = computed(() => new Set(props.most))
const leastSet = computed(() => new Set(props.least))

const bars = computed(() =>
  props.items.map((it) => ({
    ...it,
    height: it.count * scale.value,
    tone: mostSet.value.has(it.number) ? 'sik' : leastSet.value.has(it.number) ? 'seyrek' : '',
  })),
)
const expectedBottom = computed(() => props.expected * scale.value)
</script>

<template>
  <div class="grafik" role="img" :aria-label="`Sayı sıklığı grafiği, ${items.length} sayı`" tabindex="0">
    <div class="cubuklar" :style="{ '--oyun-rengi': color }">
      <span
        v-for="b in bars"
        :key="b.number"
        class="cubuk"
        :class="b.tone"
        :style="{ height: `${b.height}px` }"
        :title="`${b.number}: ${b.count} kez`"
      />
      <span class="beklenen" :style="{ bottom: `${expectedBottom + 4}px` }" />
    </div>
  </div>
</template>

<style scoped>
.grafik {
  display: flex;
  padding: 12px;
  border-radius: 18px;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
}
.grafik::-webkit-scrollbar {
  display: none;
}
.cubuklar {
  position: relative;
  display: flex;
  flex-shrink: 0;
  gap: 3px;
  align-items: flex-end;
  height: 154px;
  padding-bottom: 4px;
}
.cubuk {
  width: 9px;
  flex-shrink: 0;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.25);
  transition: height 0.35s ease;
}
.cubuk.sik {
  background: var(--oyun-rengi);
}
.cubuk.seyrek {
  background: var(--metin-ikincil);
}
.beklenen {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background-image: repeating-linear-gradient(90deg, var(--vurgu-altin) 0 4px, transparent 4px 8px);
  background-position: -2px 0;
  pointer-events: none;
  transition: bottom 0.35s ease;
}
</style>
