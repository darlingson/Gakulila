import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: () => <p className="text-ink-soft">Dashboard pages land here next.</p>,
})