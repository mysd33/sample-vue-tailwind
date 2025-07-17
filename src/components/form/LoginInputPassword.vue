<script setup lang="ts">
import { Field } from 'vee-validate'

interface Props {
  id?: string
  name: string
  placeholder?: string
  focus?: boolean
  readonly?: boolean
  disabled?: boolean
}

defineProps<Props>()

const valueModel = defineModel<string>('value')
</script>
<!-- ログイン時はフォーカスアウトのバリデーションを実施しない -->
<template>
  <Field
    :name="name"
    v-slot="{ field, errors }"
    v-model="valueModel"
    :validate-on-blur="false"
    :validate-on-change="false">
    <input
      :id="id"
      type="password"
      :placeholder="placeholder"
      :autofocus="focus"
      :readonly="readonly"
      :disabled="disabled"
      class="mb-[-1px] h-12 rounded-b-lg border shadow-xs read-only:border-transparent read-only:bg-transparent read-only:px-0 read-only:shadow-none focus:z-20 focus:ring-3 read-only:focus:border-transparent read-only:focus:ring-transparent"
      :class="[
        errors.length == 0
          ? 'z-0 border-gray-300 focus:border-blue-400 focus:ring-blue-300/50'
          : 'errorIcon z-20 border-red-600 focus:border-red-400 focus:ring-red-300/50',
      ]"
      v-bind="field" />
  </Field>
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
