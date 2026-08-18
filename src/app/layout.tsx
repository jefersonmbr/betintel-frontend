import type { Metadata, Viewport } from 'next'
import AppHeader from '@/components/AppHeader'
import BottomNav from '@/components/BottomNav'
import LegalFooter from '@/components/LegalFooter'
import ThemeRegistry from '@/components/ThemeRegistry'
import QueryProvider from '@/components/QueryProvider'
import { AuthProvider } from '@/contexts/AuthContext'
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister'

export const metadata: Metadata = {
  title: 'BetIntel',
  description: 'Compare odds de apostas esportivas entre casas e crie alertas de preço',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'BetIntel',
  },
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/icon-192.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1976d2',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ServiceWorkerRegister />
        <QueryProvider>
          <AuthProvider>
            <ThemeRegistry>
              <AppHeader />
              {children}
              <LegalFooter />
              <BottomNav />
            </ThemeRegistry>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
