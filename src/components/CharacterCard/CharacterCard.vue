<template>
  <VCard class="character-card" test-id="character-card">
    <img
      class="character-card__image"
      :src="props.image"
      :alt="'Image of ' + props.name"
    />

    <div class="character-card__info">
      <a
        class="character-card__info__name --remove-link-style"
        target="_blank"
        :href="props.url"
      >
        {{ props.name }}
      </a>

      <div class="character-card__info__status-and-species">
        <span test-id="character-status">{{ props.status }}</span>

        &nbsp; - &nbsp;

        <span test-id="character-species">{{ props.species }}</span>
      </div>

      <div
        class="character-card__info__location"
        test-id="location"
      >
        <p>
          Last known location:
        </p>

        <a
          class="--remove-link-style"
          target="_blank"
          :href="props.location.url"
        >
          {{ props.location.name }}
        </a>
      </div>

      <div
        class="character-card__info__origin"
        test-id="origin"
      >
        <p>
          First seen in:
        </p>

        <a
          class="--remove-link-style"
          target="_blank"
          :href="props.origin.url"
        >
          {{ props.origin.name }}
        </a>
      </div>
    </div>
  </VCard>
</template>

<script setup lang="ts">
  import { VCard } from 'vuetify/components'

  import { ICharacterCard } from '@/types/CharacterCard'

  const props = defineProps<ICharacterCard>()
</script>

<style lang="scss" scoped>
  .character-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 540px;
    background-color: #B7E4F9FF;

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

      &__status-and-species {
        display: flex;
        flex-direction: row;
      }

      &__status-and-species,
      &__origin,
      &__location {
        margin-top: 8px;
      }

      .--remove-link-style {
        text-decoration: none;
        color: unset;

        &:hover {
          color: #E89242FF;
        }
      }
    }
  }
</style>
