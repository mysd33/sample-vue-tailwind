<script setup lang="ts">
import InputPassword from './InputPassword.vue'
//TODO: 不要なプロパティを削除
interface Props {
  id?: string
  name: string
  placeholder?: string
  focus?: boolean
  readonly?: boolean
  disabled?: boolean
  isError?: boolean
  validateOnBlur?: boolean
}

defineProps<Props>()
</script>
<!-- TODO: class設定の見直し -->
<template>
  <InputPassword
    :id="id"
    :name="name"
    :placeholder="placeholder"
    :focus="focus"
    :readonly="readonly"
    :disabled="disabled"
    :is-error="isError"
    :validateOnBlur="validateOnBlur"
    :validateOnChange="validateOnChange"
    :class="{
      'z-0': !isError,
      'z-10': isError,
    }"
    overrideClass="h-12 rounded-none rounded-b-lg focus:z-20" />
</template>
