<script setup lang="ts">
import LogoIcon from '@/icons/LogoIcon.vue'

interface Props {
  title: string
}
defineProps<Props>()
</script>

<template>
  <header class="flex flex-row bg-white p-5 shadow-md">
    <div class="flex">
      <LogoIcon />
      <h3 class="ml-2 text-2xl">
        {{ title }}
      </h3>
    </div>
    <div class="relative ml-auto">
      <!-- TODO: ログイン済みの場合に、ユーザ名を表示 -->
      <!-- ようこそ, <strong>山田太郎</strong>さん! -->
      <slot></slot>
    </div>
  </header>
</template>
