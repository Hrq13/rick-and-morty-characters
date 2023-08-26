<template>
  <CharacterCardGrid
    class="character-card-grid"
    :character-cards="characterCards.cards.value"
    :loading="!characterCards.cards.value.length"
  />
</template>

<script lang="ts" setup>
  import CharacterCardGrid from '@/components/CharacterCardGrid/CharacterCardGrid.vue'

  import { useCharacterCards } from '@/composables/useCharacterCards'

  const characterCards = useCharacterCards()
  characterCards.loadCharacterCards()
</script>

<style lang="scss" scoped>
  .character-card-grid {
    width: auto;
    margin: 32px auto 48px;
    justify-content: center;

    @include breakpoint-md {
      max-width: 1280px;
      width: 100%;
    }
  }
</style>
