<script setup lang="ts">

defineEmits(['submit']);

</script>

<template>
    <form class="grid grid-cols-2 gap-6 text-left" @submit.prevent="$emit('submit')">
        <slot></slot>
    </form>
</template>