import { ref } from 'vue'

import { CharacterCondition, ICharacterRaw, ICharacterRawResponse } from '@/types/CharacterService'
import { getCharacters } from '@/services/characters'

export function useCharacterCards() {
  const countPerPage = ref(10)
  const currentPage = ref(1)
  const cards = ref<ICharacterRaw[]>([])
  const searchName = ref<string>()
  const searchStatus = ref<CharacterCondition>()

  function clearFilters() {
    searchName.value = undefined
    searchStatus.value = undefined
  }

  function buildFilterObject() {
    return {
      page: currentPage.value.toString(),
      count: countPerPage.value.toString(),
      ...(searchName.value && { name: searchName.value }),
      ...(searchStatus.value && { status: searchStatus.value })
    }
  }

  async function loadCharacterCards() {
    const filters = buildFilterObject()
    const response = await getCharacters(filters) as ICharacterRawResponse
    console.log({ results: response.results })
    cards.value = response.results
    console.log({ cards: cards.value })
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
    cards,
    countPerPage,
    currentPage,
    loadCharacterCards,
    loadNextPage,
    loadPreviousPage,
    searchByName,
    searchByStatus
  }
}
