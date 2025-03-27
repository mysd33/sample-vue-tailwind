<script setup lang="ts">
import HeaderArea from '@/components/layout/HeaderArea.vue'
import MainContainer from '@/components/layout/MainContainer.vue'
import MenuButton from '@/components/button/MenuButton.vue'
import { AuthenticationServiceImpl } from '@/usecases/login/services/authenticationService'
import { useRouter } from 'vue-router'
import { useAuthenticationStore } from '@/usecases/common/stores/authenticationStore'
import { UserRepositoryImpl } from '@/usecases/common/repositories/userRepository'

// ビジネスロジック
const authenticationService = new AuthenticationServiceImpl(new UserRepositoryImpl())

const authStore = useAuthenticationStore()
const router = useRouter()

const onLogoutMenuClicked = async (): Promise<void> => {
  // ログアウト処理
  authenticationService.logout().then(() => {
    router.push({ name: 'home' })
  })
}
</script>

<template>
  <HeaderArea title="TODO管理アプリ メニュー" />
  <MainContainer>
    <div class="mx-auto flex flex-col">
      <MenuButton forward-view-name="todo">TODO管理</MenuButton>
      <MenuButton forward-view-name="todoFileUpload">TODO一括登録</MenuButton>
      <MenuButton v-if="authStore.user?.isAdmin" forward-view-name="userList"
        >ユーザ管理</MenuButton
      >
      <MenuButton @click="onLogoutMenuClicked">ログアウト</MenuButton>
    </div>
  </MainContainer>
</template>
