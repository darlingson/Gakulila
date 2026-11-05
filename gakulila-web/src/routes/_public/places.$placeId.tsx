import { Link, createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { placesOptions, ratingsOptions, menuOptions, averageFor } from '@/lib/api'
import { StarRating } from '@/components/star-rating'
import { Separator } from '@/components/ui/separator'

export const Route = createFileRoute('/_public/places/$placeId')({
  component: PlaceDetail,
})

function PlaceDetail() {
  const { placeId } = Route.useParams()
  const { data: places } = useQuery(placesOptions)
  const { data: ratings } = useQuery(ratingsOptions)
  const { data: menu, isPending: menuPending } = useQuery(menuOptions(placeId))

  const place = places?.find((p) => p.id === Number(placeId))
  const placeRatings = (ratings ?? [])
    .filter((r) => r.eatingPlaceId === Number(placeId))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  if (!place) return <p className="mx-auto max-w-6xl px-6 py-24 text-ink-soft">Place not found.</p>

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link to="/places" className="text-sm text-ink-soft hover:text-ink">
        ← All places
      </Link>

      <h1 className="mt-4 font-display text-4xl font-semibold">{place.name}</h1>
      {place.location && <p className="mt-2 text-ink-soft">{place.location}</p>}
      <div className="mt-4">
        <StarRating value={averageFor(ratings ?? [], place.id)} />
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold">Menu</h2>
        {menuPending && <p className="mt-4 text-ink-soft">Loading…</p>}
        {menu && menu.length === 0 && <p className="mt-4 text-ink-soft">No menu items yet.</p>}
        <ul className="mt-4 divide-y divide-sand rounded-card border border-sand bg-white">
          {menu?.map((m) => (
            <li key={m.id} className="flex items-baseline justify-between gap-4 px-6 py-4">
              <div>
                <p className="font-medium">{m.name}</p>
                {m.description && <p className="text-sm text-ink-soft">{m.description}</p>}
              </div>
              {m.price !== null && <p className="font-semibold whitespace-nowrap">MK {m.price}</p>}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold">Ratings</h2>
        {placeRatings.length === 0 && <p className="mt-4 text-ink-soft">No ratings yet.</p>}
        <ul className="mt-4 space-y-4">
          {placeRatings.map((r) => (
            <li key={r.id} className="rounded-card border border-sand bg-white px-6 py-4">
              <div className="flex items-center justify-between">
                <StarRating value={r.score} />
                <time className="text-sm text-ink-soft">
                  {new Date(r.createdAt).toLocaleDateString()}
                </time>
              </div>
              {r.comment && <p className="mt-2 text-ink-soft">{r.comment}</p>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}