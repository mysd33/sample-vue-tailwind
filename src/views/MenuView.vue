<script setup lang="ts">
import HeaderArea from '@/components/layout/HeaderArea.vue'
import MainContainer from '@/components/layout/MainContainer.vue'
import MenuButton from '@/components/button/MenuButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const onTodoMenuClicked = (): void => {
  router.push({ name: 'todo' })
}

const onTodoFileUploadMenuClicked = (): void => {
  router.push({ name: 'todoFileUpload' })
}
const onUsersMenuClicked = (): void => {
  router.push({ name: 'userList' })
}
const onLogoutMenuClicked = (): void => {
  router.push({ name: 'home' })
}
</script>

<template>
  <HeaderArea title="TODO管理アプリ メニュー" />
  <MainContainer>
    <div class="mx-auto flex flex-col">
      <MenuButton @click="onTodoMenuClicked">TODO管理</MenuButton>
      <MenuButton @click="onTodoFileUploadMenuClicked">TODO一括登録</MenuButton>
      <MenuButton @click="onUsersMenuClicked">ユーザ管理</MenuButton>
      <MenuButton @click="onLogoutMenuClicked">ログアウト</MenuButton>
    </div>
  </MainContainer>
</template>
