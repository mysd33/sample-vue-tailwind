<script setup lang="ts">
import BaseButton from './BaseButton.vue';

defineEmits(['click']);

</script>
<template>
    <BaseButton class="mt-12" size="lg" v-on:click="$emit('click')">
        <slot></slot>
    </BaseButton>
</template>