<script setup lang="ts">
import BaseButton from './BaseButton.vue';

interface Props {
    // サイズを上書き可能    
    size?: string;
    // danger属性を追加
    danger?: boolean;
}
const props = defineProps<Props>();

</script>

<template>
    <BaseButton type="submit" :size="props.size" :danger="props.danger">
        <slot></slot>
    </BaseButton>
</template>