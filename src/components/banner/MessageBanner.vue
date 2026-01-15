<script setup lang="ts">
import { computed } from 'vue'
import ErrorIcon from '@/components/icons/ErrorIcon.vue'
import InfoIcon from '@/components/icons/InfoIcon.vue'
import WarnIcon from '@/components/icons/WarnIcon.vue'

export type MessageLevel = '' | 'validation' | 'info' | 'warn' | 'error'

interface Props {
  level: MessageLevel
  message?: string
}

const props = defineProps<Props>()
const isValidationError = computed(() => props.level === 'validation')
const isInfo = computed(() => props.level === 'info')
const isWarn = computed(() => props.level === 'warn')
const isError = computed(() => props.level === 'error')
</script>

<template>
  <!-- TODO: レイアウトの共通化 -->
  <div
    v-if="isValidationError"
    class="mb-4 flex w-full flex-row content-center rounded-lg border border-red-950/20 bg-red-500/20 px-4 py-3">
    <div class="flex flex-row">
      <ErrorIcon />
      <span class="mt-1 ml-3 text-red-950">入力エラーです。</span>
    </div>
  </div>
  <div
    class="mb-4 flex w-full flex-row content-center rounded-lg border border-green-950/20 bg-green-600/20 px-4 py-3"
    v-if="message && isInfo">
    <div class="flex flex-row">
      <InfoIcon />
      <span class="mt-1 ml-3 text-green-950">{{ message }}</span>
    </div>
  </div>
  <div
    class="mb-4 flex w-full flex-row content-center rounded-lg border border-amber-950/20 bg-amber-500/20 px-4 py-3"
    v-if="message && isWarn">
    <div class="flex flex-row">
      <WarnIcon />
      <span class="mt-1 ml-3 text-amber-950">{{ message }}</span>
    </div>
  </div>
  <div
    class="mb-4 flex w-full flex-row content-center rounded-lg border border-red-950/20 bg-red-500/20 px-4 py-3"
    v-if="message && isError">
    <div class="flex flex-row">
      <ErrorIcon />
      <span class="mt-1 ml-3 text-red-950">{{ message }}</span>
    </div>
  </div>
</template>
