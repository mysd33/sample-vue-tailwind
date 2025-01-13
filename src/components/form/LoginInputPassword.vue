<script setup lang="ts">
import InputPassword from './InputPassword.vue';

interface Props {
    focus?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
    <InputPassword v-bind:focus="props.focus" class="h-12 z-0 focus:z-10 rounded-none rounded-b-lg" />
</template>