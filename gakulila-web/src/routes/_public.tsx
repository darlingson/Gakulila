import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
})

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-sand bg-paper">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-display text-2xl font-semibold tracking-tight">
            Gakulila
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link to="/places" className="text-ink-soft hover:text-ink transition-colors">
              Places
            </Link>
            <Link
              to="/login"
              className="rounded-full bg-ember px-4 py-2 text-white hover:bg-ember-deep transition-colors"
            >
              Sign in
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-sand py-8 text-center text-sm text-ink-soft">
        Gakulila — a personal log of places worth eating at.
      </footer>
    </div>
  )
}