import { createFileRoute } from '@tanstack/react-router'

import { HelloPage } from '@/features/hello/pages/hello-page'

export const Route = createFileRoute('/')({
  component: HelloPage,
})
