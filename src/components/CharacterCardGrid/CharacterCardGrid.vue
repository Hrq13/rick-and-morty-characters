<template>
  <VRow
    v-if="props.loading"
    dense
  >
    <VCol
      v-for="(index) in props.countLimit || 10"
      :key="index"
      cols="12"
      lg="6"
      class="align-center"
    >
      <div class="card-skeleton" test-id="card-skeleton" />
    </VCol>
  </VRow>

  <VRow
    v-else
    dense
  >
    <VCol
      v-for="card in countedCards"
      :key="card.id"
      cols="12"
      lg="6"
      class="align-center"
    >
      <CharacterCard v-bind="card" />
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  import CharacterCard from '@/components/CharacterCard/CharacterCard.vue'
  import { ICharacterCard } from '@/types/CharacterCard'

  const props = defineProps<{
    characterCards: ICharacterCard[]
    countLimit?: number
    loading: boolean
  }>()

  const countedCards = computed(() => {
    const limit = props.countLimit || props.characterCards.length
    return props.characterCards.slice(0, limit)
  })

</script>

<style lang="scss" scoped>
  .card-skeleton {
    display: block;
    width: 100%;
    height: 220px;
    border-radius: 4px;
    background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0),
        rgba(223, 223, 223, 0.5) 40%,
        rgba(255, 255, 255, 0.411) 90%
      ),
      rgb(226, 226, 226);
    background-repeat: repeat-y;
    background-size: 50px 500px;
    background-position: 0 0;
    animation: shine 1s infinite;
  }

  @keyframes shine {
    to {
      background-position: 100% 0;
    }
  }
</style>
