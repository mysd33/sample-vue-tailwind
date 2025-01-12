<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    size?: string;
}
const props = defineProps<Props>();

const height = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'h-8';
        case 'md':
            return 'h-10';
        case 'lg':
            return 'h-12';
        default:
            return 'h-10';
    }
});

const textSize = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'text-sm';
        case 'md':
            return 'text-md';
        case 'lg':
            return 'text-xl';
        default:
            return 'text-md';
    }
});

</script>

<template>
    <button class="px-3 rounded-md bg-blue-600 hover:bg-blue-700 text-neutral-50" v-bind:class="[height, textSize]">
        <slot></slot>
    </button>
</template>