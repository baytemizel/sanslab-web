import { router } from '@/router'

// Tarayıcı geçmişi varsa geri gider, yoksa (doğrudan açılan sayfa) yedek rotaya yönlenir.
export function goBack(fallback = { name: 'home' }) {
  if (window.history.state?.back) router.back()
  else router.replace(fallback)
}
