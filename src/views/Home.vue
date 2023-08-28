<template>
  <VCol class="page-wrapper" md="10" sm="12">
    <VRow class="search-section">
      <VRow class="search-section__fields">
      <VTextField
        test-id="name-field"
        density="compact"
        v-model="characterCards.filtersOfSearch.value.name"
        clearable
        label="Search by name"
        @keydown.enter="handleSearch"
      />

      <VSelect
        test-id="status-field"
        density="compact"
        label="Character status"
        :items="characterCards.possibleStatus.value"
        v-model="characterCards.filtersOfSearch.value.status"
      />
      </VRow>

      <VRow class="search-section__buttons">
        <VBtn
          test-id="clear-filters-button"
          class="search-section__buttons__clear"
          variant="plain"
          color="accent"
          size="large"
          :disabled="areFiltersClear"
          @click="characterCards.resetCards"
        >
          Clear filters
        </VBtn>

        <VBtn
          test-id="search-button"
          class="search-section__buttons__search"
          variant="elevated"
          size="large"
          color="primary"
          :disabled="isLoading"
          @click="handleSearch"
        >
          Search characters
        </VBtn>
      </VRow>
    </VRow>

    <CharacterCardGrid
      test-id="character-card-grid"
      class="character-card-grid"
      :character-cards="characterCards.cards.value"
      :count-limit="20"
      :loading="isLoading"
    />

    <VRow class="pagination-buttons">
      <VBtn
        test-id="previous-page-button"
        density="comfortable"
        icon="mdi-chevron-double-left"
        :disabled="isPreviousPageDisabled"
        @click="handleLoadPreviousPage"
      />

      <VBtn
        test-id="next-page-button"
        density="comfortable"
        icon="mdi-chevron-double-right"
        :disabled="isNextPageDisabled"
        @click="handleLoadNextPage"
      />
    </VRow>

    <AlertSnackBar
      test-id="alert-snack-bar"
      v-model="isAlertSnackBarVisible"
      :text="errorMessage"
    />
  </VCol>
</template>

<script lang="ts" setup>
  import { computed, onBeforeMount, ref } from 'vue'
  import { VTextField, VSelect, VRow } from 'vuetify/components'

  import CharacterCardGrid from '@/components/CharacterCardGrid/CharacterCardGrid.vue'
  import AlertSnackBar from '@/components/AlertSnackBar/AlertSnackBar.vue'

  import { useCharacterCards } from '@/composables/useCharacterCards'

  const characterCards = useCharacterCards()

  const isAlertSnackBarVisible = ref(false)
  const errorMessage = ref('')

  const areFiltersClear = computed(() => {
    const filterOfName = !!characterCards.filtersOfSearch.value.name
    const filterOfStatus = !!characterCards.filtersOfSearch.value.status
    return !filterOfName && !filterOfStatus
  })

  const isLoading = computed(() =>
    characterCards.isLoadingCharacters.value || !characterCards.cards.value?.length
  )

  const isPreviousPageDisabled = computed(() => characterCards.currentPage.value <= 1 || isLoading.value)
  const isOnLastPage = computed(() => characterCards.currentPage.value >= characterCards.lastPage.value)
  const isNextPageDisabled = computed(() => isLoading.value || isOnLastPage.value)

  async function handleLoadNextPage() {
    try {
      await characterCards.handleNextPagePresentation()
    } catch (error) {
      handleLoadError()
    }
  }

  async function handleLoadPreviousPage() {
    try {
      await characterCards.handlePreviousPagePresentation()
    } catch (error) {
      handleLoadError()
    }
  }

  async function handleSearch() {
    try {
      await characterCards.searchCards()
    } catch (error) {
      handleLoadError()
    }
  }

  function handleLoadError() {
    characterCards.isLoadingCharacters.value = false
    showErrorMessageForSeconds(`
      We could not find any results, try again with different filters.
    `)
  }

  function showErrorMessageForSeconds(message: string, seconds: number = 3) {
    errorMessage.value = message
    isAlertSnackBarVisible.value = true

    setTimeout(() => {
      errorMessage.value = ''
      isAlertSnackBarVisible.value = false
    }, 1000 * seconds)
  }

  onBeforeMount(() => {
    characterCards.setCurrentPageFromRoute()
    characterCards.setFiltersOfSearchFromRoute()
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
