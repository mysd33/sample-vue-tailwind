<script setup lang="ts">
import LogoIcon from '@/icons/LogoIcon.vue';

interface Props {
    title: string;
}
defineProps<Props>();

</script>

<template>
    <header class="bg-white flex p-5 shadow-md">
        <LogoIcon />
        <h3 class="text-2xl ml-2">
            {{ title }}
        </h3>
    </header>
</template>