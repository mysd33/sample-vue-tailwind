<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    id?: string;
    name?: string;
    placeholder?: string;
    focus?: boolean;
    disabled?: boolean;
    isError?: boolean;
}

const props = defineProps<Props>();

const modelValue = defineModel("value");

const onChanged = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        modelValue.value = target.files[0];
    }
};

const borderColor = computed(() => {
    return props.isError ? 'border-red-600 focus:border-red-400 focus:ring-red-300/50 file:border-red-600 file:focus:border-red-400 file:focus:ring-red-300/50 errorIcon'
        : 'border-gray-300 focus:border-blue-400 focus:ring-blue-300/50 file:border-r-gray-300 file:focus:border-blue-400 file:focus:ring-blue-300/50';
});
</script>

<template>
    <input type="file"
        class="h-10 rounded-lg cursor-pointer bg-white border shadow-sm focus:ring file:h-10 file:border-l-0  file:border-solid file:border-t-0 file:border-b-0 file:border-r file:focus:ring focus:outline-none"
        :id="id" :name="name" :placeholder="placeholder" :focus="focus" :disabled="disabled" :class="[borderColor]"
        @change="onChanged" />
</template>

<style scoped>
.errorIcon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    padding-right: calc(1.5em + .75rem);
    background-position: right calc(.375em + .1875rem) center;
    background-size: calc(.75em + .375rem) calc(.75em + .375rem);
}
</style>