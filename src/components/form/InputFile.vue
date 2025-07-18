<script setup lang="ts">
import { ErrorMessage, Field } from 'vee-validate'

interface Props {
  id?: string
  name: string
  placeholder?: string
  focus?: boolean
  disabled?: boolean
}

defineProps<Props>()

const modelValue = defineModel<File>('value')

// Fileは双方向バインドに対応していないため、changeイベントで更新する
const onChanged = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    modelValue.value = target.files[0]
  }
}
</script>

<template>
  <Field :name="name" v-slot="{ errors }" v-model="modelValue">
    <input
      type="file"
      :id="id"
      :placeholder="placeholder"
      :focus="focus"
      :disabled="disabled"
      class="h-10 cursor-pointer rounded-lg border bg-white shadow-xs file:mr-3 file:h-10 file:border-t-0 file:border-r file:border-b-0 file:border-l-0 file:border-solid file:bg-gray-100 file:px-3 hover:file:cursor-pointer hover:file:bg-gray-200 focus:ring-3 focus:outline-hidden file:focus:ring-3"
      :class="[
        errors.length == 0
          ? 'border-gray-300 file:border-r-gray-300 focus:border-blue-400 focus:ring-blue-300/50 file:focus:border-blue-400 file:focus:ring-blue-300/50'
          : 'errorIcon border-red-600 file:border-red-600 focus:border-red-400 focus:ring-red-300/50 file:focus:border-red-400 file:focus:ring-red-300/50',
      ]"
      @change="onChanged" />
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
