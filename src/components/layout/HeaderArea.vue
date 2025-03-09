<script setup lang="ts">
import LogoIcon from '@/components/icons/LogoIcon.vue'
import { useAuthenticationStore } from '@/usecases/common/stores/authenticationStore'
import { storeToRefs } from 'pinia'

interface Props {
  title: string
}
defineProps<Props>()

const authStore = useAuthenticationStore()
</script>

<template>
  <header class="flex flex-row bg-white p-5 shadow-md">
    <div class="flex">
      <LogoIcon />
      <h3 class="ml-2 text-2xl">
        {{ title }}
      </h3>
    </div>
    <div class="relative ml-auto">
      <template v-if="authStore.isLoggedIn">
        ようこそ, <strong>{{ authStore.user?.name }}</strong
        >さん!
        <slot></slot>
      </template>
    </div>
  </header>
</template>
