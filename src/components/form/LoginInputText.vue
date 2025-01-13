<script setup lang="ts">
import InputText from './InputText.vue';
interface Props {
    focus?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
    <InputText v-bind:focus="props.focus" class="h-12 z-0 focus:z-10 mb-[-1px] rounded-none rounded-t-lg" />
</template>