<template>
  <VSnackbar
    v-model="modelController"
    vertical
  >
    {{ props.text }}

    <template v-slot:actions>
      <v-btn
        color="red"
        variant="text"
        @click="modelController = false"
      >
        Close
      </v-btn>
    </template>
  </VSnackbar>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  import { VSnackbar } from 'vuetify/components'

  const props = defineProps({
    modelValue: Boolean,
    text: String
  })

  const emits = defineEmits<{
    (event: 'update:modelValue', value: boolean): void
  }>()

  const modelController = computed({
    set: (value) => emits('update:modelValue', value),
    get: () => props.modelValue
  })
</script>
