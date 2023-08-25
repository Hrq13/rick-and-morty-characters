<template>
  <VCard class="wrapper">
    <img
      class="character-image"
      :src="props.photo"
      :alt="'Photo of ' + props.title"
    />

    <div class="character-info">
      <a
        class="character-info__name --remove-link-style"
        target="_blank"
        :href="characterPageUrl"
      >
        {{ props.title }}
      </a>

      <div class="character-info__condition-and-type">
        <span test-id="character-condition">{{ props.condition }}</span>

        &nbsp; - &nbsp;

        <span test-id="character-type">{{ props.type }}</span>
      </div>

      <div
        class="character-info__last-known-location"
        test-id="last-known-location"
      >
        <p>
          Last known location:
        </p>

        <a
          class="--remove-link-style"
          target="_blank"
          :href="lastKnownLocationUrl"
        >
          {{ props.lastKnownLocation.name }}
        </a>
      </div>

      <div
        class="character-info__first-seen-in"
        test-id="first-seen-in"
      >
        <p>
          First seen in:
        </p>

        <a
          class="--remove-link-style"
          target="_blank"
          :href="firstSeenInLocationUrl"
        >
          {{ props.firstSeenIn.name }}
        </a>
      </div>
    </div>
  </VCard>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { VCard } from 'vuetify/components'

  import { CharacterInfo } from '@/types/CharacterInfo'

  import { getLocationUrl } from '@/utils/get-location-url/get-location-url'
  import { getCharacterUrl } from '@/utils/get-character-url/get-character-url'

  const props = defineProps<CharacterInfo>()

  const characterPageUrl = computed(() => {
    return getCharacterUrl(props.id)
  })

  const lastKnownLocationUrl = computed(() => {
    return getLocationUrl(props.lastKnownLocation.id)
  })

  const firstSeenInLocationUrl = computed(() => {
    return getLocationUrl(props.firstSeenIn.id)
  })
</script>

<style lang="scss" scoped>
  .wrapper {
    max-width: 600px;
    width: 100%;
    height: 220px;
    display: flex;
    flex-direction: row;
    background-color: grey;
  }

  .character-info {
    padding-left: 12px;

    &__image {
      width: 220px;
      height: 220px;
    }

    &__name {
      font-size: xx-large;
    }

    &__condition-and-type {
      display: flex;
      flex-direction: row;
    }

    &__condition-and-type,
    &__last-known-location,
    &__first-seen-in {
      margin-top: 8px;
    }
  }

  .--remove-link-style {
    text-decoration: none;
    color: unset;

    &:hover {
      color: lightsalmon;
    }
  }
</style>
