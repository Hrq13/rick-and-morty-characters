import { ref } from 'vue'
import axios from 'axios'

import { getEndpoint } from '@/utils/get-endpoint/get-endpoint'
import { CharacterInfo, CharacterCondition} from '@/types/CharacterInfo'

export function useCharacterCards() {
  const countPerPage = ref(10)
  const currentPage = ref(1)
  const loadedCharacters = ref<CharacterInfo[]>([])
  const searchName = ref<string>()
  const searchStatus = ref<CharacterCondition>()

  function getCharacterEndpoint(filters: Record<string, string> = {}): string {
    const endpoint = getEndpoint('CHARACTER', {
      page: currentPage.value.toFixed(),
      count: countPerPage.value.toString(),
      ...filters
    })

    return endpoint
  }

  function clearFilters() {
    searchName.value = undefined
    searchStatus.value = undefined
  }

  function buildFilterObject() {
    return {
      ...(searchName.value && { name: searchName.value }),
      ...(searchStatus.value && { status: searchStatus.value })
    }
  }

  async function loadCharacterCards() {
    const filters = buildFilterObject()
    const endpoint = getCharacterEndpoint(filters)
    const response = await axios.get<never, CharacterInfo[]>(endpoint)
    loadedCharacters.value = response
  }

  async function loadNextPage() {
    currentPage.value++
    await loadCharacterCards()
  }

  async function loadPreviousPage() {
    currentPage.value--
    await loadCharacterCards()
  }

  async function searchByName(name: string) {
    currentPage.value = 0
    clearFilters()

    searchName.value = name
    await loadCharacterCards()
  }

  async function searchByStatus(status: CharacterCondition) {
    currentPage.value = 0
    clearFilters()

    searchStatus.value = status
    await loadCharacterCards()
  }

  return {
    countPerPage,
    currentPage,
    loadCharacterCards,
    loadNextPage,
    loadPreviousPage,
    searchByName,
    searchByStatus
  }
}
