<script setup lang="ts">
import BaseInput from './BaseInput.vue';

interface Props {
    id?: string;
    name?: string;
    placeholder?: string;
    focus?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    isError?: boolean;
}

defineProps<Props>();
</script>

<template>
    <BaseInput type="password" :id="id" :name="name" :placeholder="placeholder" :focus="focus" :readonly="readonly"
        :disabled="disabled" :isError="isError" />
</template>
