<template>
  <VCard class="character-card">
    <img
      class="character-card__image"
      :src="props.photo"
      :alt="'Photo of ' + props.title"
    />

    <div class="character-card__info">
      <a
        class="character-card__info__name --remove-link-style"
        target="_blank"
        :href="characterPageUrl"
      >
        {{ props.title }}
      </a>

      <div class="character-card__info__condition-and-type">
        <span test-id="character-condition">{{ props.condition }}</span>

        &nbsp; - &nbsp;

        <span test-id="character-type">{{ props.type }}</span>
      </div>

      <div
        class="character-card__info__last-known-location"
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
        class="character-card__info__first-seen-in"
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
  .character-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 540px;
    background-color: grey;

    @include breakpoint-md {
      flex-direction: row;
      height: 220px;
    }

    &__image {
      width: auto;
      height: 300px;
      object-position: center center;
      object-fit: cover;

      @include breakpoint-md {
        width: 220px;
        height: auto;
      }
    }

    &__info {
      padding-left: 12px;

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

      .--remove-link-style {
        text-decoration: none;
        color: unset;

        &:hover {
          color: lightsalmon;
        }
      }
    }
  }
</style>
