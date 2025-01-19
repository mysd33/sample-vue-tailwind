<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    type: string;
    id?: string;
    name?: string;
    placeholder?: string;
    focus?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    isError?: boolean;
}

const props = defineProps<Props>();

const valueModel = defineModel('value');

const borderColor = computed(() => {
    return props.isError ? 'border-red-600 focus:border-red-400 focus:ring-red-300/50 errorIcon' : 'border-gray-300 focus:border-blue-400 focus:ring-blue-300/50';
});

</script>

<template>
    <input :type="type" :id="id" :name="name" :placeholder="placeholder"
        class="h-10 rounded-lg cursor-pointer border shadow-sm  focus:ring read-only:bg-transparent read-only:border-transparent read-only:shadow-none read-only:px-0 read-only:focus:ring-transparent read-only:focus:border-transparent"
        :autofocus="focus" :readonly="readonly" :disabled="disabled" :class="[borderColor]" v-model="valueModel" />
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