<script setup lang="ts">
import { ErrorMessage, Field } from 'vee-validate'
//TODO: 不要なプロパティを削除
interface Props {
  type: string
  id?: string
  name: string
  placeholder?: string
  focus?: boolean
  readonly?: boolean
  disabled?: boolean
  isError?: boolean
  error?: string
  validateOnBlur?: boolean | undefined
  validateOnChange?: boolean | undefined
  overrideClass?: string
}

withDefaults(defineProps<Props>(), {
  validateOnBlur: true,
  validateOnChange: true,
})
</script>

<template>
  <Field
    v-slot="{ errors, field }"
    :name="name"
    :validateOnBlur="validateOnBlur"
    :validateOnChange="validateOnChange">
    <input
      v-bind="field"
      :type="type"
      :id="id"
      :placeholder="placeholder"
      :autofocus="focus"
      :readonly="readonly"
      :disabled="disabled"
      :class="[
        overrideClass,
        'h-10 rounded-lg border shadow-xs read-only:border-transparent read-only:bg-transparent read-only:px-0 read-only:shadow-none focus:ring-3 read-only:focus:border-transparent read-only:focus:ring-transparent',
        Object.keys(errors).length > 0
          ? 'errorIcon border-red-600 focus:border-red-400 focus:ring-red-300/50'
          : 'border-gray-300 focus:border-blue-400 focus:ring-blue-300/50',
      ]" />
  </Field>
  <ErrorMessage :name="name" class="flow flow-col m-1 text-sm text-red-600" />
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
