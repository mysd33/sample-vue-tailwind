<script setup lang="ts">
import BaseButton from './BaseButton.vue'

interface Props {
  /**
   * ボタンのname属性
   */
  name?: string
  /**
   * ボタンのサイズ（sm, md, lg）
   */
  size?: 'sm' | 'md' | 'lg' | undefined
  /**
   * 重要な（危険）な操作を行うボタンかどうか
   */
  danger?: boolean
  /*
   * ボタンが無効かどうか
   */
  disabled?: boolean
}
defineProps<Props>()
</script>

<template>
  <BaseButton type="submit" :size="size" :danger="danger" :name="name" :disabled="disabled">
    <slot></slot>
  </BaseButton>
</template>
