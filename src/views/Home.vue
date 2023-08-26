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
          @click="characterCards.clearFilters"
        >
          Clear filters
        </VBtn>

        <VBtn
          class="search-section__buttons__search"
          variant="elevated"
          size="large"
          color="#97ce4c"
          :disabled="areFiltersClear"
          @click="characterCards.loadCharacterCards"
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
  </VCol>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  import { VTextField, VSelect, VRow } from 'vuetify/components'

  import CharacterCardGrid from '@/components/CharacterCardGrid/CharacterCardGrid.vue'

  import { useCharacterCards } from '@/composables/useCharacterCards'

  const route = useRoute()

  const characterCards = useCharacterCards()

  function recoverCurrentPageFromUrl() {
    const pageFromUrl = Number(route.query.page)

    if (pageFromUrl)
      characterCards.currentPage.value = pageFromUrl
  }

  recoverCurrentPageFromUrl()
  characterCards.loadCharacterCards()

  const areFiltersClear = computed(() =>
    !characterCards.characterNameForSearch.value && !characterCards.characterStatusForSearch.value
  )

  const isLoading = computed(() =>
    characterCards.isLoadingCharacters.value || !characterCards.cards.value.length
  )
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
</style>
