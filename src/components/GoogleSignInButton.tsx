'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import { Alert, Divider } from '@mui/material'
import { useAuth } from '@/contexts/AuthContext'

type GoogleCredentialResponse = { credential: string }

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string
            callback: (response: GoogleCredentialResponse) => void
          }) => void
          renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void
        }
      }
    }
  }
}

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

export default function GoogleSignInButton() {
  const buttonRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { loginWithGoogle } = useAuth()
  const [error, setError] = useState<string | null>(null)

  // renderButton so' funciona depois que o script do GIS carrega - a
  // primeira montagem em SPA (script ja' em cache de uma pagina anterior)
  // nao dispara onLoad de novo, entao checamos window.google direto no
  // useEffect tambem.
  const initGoogleButton = useCallback(() => {
    if (!clientId || !buttonRef.current || !window.google) {
      return
    }
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response) => {
        setError(null)
        try {
          await loginWithGoogle(response.credential)
          router.push('/perfil')
        } catch {
          setError('Não foi possível entrar com Google. Verifique se o backend está rodando.')
        }
      },
    })
    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: 'outline',
      size: 'large',
      width: 320,
      locale: 'pt-BR',
    })
  }, [loginWithGoogle, router])

  useEffect(() => {
    if (window.google) {
      initGoogleButton()
    }
  }, [initGoogleButton])

  if (!clientId) {
    return null
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initGoogleButton}
      />
      <Divider sx={{ my: 3 }}>ou</Divider>
      {error && <Alert severity="error">{error}</Alert>}
      <div ref={buttonRef} />
    </>
  )
}
