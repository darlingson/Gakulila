import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { api, meOptions, ApiError } from '@/lib/api'

export const Route = createFileRoute('/_public/login')({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }),
  component: Login,
})

function Login() {
  const search = Route.useSearch()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = useMutation({
    mutationFn: (body: { username: string; password: string }) =>
      api('/api/v1/auth/login', { method: 'POST', body: JSON.stringify(body) }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['me'] })
      await navigate({ to: search.redirect ?? '/dashboard' })
    },
  })

  return (
    <div className="mx-auto max-w-sm px-6 py-24">
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-2xl">Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              login.mutate({ username, password })
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            {login.isError && (
              <p className="text-sm text-ember">
                {login.error instanceof ApiError && login.error.status === 401
                  ? 'Invalid username or password.'
                  : 'Something went wrong. Try again.'}
              </p>
            )}

            <Button
              type="submit"
              className="w-full rounded-full bg-ember hover:bg-ember-deep"
              disabled={login.isPending}
            >
              {login.isPending ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-soft">
            <Link to="/" className="underline underline-offset-4 hover:text-ink">
              Back to home
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}