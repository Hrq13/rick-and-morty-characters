import { ENDPOINTS } from '@/utils/endpoints'

interface Endpoint {
  key: keyof typeof ENDPOINTS
  url: string
}

export function getEndpoint(name: Endpoint['key']): Endpoint['url'] {
  if (!name)
    return ''

  return ENDPOINTS[name]
}
