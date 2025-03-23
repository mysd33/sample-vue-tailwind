<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useUserDummyStore } from './usecases/common/stores/usersStore'

// TODO: いずれ削除
// スタブ実装として、以下のユーザを初期登録する
const usersDummyStore = useUserDummyStore()
usersDummyStore.init()
</script>

<template>
  <RouterView />
</template>
