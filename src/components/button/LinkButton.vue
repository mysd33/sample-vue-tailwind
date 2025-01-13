<script setup lang="ts">
import BaseButton from './BaseButton.vue';

interface Props {
    outline?: boolean;
}
defineProps<Props>();

defineEmits(['click']);
</script>

<template>
    <BaseButton v-on:click="$emit('click')" v-bind:outline="outline">
        <slot></slot>
    </BaseButton>
</template>