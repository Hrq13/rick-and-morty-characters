<template>
  <VCol class="page-wrapper" md="10" sm="12">
    <VRow class="search-section">
      <VRow class="search-section__fields">
      <VTextField
        density="compact"
        v-model="characterCards.characterNameForSearch.value"
        clearable
        label="Search by name"
      />

      <VSelect
        density="compact"
        label="Character status"
        :items="characterCards.possibleStatus.value"
        v-model="characterCards.characterStatusForSearch.value"
      />
      </VRow>

      <VRow class="search-section__buttons">
        <VBtn
          class="search-section__buttons__clear"
          variant="plain"
          color="#44281d"
          size="large"
          :disabled="areFiltersClear"
          @click="refreshResults"
        >
          Clear filters
        </VBtn>

        <VBtn
          class="search-section__buttons__search"
          variant="elevated"
          size="large"
          color="#97ce4c"
          :disabled="areFiltersClear"
          @click="handleSearch"
        >
          Search characters
        </VBtn>
      </VRow>
    </VRow>

    <CharacterCardGrid
      class="character-card-grid"
      :character-cards="characterCards.cards.value"
      :count-limit="20"
      :loading="isLoading"
    />

    <VRow class="pagination-buttons">
      <VBtn
        density="comfortable"
        icon="mdi-chevron-double-left"
        :disabled="isPreviousPageDisabled"
        @click="handleLoadPreviousPage"
      />

      <VBtn
        density="comfortable"
        icon="mdi-chevron-double-right"
        :disabled="isNextPageDisabled"
        @click="handleLoadNextPage"
      />
    </VRow>

    <AlertSnackBar
      v-model="isAlertSnackBarVisible"
      :text="errorMessage"
    />
  </VCol>
</template>

<script lang="ts" setup>
  import { computed, onBeforeMount, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { VTextField, VSelect, VRow } from 'vuetify/components'

  import CharacterCardGrid from '@/components/CharacterCardGrid/CharacterCardGrid.vue'
  import AlertSnackBar from '@/components/AlertSnackBar/AlertSnackBar.vue'

  import { useCharacterCards } from '@/composables/useCharacterCards'

  import { CharacterCondition } from '@/types/CharacterService'

  const route = useRoute()
  const router = useRouter()

  const characterCards = useCharacterCards()

  const isAlertSnackBarVisible = ref(false)
  const errorMessage = ref('')

  const areFiltersClear = computed(() =>
    !characterCards.characterNameForSearch.value && !characterCards.characterStatusForSearch.value
  )

  const isLoading = computed(() =>
    characterCards.isLoadingCharacters.value || !characterCards.cards.value.length
  )

  const isPreviousPageDisabled = computed(() => characterCards.currentPage.value <= 1 || isLoading.value)
  const isNextPageDisabled = computed(() => isLoading.value)

  function refreshResults() {
    characterCards.clearFilters()
    handleSearch()
  }

  async function handleLoadNextPage() {
    await characterCards.loadNextPage()

    router.push({
      query: {
        page: characterCards.currentPage.value
      }
    })
  }

  async function handleLoadPreviousPage() {
    await characterCards.loadPreviousPage()

    router.push({
      query: {
        page: characterCards.currentPage.value
      }
    })
  }

  async function handleSearch() {
    try {
      await characterCards.loadCharacterCards()
      const filters = characterCards.buildFilterObject()

      router.push({
        query: filters
      })
    } catch (error) {
      characterCards.isLoadingCharacters.value = false
      showErrorMessageTemporarily(`
        We could not find any results, try again with different filters.
      `)
    }
  }

  function showErrorMessageTemporarily(message: string, seconds: number = 3) {
    errorMessage.value = message
    isAlertSnackBarVisible.value = true

    setTimeout(() => {
      errorMessage.value = ''
      isAlertSnackBarVisible.value = false
    }, 1000 * seconds)
  }

  function recoverCurrentPageFromUrl() {
    const pageFromUrl = Number(route.query.page)

    if (pageFromUrl)
      characterCards.currentPage.value = pageFromUrl
  }

  function recoverFilterFromUrl() {
    const name = route.query.name
    const status = route.query.status

    if (typeof name === 'string')
      characterCards.characterNameForSearch.value = name

    const isStatusFromUrlValid = characterCards.possibleStatus.value.includes(status as CharacterCondition)

    if (isStatusFromUrlValid)
      characterCards.characterStatusForSearch.value = status as CharacterCondition
  }

  onBeforeMount(() => {
    recoverCurrentPageFromUrl()
    recoverFilterFromUrl()
    characterCards.loadCharacterCards()
  })
</script>

<style lang="scss" scoped>
  .page-wrapper {
    margin: 0 auto;
  }

  .search-section {
    margin: 32px auto 0;
    width: content;

    &__buttons,
    &__fields {
      flex-direction: column;
      width: 100%;
      margin: 0 0 8px;
      gap: 8px;

      @include breakpoint-md {
        width: auto;
        margin: 4px 0 0 0;
        flex-direction: row;
        justify-content: flex-end;
      }
    }
  }

  .pagination-buttons {
    width: fit-content;
    margin: 10px auto 20px;
    gap: 12px;
  }
</style>
