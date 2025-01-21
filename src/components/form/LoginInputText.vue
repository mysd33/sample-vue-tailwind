<script setup lang="ts">
import InputText from './InputText.vue'
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
  <InputText
    :id="id"
    :name="name"
    :placeholder="placeholder"
    :focus="focus"
    :readonly="readonly"
    :disabled="disabled"
    :is-error="isError"
    class="z-0 mb-[-1px] h-12 rounded-none rounded-t-lg focus:z-10"
    v-model:value="valueModel" />
</template>
