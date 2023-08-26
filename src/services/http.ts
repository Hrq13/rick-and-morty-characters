import axios from 'axios'

import { HttpOptions } from '@/types/services/http'

export function httpRequest() {
  return {
    get: async (url: string, options: HttpOptions) => {
      const response = await axios.get(url, options)
      return response.data
    }
  }
}
