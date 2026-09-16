import type { HelloResponse } from '@repo/contracts'
import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'

import { fetchHello } from '@/features/hello/api/hello-api'
import { Button } from '@/features/shared/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/features/shared/components/ui/card'

export function HelloPage() {
  const [name, setName] = useState('World')
  const [submittedName, setSubmittedName] = useState('World')

  const helloQuery = useQuery({
    queryKey: ['hello', submittedName],
    queryFn: () => fetchHello({ name: submittedName }),
  })

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/40 p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Hello World</CardTitle>
          <CardDescription>
            Calls the NestJS <code className="text-xs">GET /v1/hello</code> endpoint and validates
            the response with shared Zod contracts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium">Name</span>
            <input
              className="h-9 rounded-md border border-input bg-background px-3 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <div className="rounded-md border bg-muted/50 px-3 py-4 text-sm">
            <GreetingResult query={helloQuery} />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="button"
            onClick={() => setSubmittedName(name.trim() || 'World')}
            disabled={helloQuery.isFetching}
          >
            Greet
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}

function GreetingResult({ query }: { query: UseQueryResult<HelloResponse> }) {
  switch (query.status) {
    case 'pending':
      return <p className="text-muted-foreground">Loading…</p>
    case 'error':
      return (
        <p className="text-destructive">
          {query.error instanceof Error ? query.error.message : 'Failed to load greeting'}
        </p>
      )
    case 'success':
      return <p className="text-lg font-medium">{query.data.message}</p>
    default: {
      const _exhaustive: never = query
      return _exhaustive
    }
  }
}
