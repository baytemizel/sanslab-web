<script setup>
// Yasal metin sayfası — Gizlilik, Kullanım Şartları, KVKK (TR) · Privacy, Terms, GDPR (EN)
import { computed, watchEffect, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import WebNav from './components/WebNav.vue'
import WebFooter from './components/WebFooter.vue'
import Eyebrow from './components/Eyebrow.vue'
import { LEGAL_DOCS, RELATED, UI } from './legal'

const props = defineProps({ docKey: { type: String, required: true } })
const router = useRouter()

const entry = computed(() => LEGAL_DOCS[props.docKey])
const doc = computed(() => entry.value.doc)
const ui = computed(() => UI[entry.value.lang])
const alt = computed(() => entry.value.alt && LEGAL_DOCS[entry.value.alt])
const related = computed(() =>
  RELATED[entry.value.lang].filter((k) => k !== props.docKey).map((k) => LEGAL_DOCS[k]),
)

watchEffect(() => (document.documentElement.lang = entry.value.lang))
onBeforeUnmount(() => (document.documentElement.lang = 'tr'))

// Metin içindeki site içi bağlantılar (ör. /kvkk) tam sayfa yenilemeden açılsın.
function onContentClick(e) {
  const a = e.target.closest('a')
  const href = a?.getAttribute('href')
  if (!href?.startsWith('/') || e.metaKey || e.ctrlKey || e.shiftKey) return
  e.preventDefault()
  router.push(href)
}
</script>

<template>
  <div class="site">
    <WebNav />
    <main class="sayfa" @click="onContentClick">
      <header class="baslik-alani">
        <Eyebrow>{{ entry.lang === 'tr' ? 'Yasal' : 'Legal' }}</Eyebrow>
        <h1>{{ doc.title }}</h1>
        <div class="ust-bilgi">
          <span>{{ doc.updated }}</span>
          <RouterLink v-if="alt" :to="alt.path" class="dil" :hreflang="alt.lang">{{ ui.alt }}</RouterLink>
        </div>
      </header>

      <div class="giris">
        <template v-for="(b, i) in doc.intro" :key="i">
          <p v-if="b.type === 'p'" v-html="b.html" />
          <ul v-else-if="b.type === 'list'"><li v-for="(li, j) in b.items" :key="j" v-html="li" /></ul>
        </template>
      </div>

      <nav class="icindekiler" :aria-label="ui.toc">
        <h2>{{ ui.toc }}</h2>
        <ol>
          <li v-for="s in doc.sections" :key="s.id">
            <RouterLink :to="{ hash: `#${s.id}` }">{{ s.title }}</RouterLink>
          </li>
        </ol>
      </nav>

      <section v-for="s in doc.sections" :id="s.id" :key="s.id" class="bolum">
        <h2>{{ s.title }}</h2>
        <template v-for="(b, i) in s.blocks" :key="i">
          <h3 v-if="b.type === 'h3'">{{ b.text }}</h3>
          <p v-else-if="b.type === 'p'" v-html="b.html" />
          <ul v-else-if="b.type === 'list'"><li v-for="(li, j) in b.items" :key="j" v-html="li" /></ul>
        </template>
      </section>

      <nav class="ilgili" :aria-label="ui.related">
        <h2>{{ ui.related }}</h2>
        <RouterLink v-for="r in related" :key="r.path" :to="r.path" :hreflang="r.lang">
          {{ r.doc.title }}<span v-if="r.lang !== entry.lang" class="dil-etiket">{{ r.lang.toUpperCase() }}</span>
        </RouterLink>
      </nav>
    </main>
    <WebFooter />
  </div>
</template>

<style scoped>
.site {
  min-height: 100dvh;
  background: var(--arka-plan-alt);
  overflow-x: clip;
}
.sayfa {
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: calc(760px + 40px);
  margin: 0 auto;
  padding: 40px 20px 64px;
  font: 400 15px/25px var(--font-inter);
  color: var(--metin-ikincil);
  overflow-wrap: anywhere;
}
.baslik-alani {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}
h1 {
  font: 800 32px/38px var(--font-sora);
  letter-spacing: -0.8px;
  color: var(--metin-birincil);
}
.ust-bilgi {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
  font-size: 13.5px;
}
.dil {
  padding: 4px 12px;
  border: 1px solid var(--cizgi-kenar);
  border-radius: 999px;
  font-weight: 600;
  color: var(--metin-birincil);
}
.dil:hover {
  border-color: var(--cizgi-altin-ton);
  color: var(--vurgu-altin);
}
.giris,
.bolum {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.bolum {
  scroll-margin-top: 88px;
}
.bolum h2,
.icindekiler h2,
.ilgili h2 {
  font: 700 19px/26px var(--font-sora);
  letter-spacing: -0.2px;
  color: var(--metin-birincil);
}
.bolum h3 {
  margin-top: 4px;
  font: 700 15.5px/22px var(--font-inter);
  color: var(--vurgu-altin);
}
ul {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding-left: 20px;
}
li::marker {
  color: var(--vurgu-altin-dolgu);
}
:deep(strong) {
  font-weight: 600;
  color: var(--metin-birincil);
}
.giris :deep(a),
.bolum :deep(a) {
  color: var(--vurgu-altin);
  text-decoration: underline;
  text-decoration-color: var(--cizgi-altin-ton);
  text-underline-offset: 3px;
}
.icindekiler,
.ilgili {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 24px;
  border: 1px solid var(--cizgi-kenar);
  border-radius: 18px;
  background: var(--yuzey-kart);
}
.icindekiler ol {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none; /* başlıklar zaten numaralı */
}
.icindekiler a,
.ilgili a {
  color: var(--metin-birincil);
}
.icindekiler a:hover,
.ilgili a:hover {
  color: var(--vurgu-altin);
}
.ilgili a {
  font-weight: 500;
}
.dil-etiket {
  margin-left: 8px;
  padding: 1px 6px;
  border-radius: 6px;
  background: var(--yuzey-secili);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: var(--metin-ikincil);
}
@media (min-width: 1024px) {
  .sayfa {
    gap: 40px;
    padding-top: 72px;
    padding-bottom: 96px;
    font-size: 16px;
    line-height: 27px;
  }
  h1 {
    font-size: 44px;
    line-height: 52px;
    letter-spacing: -1.2px;
  }
  .bolum h2 {
    font-size: 22px;
    line-height: 30px;
  }
}
</style>
