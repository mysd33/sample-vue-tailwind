<script setup lang="ts">
import BaseInput from './BaseInput.vue';
interface Props {
    focus?: boolean;
    readonly?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
    <BaseInput type="text" v-bind:focus="props.focus" v-bind:readonly="props.readonly" />
</template>