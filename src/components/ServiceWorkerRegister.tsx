'use client'

import { useEffect } from 'react'

// Registra o service worker em toda a aplicação, não só em /perfil, pra
// atender ao critério de instalabilidade do PWA (manifest + SW ativo) em
// qualquer página. Idempotente: navegadores dedupam registro pela mesma
// scope/URL, então não conflita com o registro que usePushNotifications
// também faz ao entrar em /perfil.
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  }, [])

  return null
}
