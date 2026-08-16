import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Game } from '@/types/game'

export function useGames() {
  return useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const { data } = await api.get<Game[]>('/games')
      return data
    },
  })
}
