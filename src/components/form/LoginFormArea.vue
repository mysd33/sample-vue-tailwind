<script setup lang="ts">

defineEmits(['submit']);

</script>

<template>
    <form class="flex flex-col max-w-80 mx-auto" @submit.prevent="$emit('submit')">
        <slot></slot>
    </form>
</template>