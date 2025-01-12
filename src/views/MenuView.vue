<script setup lang="ts">
import HeaderArea from '@/components/layout/HeaderArea.vue';
import MainContainer from '@/components/layout/MainContainer.vue';
import MenuButton from '@/components/button/MenuButton.vue';
import { useRouter } from 'vue-router';

const title = 'TODO管理アプリ メニュー';

const router = useRouter();


// TODO: 仮の画面遷移
const forwardToTodoList = (): void => {
    router.push({ name: 'todo' });
}
const forwardToUserList = (): void => {
    router.push({ name: 'users' });
}
const logout = (): void => {
    router.push({ name: 'home' });
};

</script>

<template>
    <HeaderArea v-bind:title="title" />
    <MainContainer>
        <div class="flex flex-col mx-auto">
            <MenuButton v-on:click="forwardToTodoList">TODO管理</MenuButton>
            <MenuButton>TODO一括登録</MenuButton>
            <MenuButton v-on:click="forwardToUserList">ユーザ管理</MenuButton>
            <MenuButton v-on:click="logout">ログアウト</MenuButton>
        </div>
    </MainContainer>
</template>