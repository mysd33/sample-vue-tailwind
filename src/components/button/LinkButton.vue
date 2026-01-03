<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from './BaseButton.vue'

interface Props {
  /**
   * 遷移先のビュー名
   */
  forwardViewName?: string
  /**
   * ボタンのサイズ（sm, md, lg）
   */
  size?: 'sm' | 'md' | 'lg' | undefined
  /**
   * アウトラインボタンかどうか
   */
  outline?: boolean
  /**
   * ボタンが無効かどうか
   */
  disabled?: boolean
}
const props = defineProps<Props>()

const router = useRouter()

interface Emits {
  /**
   * ボタンクリック時
   */
  (event: 'click'): void
}
const emit = defineEmits<Emits>()

const onClick = (): void => {
  // ボタンクリック時の処理があれば事前に実施
  emit('click')
  // 指定の画面があれば遷移
  if (props.forwardViewName) {
    router.push({ name: props.forwardViewName })
  }
}
</script>
<template>
  <BaseButton :size="size" :disabled="disabled" :outline="outline" @click="onClick">
    <slot></slot>
  </BaseButton>
</template>
