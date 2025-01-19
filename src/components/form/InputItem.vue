<script setup lang="ts">
import RequiredBadge from '@/icons/RequiredBadge.vue';
import { computed } from 'vue';

interface Props {
    label?: string,
    labelFor?: string,
    srOnly?: boolean,
    required?: boolean,
    errors?: string[],
}
const props = defineProps<Props>();
const srOnly = props.srOnly ? 'sr-only' : '';
const isError = computed(() => {
    return props.errors && props.errors.length > 0;
});
const errorTextColor = computed(() => {
    return isError.value ? 'text-red-600' : '';
});

</script>
<template>
    <div class="flex flex-col">
        <label v-if="label" :for="labelFor" :class="[srOnly, errorTextColor]">{{ label }}
            <RequiredBadge v-if="required" />
        </label>
        <slot></slot>
        <div v-if="isError" class="text-red-600 text-sm flow flow-col">
            <div v-for="error in props.errors" :key="error">{{ error }}</div>
        </div>
    </div>
</template>