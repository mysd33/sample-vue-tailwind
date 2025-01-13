<script setup lang="ts">
interface Props {
    type: string;
    focus?: boolean;
    readonly?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
    <input v-bind:type="props.type"
        class="h-10 rounded-lg border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-300/50 read-only:bg-transparent read-only:border-transparent read-only:shadow-none read-only:px-0 read-only:focus:ring-transparent read-only:focus:border-transparent"
        v-bind:autofocus="props.focus" v-bind:readonly="props.readonly" />
</template>