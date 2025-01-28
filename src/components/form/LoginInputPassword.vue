<script setup lang="ts">
import InputPassword from './InputPassword.vue'

interface Props {
  id?: string
  name?: string
  placeholder?: string
  focus?: boolean
  readonly?: boolean
  disabled?: boolean
  isError?: boolean
}

defineProps<Props>()

const valueModel = defineModel<string>('value')
</script>

<template>
  <InputPassword
    :id="id"
    :name="name"
    :placeholder="placeholder"
    :focus="focus"
    :readonly="readonly"
    :disabled="disabled"
    :is-error="isError"
    :class="{
      'z-0': !isError,
      'z-10': isError,
    }"
    class="h-12 rounded-none rounded-b-lg focus:z-20"
    v-model:value="valueModel" />
</template>
