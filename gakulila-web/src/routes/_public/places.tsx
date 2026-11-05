import { Link, createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { placesOptions, ratingsOptions, averageFor } from '@/lib/api'
import { StarRating } from '@/components/star-rating'

export const Route = createFileRoute('/_public/places')({
  component: Places,
})

function Places() {
  const { data: places, isPending, error } = useQuery(placesOptions)
  const { data: ratings } = useQuery(ratingsOptions)
  const [filter, setFilter] = useState('')

  // client-side filtering — separate query + JS filter, per your preference
  const visible = (places ?? []).filter(
    (p) =>
      p.name.toLowerCase().includes(filter.toLowerCase()) ||
      (p.location ?? '').toLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-4xl font-semibold">Places</h1>
          <p className="mt-2 text-ink-soft">Everywhere logged so far.</p>
        </div>
        <Input
          placeholder="Search by name or location…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="md:w-72"
        />
      </div>

      {isPending && <p className="mt-12 text-ink-soft">Loading…</p>}
      {error && <p className="mt-12 text-ember">Failed to load places.</p>}

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <Link
            key={p.id}
            to="/places/$placeId"
            params={{ placeId: String(p.id) }}
            className="rounded-card border border-sand bg-white p-6 hover:border-ink transition-colors"
          >
            <h2 className="font-display text-xl font-semibold">{p.name}</h2>
            {p.location && <p className="mt-1 text-sm text-ink-soft">{p.location}</p>}
            <div className="mt-4">
              <StarRating value={averageFor(ratings ?? [], p.id)} />
            </div>
          </Link>
        ))}
      </div>

      {!isPending && visible.length === 0 && (
        <p className="mt-12 text-ink-soft">No places match.</p>
      )}
    </div>
  )
}