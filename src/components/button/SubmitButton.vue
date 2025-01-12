<script setup lang="ts">
import BaseButton from './BaseButton.vue';

interface Props {
    // サイズを上書き可能    
    size?: string;
}
const props = defineProps<Props>();

</script>

<template>
    <BaseButton type="submit" v-bind:size="props.size">
        <slot></slot>
    </BaseButton>
</template>