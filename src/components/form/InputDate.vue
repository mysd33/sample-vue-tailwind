<script setup lang="ts">
import BaseInput from './BaseInput.vue'

interface Props {
  id?: string
  name?: string
  placeholder?: string
  focus?: boolean
  readonly?: boolean
  disabled?: boolean
  isError?: boolean
  error?: string
}

defineProps<Props>()
const valueModel = defineModel<string>('value')
</script>

<template>
  <BaseInput
    type="date"
    :id="id"
    :name="name"
    :placeholder="placeholder"
    :focus="focus"
    :readonly="readonly"
    :disabled="disabled"
    :is-error="isError"
    :error="error"
    v-model:value="valueModel" />
</template>
