<script setup lang="ts">
interface Props {
    focus?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
    <input type="date"
        class="h-10 rounded-lg border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-300/50"
        v-bind:autofocus="props.focus" />
</template>