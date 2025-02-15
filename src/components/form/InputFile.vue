<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  id?: string
  name?: string
  placeholder?: string
  focus?: boolean
  disabled?: boolean
  isError?: boolean
  error?: string
}

const props = defineProps<Props>()

const modelValue = defineModel<File>('value')

const onChanged = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    modelValue.value = target.files[0]
  }
}

const borderColor = computed(() => {
  return props.isError || props.error
    ? 'border-red-600 focus:border-red-400 focus:ring-red-300/50 file:border-red-600 file:focus:border-red-400 file:focus:ring-red-300/50 errorIcon'
    : 'border-gray-300 focus:border-blue-400 focus:ring-blue-300/50 file:border-r-gray-300 file:focus:border-blue-400 file:focus:ring-blue-300/50'
})
</script>

<template>
  <input
    type="file"
    :id="id"
    :name="name"
    :placeholder="placeholder"
    :focus="focus"
    :disabled="disabled"
    :class="[borderColor]"
    class="h-10 cursor-pointer rounded-lg border bg-white shadow-xs file:h-10 file:border-b-0 file:border-l-0 file:border-r file:border-t-0 file:border-solid file:hover:cursor-pointer focus:outline-hidden focus:ring-3 file:focus:ring-3"
    @change="onChanged" />
  <template v-if="isError || error">
    <div class="flow flow-col m-1 text-sm text-red-600">{{ error }}</div>
  </template>
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
