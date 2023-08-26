<template>
  <CharacterCardGrid
    class="character-card-grid"
    :character-cards="randomCharacters"
    :loading="!characterCards.cards.value.length"
  />
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import CharacterCardGrid from '@/components/CharacterCardGrid/CharacterCardGrid.vue'

  import { ICharacterRaw } from '@/types/CharacterService'

  import { useCharacterCards } from '@/composables/useCharacterCards'

  const randomCharacters = ref<ICharacterRaw[]>([])

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
