import { ref } from 'vue'

import { CharacterCondition, ICharacterRaw, ICharacterRawResponse, IResultInfo } from '@/types/CharacterService'
import { getCharacters } from '@/services/characters'

export function useCharacterCards() {
  const currentPage = ref(1)
  const lastPage = ref(1)
  const cards = ref<ICharacterRaw[]>([])
  const characterNameForSearch = ref<string>()
  const characterStatusForSearch = ref<CharacterCondition>()
  const possibleStatus = ref<CharacterCondition[]>(['Alive', 'Dead', 'Unknown'])
  const isLoadingCharacters = ref<boolean>(false)

  function resetPagination() {
    currentPage.value = 1
    lastPage.value = 1
  }

  function clearFilters() {
    characterNameForSearch.value = undefined
    characterStatusForSearch.value = undefined
  }

  function buildFilterObject() {
    return {
      page: currentPage.value.toString(),
      ...(characterNameForSearch.value && { name: characterNameForSearch.value }),
      ...(characterStatusForSearch.value && { status: characterStatusForSearch.value })
    }
  }

  function setLastPage(info: IResultInfo) {
    lastPage.value = info.pages
  }

  async function loadCharacterCards() {
    isLoadingCharacters.value = true
    const filters = buildFilterObject()
    const response = await getCharacters(filters) as ICharacterRawResponse
    cards.value = response.results
    setLastPage(response.info)
    isLoadingCharacters.value = false
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

    characterNameForSearch.value = name
    await loadCharacterCards()
  }

  async function searchByStatus(status: CharacterCondition) {
    currentPage.value = 0
    clearFilters()

    characterStatusForSearch.value = status
    await loadCharacterCards()
  }

  return {
    cards,
    currentPage,
    characterNameForSearch,
    characterStatusForSearch,
    possibleStatus,
    isLoadingCharacters,
    lastPage,
    loadCharacterCards,
    loadNextPage,
    loadPreviousPage,
    searchByName,
    searchByStatus,
    clearFilters,
    buildFilterObject,
    resetPagination
  }
}
