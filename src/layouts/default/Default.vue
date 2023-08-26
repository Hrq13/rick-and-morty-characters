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

      <h1 class="header__title text-sm-h2 text-sm-h4 font-weight-bold">
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
      <RouterView />
    </div>

    <footer
      class="footer"
      test-id="footer"
    >
      Made with &#9749; and &#9829; by

      <a
        class="footer__author-name"
        href="https://br.linkedin.com/in/henrique-miranda-dev"
        target="_blank"
      >
        Henrique
      </a>
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
    box-sizing: border-box;
    background-color: #84b0f7;
    min-height: 100vh;

    @supports (min-height: 100dvh) {
      min-height: 100dvh;
    }
  }

  .header {
    padding-top: 20px;
    display: flex;
    align-items: center;
    height: 100px;
    max-width: 1000px;
    margin: 0 auto;

    @include breakpoint-md {
      height: 280px
    }

    &__img-wrapper {
      padding-bottom: 5px;
      height: 100%;
      width: 150px;
      display: none;

      @include breakpoint-md {
        display: flex;
        align-items: flex-end;
      }

      &__morty-img {
        aspect-ratio: 249/811;
      }

      &__rick-img {
        aspect-ratio: 797/1119;
      }

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
  }

  .footer {
    background-color: white;
    padding: 20px 0;
    line-height: 0;
    box-shadow: 0px -1px 7px 0px #5f829f;
    text-align: center;
    height: 20px;
    width: 100%;
    box-sizing: border-box;

    &__author-name {
      color: #97ce4c;
      font-weight: bold;
    }
  }
</style>
