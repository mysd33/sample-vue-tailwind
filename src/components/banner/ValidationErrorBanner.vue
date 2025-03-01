<script setup lang="ts">
import XCircleIcon from '@/components/icons/XCircleIcon.vue'

interface Props {
  isError: boolean
}

defineProps<Props>()
</script>

<template>
  <div
    v-if="isError"
    class="mb-4 flex flex-row content-center rounded-lg border border-red-950/20 bg-red-500/20 px-4 py-3">
    <div class="flex flex-row">
      <XCircleIcon />
      <span class="mt-1 ml-3 text-red-950">入力エラーです。</span>
    </div>
  </div>
</template>
