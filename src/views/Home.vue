<template>
  <CharacterCardGrid
    class="character-card-grid"
    :character-cards="randomCharacters"
    :loading="!randomCharacters.length"
  />
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import CharacterCardGrid from '@/components/CharacterCardGrid/CharacterCardGrid.vue'

  import { CharacterInfo } from '@/types/CharacterInfo'

  import { generateMockCharacters } from '@/utils/generate-mock-characters'

  const randomCharacters = ref<CharacterInfo[]>([])

  function generateMocksWithDelay(): Promise<CharacterInfo[]> {
    return new Promise((resolve)  => {
      const characters = generateMockCharacters()

      setTimeout(() => {
        resolve(characters)
      }, 300)
    })
  }

  generateMocksWithDelay()
    .then(characters => {
      randomCharacters.value = characters
    })
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
