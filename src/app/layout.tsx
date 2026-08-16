import type { Metadata } from 'next'
import BottomNav from '@/components/BottomNav'
import LegalFooter from '@/components/LegalFooter'
import ThemeRegistry from '@/components/ThemeRegistry'

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
        <ThemeRegistry>
          {children}
          <LegalFooter />
          <BottomNav />
        </ThemeRegistry>
      </body>
    </html>
  );
}
