<script setup lang="ts">
import XCircleIcon from '@/components/icons/XCircleIcon.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'

import { computed } from 'vue'
import CheckCircleIcon from '@/components/icons/CheckCircleIcon.vue'

export type MessageLevel = '' | 'validation' | 'info' | 'warn' | 'error'

interface Props {
  message?: string
  level?: MessageLevel
}

const props = defineProps<Props>()
const isValidationError = computed(() => props.level === 'validation')
const isInfo = computed(() => props.level === 'info')
const isWarn = computed(() => props.level === 'warn')
const isError = computed(() => props.level === 'error')
</script>

<template>
  <div
    v-if="isValidationError"
    class="mb-4 flex flex-row content-center rounded-lg border border-red-950/20 bg-red-500/20 px-4 py-3">
    <div class="flex flex-row">
      <XCircleIcon />
      <span class="mt-1 ml-3 text-red-950">入力エラーです。</span>
    </div>
  </div>
  <div
    class="mb-4 flex flex-row content-center rounded-lg border border-green-950/20 bg-green-600/20 px-4 py-3"
    v-if="message && isInfo">
    <div class="flex flex-row">
      <CheckCircleIcon />
      <span class="mt-1 ml-3 text-green-950">{{ message }}</span>
    </div>
  </div>
  <div
    class="mb-4 flex flex-row content-center rounded-lg border border-amber-950/20 bg-amber-500/20 px-4 py-3"
    v-if="message && isWarn">
    <div class="flex flex-row">
      <EyeIcon />
      <span class="mt-1 ml-3 text-amber-950">{{ message }}</span>
    </div>
  </div>
  <div
    class="mb-4 flex flex-row content-center rounded-lg border border-red-950/20 bg-red-500/20 px-4 py-3"
    v-if="message && isError">
    <div class="flex flex-row">
      <XCircleIcon />
      <span class="mt-1 ml-3 text-red-950">{{ message }}</span>
    </div>
  </div>
</template>
