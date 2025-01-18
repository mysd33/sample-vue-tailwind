<script setup lang="ts">
import InputPassword from './InputPassword.vue';

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
    <InputPassword :id="id" :name="name" :placeholder="placeholder" :focus="focus" :readonly="readonly"
        :disabled="disabled" class="h-12 z-0 focus:z-10 rounded-none rounded-b-lg" />
</template>