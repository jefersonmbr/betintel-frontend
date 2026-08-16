import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { Alert, CreateAlertInput } from '@/types/alert'

export function useAlerts(enabled: boolean = true) {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      const { data } = await api.get<Alert[]>('/alerts')
      return data
    },
    enabled,
  })
}

export function useCreateAlert() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: CreateAlertInput) => {
      const { data } = await api.post<Alert>('/alerts', input)
      return data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alerts'] }),
  })
}

export function useDeleteAlert() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/alerts/${id}`)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alerts'] }),
  })
}

export function useTriggerAlert() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.patch<Alert>(`/alerts/${id}/trigger`)
      return data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alerts'] }),
  })
}

export function useUpdateAlert() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, targetOdd }: { id: string, targetOdd: number }) => {
      const { data } = await api.patch<Alert>(`/alerts/${id}`, { targetOdd })
      return data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alerts'] }),
  })
}

export function useCancelAlert() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.patch<Alert>(`/alerts/${id}/cancel`)
      return data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alerts'] }),
  })
}
