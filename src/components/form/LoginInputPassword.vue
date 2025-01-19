<script setup lang="ts">
import InputPassword from './InputPassword.vue';

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

const valueModel = defineModel('value');
</script>

<template>
    <InputPassword :id="id" :name="name" :placeholder="placeholder" :focus="focus" :readonly="readonly"
        :disabled="disabled" :is-error="isError" class="h-12 z-0 focus:z-10 rounded-none rounded-b-lg"
        v-model:value="valueModel" />
</template>