<script setup lang="ts">
interface Props {
    id?: string;
    name?: string;
    placeholder?: string;
    focus?: boolean;
    disabled?: boolean;
}

defineProps<Props>();
</script>

<template>
    <input type="file"
        class="h-10 rounded-lg cursor-pointer bg-white border border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-300/50 file:h-10 file:border-l-0 file:border-t-0 file:border-b-0 file:border-r file:border-r-gray-50 file:focus:border-blue-400 file:focus:ring file:focus:ring-blue-300/50"
        :id="id" :name="name" :placeholder="placeholder" :focus="focus" :disabled="disabled" />
</template>