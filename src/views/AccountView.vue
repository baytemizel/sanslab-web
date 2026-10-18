<script setup>
// Figma: 16 · Hesap (giriş yapılmış) (11:2491). Giriş yapılmamışsa giriş ekranına yönlendirilir.
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import ScreenShell from '@/components/ScreenShell.vue'
import NavHeader from '@/components/NavHeader.vue'
import AppIcon from '@/components/AppIcon.vue'
import ProfileCard from '@/components/account/ProfileCard.vue'
import { store, resetAll } from '@/store'

const router = useRouter()

onBeforeMount(() => {
  if (!store.user) router.replace({ name: 'login' })
})

function signOut() {
  store.user = null
  router.replace({ name: 'settings' })
}

function deleteAccount() {
  const ok = window.confirm(
    'Hesabını silmek istediğine emin misin? Profil bilgilerin ve bu cihazdaki kupon geçmişin kalıcı olarak silinir.',
  )
  if (!ok) return
  // TODO: sunucu tarafında hesap silme (hesap altyapısı eklendiğinde)
  resetAll()
  router.replace({ name: 'onboarding', params: { step: '1' } })
}
</script>

<template>
  <ScreenShell :top="0" :bottom="24">
    <NavHeader title="Hesap" :fallback="{ name: 'settings' }" />

    <template v-if="store.user">
      <ProfileCard class="profil" :name="store.user.name" :email="store.user.email" :premium="store.premium" />

      <div class="esnek-bosluk" />

      <button type="button" class="cikis" @click="signOut">
        <AppIcon name="log-out" :size="17" color="var(--metin-birincil)" />
        <span class="t-satir-etiket">Çıkış yap</span>
      </button>
      <button type="button" class="sil" @click="deleteAccount">Hesabımı sil</button>
      <p class="aciklama t-govde-xs ikincil">
        Hesabını sildiğinde profil bilgilerin ve bu cihazdaki kupon geçmişin kalıcı olarak silinir. Mağaza aboneliğin
        ayrıca mağaza hesabından iptal edilmelidir.
      </p>
    </template>
  </ScreenShell>
</template>

<style scoped>
.profil {
  margin-top: 16px;
}
.esnek-bosluk {
  flex: 1 0 24px;
}
.cikis {
  display: flex;
  gap: 13px;
  align-items: center;
  width: 100%;
  padding: 15px 16px;
  border-radius: 16px;
  background: var(--yuzey-kart);
  border: 1px solid var(--cizgi-kenar);
  color: var(--metin-birincil);
  text-align: left;
}
.sil {
  align-self: center;
  margin-top: 18px;
  font: 600 13px/normal var(--font-inter);
  color: var(--durum-hata, #f5333b);
}
.aciklama {
  margin-top: 10px;
  text-align: center;
}
</style>
