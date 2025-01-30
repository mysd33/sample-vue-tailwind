<script setup lang="ts">
import BaseButton from './BaseButton.vue'

interface Emits {
  /**
   * ボタンクリック時
   */
  (event: 'click'): void
}
defineEmits<Emits>()
</script>
<template>
  <BaseButton class="mt-12" size="lg" @click="$emit('click')">
    <slot></slot>
  </BaseButton>
</template>
