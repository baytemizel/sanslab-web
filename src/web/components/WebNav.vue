<script setup>
// "Web/Nav — Masaüstü" (80px) / "Web/Nav — Mobil" (64px, menü butonu)
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon from '@/components/AppIcon.vue'
import Logo from './Logo.vue'
import { NAV_LINKS } from '../links'

const open = ref(false)
const route = useRoute()
watch(() => route.hash, () => (open.value = false))
</script>

<template>
  <header class="nav" :class="{ acik: open }">
    <div class="ic">
      <Logo class="logo" />
      <nav class="baglantilar" aria-label="Sayfa bölümleri">
        <a v-for="l in NAV_LINKS" :key="l.id" :href="`#${l.id}`">{{ l.label }}</a>
      </nav>
      <a href="#indir" class="indir">İndir</a>
      <button
        type="button"
        class="menu-buton"
        :aria-expanded="open"
        aria-controls="mobil-menu"
        :aria-label="open ? 'Menüyü kapat' : 'Menüyü aç'"
        @click="open = !open"
      >
        <AppIcon :name="open ? 'x' : 'menu'" :size="20" color="var(--metin-birincil)" />
      </button>
    </div>
    <nav v-show="open" id="mobil-menu" class="mobil-menu" aria-label="Sayfa bölümleri">
      <a v-for="l in NAV_LINKS" :key="l.id" :href="`#${l.id}`" @click="open = false">{{ l.label }}</a>
      <a href="#indir" class="indir indir--mobil" @click="open = false">İndir</a>
    </nav>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--arka-plan-alt);
  border-bottom: 1px solid var(--cizgi-ince);
  backdrop-filter: blur(10px);
}
.ic {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding-inline: max(20px, calc((100% - 1200px) / 2));
}
.logo {
  font-size: 20px;
}
.baglantilar,
.ic > .indir {
  display: none;
}
.baglantilar {
  gap: 36px;
}
.baglantilar a,
.mobil-menu a {
  font: 500 15px/normal var(--font-inter);
  color: var(--metin-ikincil);
  white-space: nowrap;
  transition: color 0.15s ease;
}
.baglantilar a:hover,
.mobil-menu a:hover {
  color: var(--metin-birincil);
}
.indir {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 22px;
  border-radius: 999px;
  background-image: linear-gradient(150.57deg, rgb(255, 216, 118) 0%, rgb(244, 192, 74) 50%, rgb(224, 160, 46) 100%);
  box-shadow: 0 6px 18px rgba(244, 192, 74, 0.35);
  font: 700 15px/normal var(--font-inter);
  color: var(--vurgu-altin-ustu) !important;
  white-space: nowrap;
}
.menu-buton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
}
.mobil-menu {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 20px 20px 24px;
  border-top: 1px solid var(--cizgi-ince);
}
.indir--mobil {
  margin-top: 4px;
}
@media (min-width: 1024px) {
  .ic {
    height: 80px;
  }
  .logo {
    font-size: 24px;
  }
  .baglantilar {
    display: flex;
  }
  .ic > .indir {
    display: inline-flex;
  }
  .menu-buton,
  .mobil-menu {
    display: none !important;
  }
}
</style>
