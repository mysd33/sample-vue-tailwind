<script setup lang="ts">
import XCircleIcon from '@/icons/XCircleIcon.vue'

interface Props {
  isError: boolean
}

defineProps<Props>()
</script>

<template>
  <div
    v-if="isError"
    class="mb-4 flex flex-row content-center rounded-lg border border-red-400 bg-red-500/20 px-4 py-3 text-red-600">
    <div class="flex flex-row">
      <XCircleIcon />
      <span class="ml-3 mt-1 text-red-700">入力エラーです。</span>
    </div>
  </div>
</template>
