'use client'

import { createContext, useCallback, useContext, useSyncExternalStore } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { getToken, setToken, clearToken } from '@/lib/auth-storage'
import { User } from '@/types/user'

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null)

// le se existe token com seguranca em SSR (mesmo motivo do
// usePushNotifications: localStorage so existe no navegador).
const noopSubscribe = () => () => {}
function getHasTokenSnapshot(): boolean {
  return getToken() !== null
}
function getHasTokenServerSnapshot(): boolean {
  return false
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient()
  const hasToken = useSyncExternalStore(
    noopSubscribe,
    getHasTokenSnapshot,
    getHasTokenServerSnapshot
  )

  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const { data } = await api.get<User>('/auth/me')
      return data
    },
    enabled: hasToken,
    retry: false,
  })

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await api.post<{ accessToken: string, user: User }>('/auth/login', {
      email,
      password,
    })
    setToken(data.accessToken)
    queryClient.setQueryData(['me'], data.user)
  }, [queryClient])

  const register = useCallback(async (email: string, password: string, name?: string) => {
    const { data } = await api.post<{ accessToken: string, user: User }>('/auth/register', {
      email,
      password,
      name,
    })
    setToken(data.accessToken)
    queryClient.setQueryData(['me'], data.user)
  }, [queryClient])

  const logout = useCallback(() => {
    clearToken()
    queryClient.clear()
  }, [queryClient])

  return (
    <AuthContext.Provider
      value={{
        user: hasToken ? (user ?? null) : null,
        isLoading: hasToken && isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth precisa ser usado dentro de um AuthProvider')
  }
  return context
}
