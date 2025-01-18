<script setup lang="ts">
import BaseButton from './BaseButton.vue';

interface Props {
    outline?: boolean;
}
defineProps<Props>();

defineEmits(['click']);
</script>


<!-- TODO* パスでリンク渡せないとダメかも。。。 -->
<template>
    <BaseButton @click="$emit('click')" :outline="outline">
        <slot></slot>
    </BaseButton>
</template>