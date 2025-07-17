<script setup lang="ts">
import BaseInput from './BaseInput.vue'
//TODO: 不要なプロパティを削除
interface Props {
  id?: string
  name: string
  placeholder?: string
  focus?: boolean
  readonly?: boolean
  disabled?: boolean
  isError?: boolean
  error?: string
  validateOnBlur?: boolean
  validateOnChange?: boolean
  overrideClass?: string
}
defineProps<Props>()
</script>

<template>
  <BaseInput
    type="text"
    :id="id"
    :name="name"
    :placeholder="placeholder"
    :focus="focus"
    :readonly="readonly"
    :disabled="disabled"
    :is-error="isError"
    :error="error"
    :validateOnBlur="validateOnBlur"
    :validateOnChange="validateOnChange"
    :overrideClass="overrideClass" />
</template>
