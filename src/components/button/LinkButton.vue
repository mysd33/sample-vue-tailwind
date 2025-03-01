<script setup lang="ts">
import BaseButton from './BaseButton.vue'

interface Props {
  /**
   * アウトラインボタンかどうか
   */
  outline?: boolean
  /**
   * ボタンが無効かどうか
   */
  disabled?: boolean
  /**
   * リンク先のキー情報
   */
  linkedKey?: string
}

defineProps<Props>()

interface Emits {
  /**
   * ボタンクリック時
   */
  (event: 'click', key?: string): void
}

defineEmits<Emits>()
</script>

<template>
  <BaseButton :outline="outline" :disabled="disabled" @click="$emit('click', linkedKey)">
    <slot></slot>
  </BaseButton>
</template>
