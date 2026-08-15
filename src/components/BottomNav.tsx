'use client'

import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PersonIcon from '@mui/icons-material/Person'
import { useRouter, usePathname } from 'next/navigation'
import { useMemo } from 'react'

export default function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()

  const value = useMemo(() => {
    if (pathname.startsWith('/alertas')) {
      return 1
    }
    if (pathname.startsWith('/perfil')) {
      return 2
    }
    return 0
  }, [pathname])

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={(_, newValue) => {
          if (newValue === 0) {
            router.push('/')
          }
          if (newValue === 1) {
            router.push('/alertas')
          }
          if (newValue === 2) {
            router.push('/perfil')
          }
        }}
      >
        <BottomNavigationAction
          label="Jogos"
          icon={<SportsSoccerIcon />}
        />
        <BottomNavigationAction
          label="Alertas"
          icon={<NotificationsIcon />}
        />
        <BottomNavigationAction
          label="Perfil"
          icon={<PersonIcon />}
        />
      </BottomNavigation>
    </Paper>
  )
}
