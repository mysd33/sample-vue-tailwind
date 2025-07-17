<script setup lang="ts">
import InputText from './InputText.vue'
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
  validateOnChange?: boolean
}

defineProps<Props>()
</script>

<!-- TODO: class設定の見直し -->
<template>
  <InputText
    :id="id"
    :name="name"
    :placeholder="placeholder"
    :focus="focus"
    :readonly="readonly"
    :disabled="disabled"
    :is-error="isError"
    :class="{
      'z-0': !isError,
      'z-20': isError,
    }"
    :validateOnBlur="validateOnBlur"
    :validateOnChange="validateOnChange"
    overrideClass="mb-[-1px] h-12 rounded-none rounded-t-lg focus:z-20" />
</template>
