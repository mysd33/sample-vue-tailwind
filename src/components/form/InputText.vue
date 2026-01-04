<script setup lang="ts">
import BaseInput from './BaseInput.vue'
interface Props {
  /**
   * input要素のid
   */
  id?: string
  /**
   * input要素のname
   */
  name: string
  /**
   * input要素のプレースフォルダ
   */
  placeholder?: string
  /**
   * input要素にフォーカスを当てるかどうか
   */
  focus?: boolean
  /**
   * input要素が読み取り専用かどうか
   */
  readonly?: boolean
  /**
   * input要素が無効にするかどうか
   */
  disabled?: boolean
}
defineProps<Props>()

const valueModel = defineModel<string>('value')
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
    v-model:value="valueModel" />
</template>
