<script setup>
// "Web/Footer — Masaüstü" / "Web/Footer — Mobil"
import Logo from './Logo.vue'
import { CONTACT, DEMO_ROUTE } from '../links'
import { useLocale } from '../i18n'

const { t, section } = useLocale()
</script>

<template>
  <footer class="footer">
    <div class="ust">
      <div class="marka">
        <Logo :size="26" />
        <p class="aciklama">{{ t.footer.tagline }}</p>
      </div>
      <div class="sutunlar">
        <nav class="sutun" :aria-label="t.footer.app">
          <h2>{{ t.footer.app }}</h2>
          <RouterLink :to="section('oyunlar')">{{ t.nav.oyunlar }}</RouterLink>
          <RouterLink :to="section('ozellikler')">{{ t.nav.ozellikler }}</RouterLink>
          <RouterLink :to="section('premium')">{{ t.nav.premium }}</RouterLink>
          <RouterLink :to="DEMO_ROUTE" target="_blank">{{ t.footer.demo }}</RouterLink>
        </nav>
        <nav class="sutun" :aria-label="t.footer.legal">
          <h2>{{ t.footer.legal }}</h2>
          <RouterLink v-for="l in t.footer.links" :key="l.to" :to="l.to">{{ l.label }}</RouterLink>
        </nav>
        <div class="sutun">
          <h2>{{ t.footer.contact }}</h2>
          <a :href="`mailto:${CONTACT.email}`">{{ CONTACT.email }}</a>
        </div>
      </div>
    </div>
    <hr class="ayrac" />
    <div class="alt">
      <p>© 2026 Odit Teknoloji ve İletişim Hizmetleri Ticaret A.Ş.</p>
      <p>{{ t.footer.disclaimer }}</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 40px max(20px, calc((100% - 1200px) / 2)) 32px;
  background: var(--arka-plan-alt);
  border-top: 1px solid var(--cizgi-ince);
}
.ust {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.marka {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.aciklama {
  max-width: 350px;
  font: 400 14px/21px var(--font-inter);
  color: var(--metin-ikincil);
}
.sutunlar {
  display: flex;
  flex-wrap: wrap;
  gap: 28px 24px;
}
.sutun {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  white-space: nowrap;
}
.sutun h2 {
  font: 700 12px/normal var(--font-inter);
  letter-spacing: 1.3px;
  text-transform: uppercase;
  color: var(--metin-ikincil);
}
.sutun a {
  font: 500 14.5px/normal var(--font-inter);
  color: var(--metin-birincil);
}
.sutun a:hover {
  color: var(--vurgu-altin);
}
.ayrac {
  width: 100%;
  height: 1px;
  margin: 0;
  border: 0;
  background: var(--cizgi-ince);
}
.alt {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font: 400 13px/normal var(--font-inter);
  color: var(--metin-ikincil);
}
@media (min-width: 1024px) {
  .footer {
    gap: 48px;
    padding-top: 64px;
    padding-bottom: 40px;
  }
  .ust {
    flex-direction: row;
    gap: 80px;
  }
  .marka {
    flex: 1 0 0;
  }
  .aciklama {
    max-width: 340px;
  }
  .sutunlar {
    flex-wrap: nowrap;
    gap: 72px;
  }
  .alt {
    flex-direction: row;
    justify-content: space-between;
    gap: 24px;
  }
}
</style>
