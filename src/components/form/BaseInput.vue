<script setup lang="ts">
import { ErrorMessage, Field } from 'vee-validate'

interface Props {
  /**
   * input要素のtype
   */
  type: string
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
  <Field :name="name" v-slot="{ field, errors }" v-model="valueModel">
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :autofocus="focus"
      :readonly="readonly"
      :disabled="disabled"
      class="h-10 rounded-lg border shadow-xs read-only:border-transparent read-only:bg-transparent read-only:px-0 read-only:shadow-none focus:ring-3 read-only:focus:border-transparent read-only:focus:ring-transparent"
      :class="[
        errors.length == 0
          ? 'border-gray-300 focus:border-blue-400 focus:ring-blue-300/50'
          : 'errorIcon border-red-600 focus:border-red-400 focus:ring-red-300/50',
      ]"
      :aria-invalid="errors.length > 0 ? 'true' : 'false'"
      v-bind="field" />
  </Field>
  <ErrorMessage :name="name" class="flow flow-col m-1 text-sm text-red-600" as="div" />
</template>

<style scoped>
.errorIcon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  padding-right: calc(1.5em + 0.75rem);
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
</style>
