<script setup lang="ts">
import XCircleIcon from '@/icons/XCircleIcon.vue';

interface Props {
    isError: boolean;
}

defineProps<Props>();

</script>

<template>
    <div class="bg-red-500/20 border border-red-400 text-red-600 px-4 py-3 mb-4 rounded-lg flex flex-row content-center"
        v-if="isError">
        <div class="flex flex-row">
            <XCircleIcon />
            <span class="text-red-700 ml-3 mt-1">入力エラーです。</span>
        </div>
    </div>
</template>