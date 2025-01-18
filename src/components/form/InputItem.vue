<script setup lang="ts">
import RequiredBadge from '@/icons/RequiredBadge.vue';

interface Props {
    label?: string,
    labelFor?: string,
    srOnly?: boolean,
    required?: boolean,
    errors?: string[],
}
const props = defineProps<Props>();

const srOnly = props.srOnly ? 'sr-only' : '';

</script>
<template>
    <div class="flex flex-col">
        <label v-if="label" :for="labelFor" :class="srOnly">{{ label }}
            <RequiredBadge v-if="required" />
        </label>
        <slot></slot>
    </div>
</template>