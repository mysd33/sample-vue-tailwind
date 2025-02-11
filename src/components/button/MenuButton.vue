<script setup lang="ts">
import BaseButton from './BaseButton.vue'

interface Props {
  outline?: boolean
  /**
   * ボタンが無効かどうか
   */
  disabled?: boolean
}
defineProps<Props>()

interface Emits {
  /**
   * ボタンクリック時
   */
  (event: 'click'): void
}
defineEmits<Emits>()
</script>
<template>
  <BaseButton class="mt-12" size="lg" :disabled="disabled" @click="$emit('click')">
    <slot></slot>
  </BaseButton>
</template>
