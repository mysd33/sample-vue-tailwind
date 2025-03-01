<script setup lang="ts">
import { useRouter } from 'vue-router'
import LinkButton from './LinkButton.vue'

interface Props {
  /**
   * 遷移先のビュー名
   */
  forwardViewName?: string
  /**
   * アウトラインボタンかどうか
   */
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
  <LinkButton
    class="mt-12"
    size="lg"
    :disabled="disabled"
    :outline="outline"
    @click="$emit('click')"
    :forward-view-name="forwardViewName">
    <slot></slot>
  </LinkButton>
</template>
