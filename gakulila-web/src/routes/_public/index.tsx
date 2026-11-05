import { Link, createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { placesOptions, ratingsOptions, averageFor } from '@/lib/api'
import { StarRating } from '@/components/star-rating'

export const Route = createFileRoute('/_public/')({
  component: Landing,
})

function Landing() {
  const { data: places } = useQuery(placesOptions)
  const { data: ratings } = useQuery(ratingsOptions)

  const latest = places?.slice(0, 3) ?? []

  return (
    <div>
      {/* hero */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-ember">
          A personal food log
        </p>
        <h1 className="mt-4 font-display text-5xl md:text-6xl font-semibold leading-tight tracking-tight">
          Every plate
          <br />
          worth remembering.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink-soft">
          Eating places, menus, and honest ratings — collected one meal at a time.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            to="/places"
            className="rounded-full bg-ember px-6 py-3 font-medium text-white hover:bg-ember-deep transition-colors"
          >
            Browse places
          </Link>
        </div>
      </section>

      {/* latest places */}
      <section className="border-t border-sand bg-cream/50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-3xl font-semibold">Recently added</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {latest.map((p) => (
              <Link
                key={p.id}
                to="/places/$placeId"
                params={{ placeId: String(p.id) }}
                className="rounded-card border border-sand bg-white p-6 hover:border-ink transition-colors"
              >
                <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                {p.location && <p className="mt-1 text-sm text-ink-soft">{p.location}</p>}
                <div className="mt-4">
                  <StarRating value={averageFor(ratings ?? [], p.id)} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}