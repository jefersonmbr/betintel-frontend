import type { Metadata } from 'next'
import BottomNav from '@/components/BottomNav'
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
          <BottomNav />
        </ThemeRegistry>
      </body>
    </html>
  );
}
