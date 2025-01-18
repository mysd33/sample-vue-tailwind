<script setup lang="ts">
interface Props {
    type: string;
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
    <input :type="type" :id="id" :name="name" :placeholder="placeholder"
        class="h-10 rounded-lg cursor-pointer border border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-300/50 read-only:bg-transparent read-only:border-transparent read-only:shadow-none read-only:px-0 read-only:focus:ring-transparent read-only:focus:border-transparent"
        :autofocus="focus" :readonly="readonly" :disabled="disabled" />
</template>