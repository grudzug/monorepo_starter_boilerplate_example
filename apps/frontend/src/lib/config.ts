import { DEFAULT_API_BASE_URL, DEFAULT_APP_URL } from '@/lib/url-defaults'

const config = {
  app: {
    URL: import.meta.env.VITE_APP_URL ?? DEFAULT_APP_URL,
  },
  api: {
    BASE_URL: import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL,
  },
} as const

export default config
