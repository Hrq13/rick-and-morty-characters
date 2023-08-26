import { ENDPOINTS } from '@/utils/endpoints'

interface Endpoint {
  key: keyof typeof ENDPOINTS
  url: string
}

type QueryParams = Record<string, string>

export function getEndpoint(name: Endpoint['key'], queryParams?: QueryParams): Endpoint['url'] {
  if (!name)
    return ''

  if (!queryParams)
    return ENDPOINTS[name]

  const stringifiedQueryParams = new URLSearchParams(queryParams)
  return ENDPOINTS[name] + stringifiedQueryParams
}
