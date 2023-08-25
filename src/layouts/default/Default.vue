<template>
  <div class="wrapper">
    <header class="header">
      <div class="header__img-wrapper">
        <img
          class="header__img-wrapper__rick-img"
          :src="RickPng"
          test-id="rick-image"
          alt="Rick looking back and running"
        />
      </div>

      <h1 class="header__title text-h2 font-weight-bold">
        The Rick and Morty <br> Characters
      </h1>

      <div class="header__img-wrapper">
        <img
          class="header__img-wrapper__morty-img"
          :src="MortyPng"
          test-id="morty-image"
          alt="Morty looking confused"
        />
      </div>
    </header>

    <div class="content-wrapper">
      <slot />
    </div>

    <footer
      class="footer"
      test-id="footer"
    >
      Made with &#9749; and &#9829; by Henrique
    </footer>
  </div>
</template>

<script lang="ts" setup>
  import RickPng from '@/assets/layouts/rick.png'
  import MortyPng from '@/assets/layouts/morty.png'
</script>

<style lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100dvh;
    box-sizing: border-box;
  }

  .header {
    padding-top: 20px;
    display: flex;
    flex-basis: 300px;
    align-items: center;
    height: 200px;
    max-width: 1000px;
    margin: 0 auto;

    &__img-wrapper {
      padding-bottom: 5px;
      height: 100%;
      width: 150px;
      display: flex;
      align-items: flex-end;

      &__rick-img,
      &__morty-img {
        height: 150px;
      }
    }

    &__title {
      text-align: center;
    }
  }

  .content-wrapper {
    box-sizing: border-box;
    flex: 1 1 0;
    background-color: #eee;
  }

  .footer {
    text-align: center;
    height: 20px;
    width: 100%;
    box-sizing: border-box;
  }
</style>
