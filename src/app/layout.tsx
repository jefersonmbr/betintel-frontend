import type { Metadata } from 'next'
import BottomNav from '@/components/BottomNav'
import LegalFooter from '@/components/LegalFooter'
import ThemeRegistry from '@/components/ThemeRegistry'
import QueryProvider from '@/components/QueryProvider'
import { AuthProvider } from '@/contexts/AuthContext'

export const metadata: Metadata = {
  title: 'BetIntel AI',
  description: 'Análise inteligente de apostas esportivas',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <QueryProvider>
          <AuthProvider>
            <ThemeRegistry>
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
