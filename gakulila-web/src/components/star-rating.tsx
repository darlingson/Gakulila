export function StarRating({ value }: { value: number | null }) {
  if (value === null) {
    return <span className="text-sm text-ink-soft">Not yet rated</span>
  }
  const full = Math.round(value)
  return (
    <span className="text-lg tracking-wider" title={`${value.toFixed(1)} / 5`}>
      <span className="text-gold">{'★'.repeat(full)}</span>
      <span className="text-sand">{'★'.repeat(5 - full)}</span>
      <span className="ml-2 text-sm font-medium text-ink-soft">
        {value.toFixed(1)}
      </span>
    </span>
  )
}