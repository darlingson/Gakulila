// src/routes/places.tsx
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/places')({
  component: Places,
})

function Places() {
  const { data, isPending, error } = useQuery({
    queryKey: ['eating-places'],
    queryFn: () => fetch('/api/v1/eating-places').then((r) => r.json()),
  })

  if (isPending) return <p>Loading…</p>
  if (error) return <p>Failed to load places</p>
  return (
    <ul>
      {data.map((p: { id: number; name: string }) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  )
}