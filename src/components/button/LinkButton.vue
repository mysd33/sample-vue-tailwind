<script setup lang="ts">
import BaseButton from './BaseButton.vue'

interface Props {
  outline?: boolean
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

<!-- TODO* パスでリンク渡せないとダメかも。。。 -->
<template>
  <BaseButton @click="$emit('click')" :outline="outline">
    <slot></slot>
  </BaseButton>
</template>
