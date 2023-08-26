import { getEndpoint } from '@/utils/get-endpoint/get-endpoint'
import { httpRequest } from './http'

export async function getCharacters(query?: Record<string, string>) {
  const http = httpRequest()
  const endpoint = getEndpoint('CHARACTER')

  const response = await http.get(endpoint, { params: query })
  return response
}
