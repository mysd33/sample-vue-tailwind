<script setup lang="ts">
import XCircleIcon from '@/icons/XCircleIcon.vue'
import EyeIcon from '@/icons/EyeIcon.vue'

import { computed } from 'vue'
import CheckCircleIcon from '@/icons/CheckCircleIcon.vue'

interface Props {
  message?: string
  level?: string
}

const props = defineProps<Props>()

const isInfo = computed(() => props.level === 'info')
const isWarn = computed(() => props.level === 'warn')
const isError = computed(() => props.level === 'error')
</script>

<template>
  <div
    class="mb-4 flex flex-row content-center rounded-lg border border-green-400 bg-green-600/20 px-4 py-3 text-green-600"
    v-if="message && isInfo">
    <div class="flex flex-row">
      <CheckCircleIcon />
      <span class="ml-3 mt-1 text-green-700">{{ message }}</span>
    </div>
  </div>
  <div
    class="mb-4 flex flex-row content-center rounded-lg border border-amber-400 bg-amber-100 px-4 py-3 text-amber-600"
    v-if="message && isWarn">
    <div class="flex flex-row">
      <EyeIcon />
      <span class="ml-3 mt-1 text-amber-700">{{ message }}</span>
    </div>
  </div>
  <div
    class="mb-4 flex flex-row content-center rounded-lg border border-red-400 bg-red-500/20 px-4 py-3 text-red-600"
    v-if="message && isError">
    <div class="flex flex-row">
      <XCircleIcon />
      <span class="ml-3 mt-1 text-red-700">{{ message }}</span>
    </div>
  </div>
</template>
