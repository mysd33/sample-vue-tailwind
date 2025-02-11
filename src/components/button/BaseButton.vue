<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /**
   * ボタンのname属性
   */
  name?: string
  /**
   * ボタンのtype属性
   */
  type?: 'submit' | 'button' | 'reset' | undefined
  /**
   * ボタンのサイズ（sm, md, lg）
   */
  size?: 'sm' | 'md' | 'lg' | undefined
  /**
   * アウトラインボタンかどうか
   */
  outline?: boolean
  /**
   * 重要な（危険）な操作を行うボタンかどうか
   */
  danger?: boolean
  /*
   * ボタンが無効かどうか
   */
  disabled?: boolean
}
const props = defineProps<Props>()

const height = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-8'
    case 'md':
      return 'h-10'
    case 'lg':
      return 'h-12'
    default:
      return 'h-10'
  }
})

const textSize = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-sm'
    case 'md':
      return 'text-md'
    case 'lg':
      return 'text-xl'
    default:
      return 'text-md'
  }
})

const colorSet = computed(() => {
  if (props.danger) {
    return 'bg-red-600 hover:bg-red-700 text-white focus:border-red-400 focus:ring-red-300/50 '
  }
  if (props.outline) {
    return 'border border-blue-600 bg-white text-blue-600 hover:border-transparent hover:bg-blue-600 hover:text-white focus:border-blue-400 focus:ring-blue-300/50 focus:bg-blue-600 focus:text-white'
  }
  return 'bg-blue-600 hover:bg-blue-700 text-white focus:border-blue-400 focus:ring-blue-300/50'
})

interface Emits {
  /**
   * ボタンクリック時
   */
  (event: 'click'): void
}

defineEmits<Emits>()
</script>

<template>
  <button
    :type="type"
    :name="name"
    class="rounded-md px-3 focus:outline-none focus:ring disabled:opacity-50"
    :class="[height, textSize, colorSet]"
    :disabled="disabled"
    @click="$emit('click')">
    <slot></slot>
  </button>
</template>
