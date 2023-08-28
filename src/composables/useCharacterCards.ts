import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { CharacterCondition, ICharacterRaw, ICharacterRawResponse } from '@/types/CharacterService'
import { getCharacters } from '@/services/characters'

export function useCharacterCards() {
  const currentPage = ref(1)
  const lastPage = ref(1)
  const cards = ref<ICharacterRaw[]>([])
  const filtersOfSearch = ref<Partial<{ name: string, status: CharacterCondition }>>({})
  const possibleStatus = ref<CharacterCondition[]>(['Alive', 'Dead', 'Unknown'])
  const isLoadingCharacters = ref<boolean>(false)

  const router = useRouter()
  const route = useRoute()

  function resetPagination() {
    currentPage.value = 1
    lastPage.value = 1
  }

  function clearFilters() {
    filtersOfSearch.value = {}
  }

  function getFiltersWithCurrentPage() {
    return {
      page: currentPage.value.toString(),
      ...filtersOfSearch.value
    }
  }

  async function loadCharacterCards() {
    isLoadingCharacters.value = true
    const filters = getFiltersWithCurrentPage()
    const response = await getCharacters(filters) as ICharacterRawResponse
    lastPage.value = response.info.pages
    cards.value = response.results
    isLoadingCharacters.value = false
  }

  async function handleNextPagePresentation() {
    await loadNextPageCards()
    updateCardFiltersInRoute()
  }

  async function loadNextPageCards() {
    currentPage.value++
    await loadCharacterCards()
  }

  async function handlePreviousPagePresentation() {
    await loadPreviousPageCards()
    updateCardFiltersInRoute()
  }

  async function loadPreviousPageCards() {
    currentPage.value--
    await loadCharacterCards()
  }

  async function resetCards() {
    clearFilters()
    searchCards()
  }

  async function searchCards() {
    resetPagination()
    await loadCharacterCards()
    updateCardFiltersInRoute()
  }

  function updateCardFiltersInRoute() {
    const filters = getFiltersWithCurrentPage()
    router.push({ path: route.path as string, query: filters })
  }

  function setCurrentPageFromRoute() {
    const pageFromUrl = Number(route.query.page)

    if (pageFromUrl)
      currentPage.value = pageFromUrl
  }

  function setFiltersOfSearchFromRoute() {
    const name = route.query.name
    const status = route.query.status

    if (typeof name === 'string')
      filtersOfSearch.value.name = name

    const isStatusFromUrlValid = possibleStatus.value.includes(status as CharacterCondition)

    if (isStatusFromUrlValid)
      filtersOfSearch.value.status = status as CharacterCondition
  }

  return {
    cards,
    currentPage,
    possibleStatus,
    isLoadingCharacters,
    lastPage,
    filtersOfSearch,
    loadCharacterCards,
    loadNextPageCards,
    loadPreviousPageCards,
    clearFilters,
    getFiltersWithCurrentPage,
    resetPagination,
    handleNextPagePresentation,
    handlePreviousPagePresentation,
    resetCards,
    searchCards,
    setCurrentPageFromRoute,
    setFiltersOfSearchFromRoute
  }
}
