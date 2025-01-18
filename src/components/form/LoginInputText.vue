<script setup lang="ts">
import InputText from './InputText.vue';
interface Props {
    id?: string;
    name?: string;
    placeholder?: string;
    focus?: boolean;
    readonly?: boolean;
    disabled?: boolean;
}

defineProps<Props>();
</script>

<template>
    <InputText :id="id" :name="name" :placeholder="placeholder" :focus="focus" :readonly="readonly" :disabled="disabled"
        class="h-12 z-0 focus:z-10 mb-[-1px] rounded-none rounded-t-lg" />
</template>