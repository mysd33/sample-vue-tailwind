<script setup lang="ts">
import RequiredBadge from '@/components/icons/RequiredBadge.vue'
import { computed } from 'vue'

interface Props {
  label?: string
  labelFor?: string
  srOnly?: boolean
  required?: boolean
  errors?: string[]
}
const props = defineProps<Props>()
const srOnly = props.srOnly ? 'sr-only' : ''
const isError = computed(() => {
  return props.errors && props.errors.length > 0
})
</script>
<template>
  <div class="flex flex-col">
    <label v-if="label" :for="labelFor" :class="[srOnly]"
      >{{ label }}
      <RequiredBadge v-if="required" />
    </label>
    <slot></slot>
    <div v-if="isError" class="flow flow-col m-1 text-sm text-red-600">
      <div v-for="error in props.errors" :key="error">{{ error }}</div>
    </div>
  </div>
</template>
