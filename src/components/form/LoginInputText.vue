<script setup lang="ts">
import InputText from './InputText.vue';
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
    <InputText :id="id" :name="name" :placeholder="placeholder" :focus="focus" :readonly="readonly" :disabled="disabled"
        :is-error="isError" class="h-12 z-0 focus:z-10 mb-[-1px] rounded-none rounded-t-lg"
        v-model:value="valueModel" />
</template>