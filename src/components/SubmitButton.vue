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

</script>

<template>
    <button type="submit" class="px-3 rounded-md bg-blue-600 hover:bg-blue-700 text-md text-neutral-50"
        v-bind:class="height">
        <slot></slot>
    </button>
</template>