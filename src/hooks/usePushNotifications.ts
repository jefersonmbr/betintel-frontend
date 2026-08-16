'use client'

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'
import { api } from '@/lib/api'

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)))
}

// isSupported/permission dependem de APIs que so existem no navegador -
// useSyncExternalStore le esses valores com seguranca durante SSR/hidratacao
// (sem isso, o servidor e o cliente calculam valores diferentes e o React
// acusa mismatch de hidratacao).
const noopSubscribe = () => () => {}

function getIsSupportedSnapshot(): boolean {
  return 'serviceWorker' in navigator && 'PushManager' in window
}
function getIsSupportedServerSnapshot(): boolean {
  return false
}

function getPermissionSnapshot(): NotificationPermission | 'unsupported' {
  return getIsSupportedSnapshot() ? Notification.permission : 'unsupported'
}
function getPermissionServerSnapshot(): NotificationPermission | 'unsupported' {
  return 'unsupported'
}

export function usePushNotifications() {
  const isSupported = useSyncExternalStore(
    noopSubscribe,
    getIsSupportedSnapshot,
    getIsSupportedServerSnapshot
  )
  const permission = useSyncExternalStore(
    noopSubscribe,
    getPermissionSnapshot,
    getPermissionServerSnapshot
  )

  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isSupported) {
      return
    }
    navigator.serviceWorker.register('/sw.js').then(async (registration) => {
      const subscription = await registration.pushManager.getSubscription()
      setIsSubscribed(Boolean(subscription))
    })
  }, [isSupported])

  const subscribe = useCallback(async () => {
    if (!isSupported) {
      return
    }
    setIsLoading(true)
    try {
      const result = await Notification.requestPermission()
      if (result !== 'granted') {
        return
      }

      const registration = await navigator.serviceWorker.ready
      const { data } = await api.get<{ publicKey?: string }>('/push/vapid-public-key')
      if (!data.publicKey) {
        return
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(data.publicKey) as BufferSource,
      })

      await api.post('/push/subscribe', subscription.toJSON())
      setIsSubscribed(true)
    } finally {
      setIsLoading(false)
    }
  }, [isSupported])

  return { permission, isSubscribed, isLoading, isSupported, subscribe }
}
