<template>
  <VThemeProvider theme="default" with-background>
    <RouterView />
  </VThemeProvider>
</template>

<script lang="ts" setup>
  import { VThemeProvider } from 'vuetify/components'
</script>
