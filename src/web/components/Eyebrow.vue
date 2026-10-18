<template>
  <!-- "Üst etiket" -->
  <span class="ust-etiket"><slot /></span>
</template>

<style scoped>
.ust-etiket {
  display: inline-flex;
  padding: 7px 14px;
  border-radius: 999px;
  background: var(--yuzey-altin-ton);
  border: 1px solid var(--cizgi-altin-ton);
  font: 700 12px/normal var(--font-inter);
  letter-spacing: 1.4px;
  text-transform: uppercase;
  color: var(--vurgu-altin);
  white-space: nowrap;
}
</style>
