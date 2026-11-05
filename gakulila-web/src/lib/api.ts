export interface UserResponse {
  username: string
  email: string | null
  roles: string[]
  permissions: string[]
}

export interface EatingPlace {
  id: number
  name: string
  location: string | null
  createdAt: string
}

export interface MenuItem {
  id: number
  eatingPlaceId: number
  name: string
  price: number | null
  description: string | null
}

export interface Rating {
  id: number
  eatingPlaceId: number
  score: number
  comment: string | null
  createdAt: string
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
  }
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    ...init,
  })
  if (!res.ok) throw new ApiError(res.status, await res.text())
  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

// --- query options (used by both router guards and components) ---

import { queryOptions } from '@tanstack/react-query'

export const meOptions = queryOptions({
  queryKey: ['me'],
  queryFn: async () => {
    try {
      return await api<UserResponse>('/api/v1/users/me')
    } catch (e) {
      if (e instanceof ApiError && (e.status === 401 || e.status === 403)) return null
      throw e
    }
  },
  staleTime: 5 * 60 * 1000,
  retry: false,
})

export const placesOptions = queryOptions({
  queryKey: ['eating-places'],
  queryFn: () => api<EatingPlace[]>('/api/v1/eating-places'),
})

export const ratingsOptions = queryOptions({
  queryKey: ['ratings'],
  queryFn: () => api<Rating[]>('/api/v1/ratings'),
})

export const menuOptions = (placeId: string) =>
  queryOptions({
    queryKey: ['menu-items', placeId],
    queryFn: () => api<MenuItem[]>(`/api/v1/eating-places/${placeId}/menu-items`),
  })

// rating helpers — averages computed client-side, per your keep-it-simple preference
export function averageFor(ratings: Rating[], placeId: number): number | null {
  const scores = ratings.filter((r) => r.eatingPlaceId === placeId).map((r) => r.score)
  if (scores.length === 0) return null
  return scores.reduce((a, b) => a + b, 0) / scores.length
}