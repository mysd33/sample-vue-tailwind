<script setup lang="ts">
import BaseButton from './BaseButton.vue'

interface Props {
  size?: string
  danger?: boolean
  name?: string
}
defineProps<Props>()
</script>

<template>
  <BaseButton type="submit" :size="size" :danger="danger" :name="name">
    <slot></slot>
  </BaseButton>
</template>
