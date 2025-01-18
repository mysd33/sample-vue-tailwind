<script setup lang="ts">
import RequiredBadge from '@/icons/RequiredBadge.vue';

interface Props {
    label?: string,
    labelFor?: string,
    required?: boolean,
}
defineProps<Props>();

</script>
<template>
    <div class="flex flex-col">
        <label v-if="label" :for="labelFor">{{ label }}
            <RequiredBadge v-if="required" />
        </label>
        <slot></slot>
    </div>
</template>