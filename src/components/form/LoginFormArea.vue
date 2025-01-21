<script setup lang="ts">
defineEmits(['submit'])
</script>

<template>
  <form class="mx-auto flex max-w-80 flex-col" @submit.prevent="$emit('submit')">
    <slot></slot>
  </form>
</template>
