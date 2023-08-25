<template>
  <CharacterCard v-bind="characterMockInfo" />
</template>

<script lang="ts" setup>
  import CharacterCard from '@/components/CharacterCard/CharacterCard.vue'
import { CharacterInfo } from '@/types/CharacterInfo'

  const characterMockInfo: CharacterInfo = {
    id: '123',
    photo: 'https://placehold.co/300x300',
    title: 'Rocky The Dog',
    type: 'Animal',
    condition: 'Alive',
    firstSeenIn: {
      id: '3',
      name: 'The streets'
    },
    lastKnownLocation: {
      id: '1',
      name: 'Home'
    }
  }
</script>
