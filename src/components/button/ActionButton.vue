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
   * ボタンクリック時の処理対象のキー情報
   */
  actionKey?: string
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
  <BaseButton :outline="outline" :disabled="disabled" @click="$emit('click', actionKey)">
    <slot></slot>
  </BaseButton>
</template>
