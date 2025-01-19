<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    size?: string;
    outline?: boolean;
    danger?: boolean;
    name?: string;
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

const colorSet = computed(() => {
    if (props.danger) {
        return "bg-red-600 hover:bg-red-700 text-white";
    }
    if (props.outline) {
        return "border border-blue-600 bg-white text-blue-600 hover:border-transparent hover:bg-blue-600 hover:text-white";
    }
    return "bg-blue-600 hover:bg-blue-700 text-white";
})

defineEmits(['click']);

</script>

<template>
    <button :name="name" class="px-3 rounded-md" :class="[height, textSize, colorSet]" @click="$emit('click')">
        <slot></slot>
    </button>
</template>