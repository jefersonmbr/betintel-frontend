import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Game } from '@/types/game'

export function useGame(id: string) {
  return useQuery({
    queryKey: ['games', id],
    queryFn: async () => {
      const { data } = await api.get<Game>(`/games/${id}`)
      return data
    },
    enabled: Boolean(id),
  })
}
