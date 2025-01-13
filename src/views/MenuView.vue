<script setup lang="ts">
import HeaderArea from '@/components/layout/HeaderArea.vue';
import MainContainer from '@/components/layout/MainContainer.vue';
import MenuButton from '@/components/button/MenuButton.vue';
import { useRouter } from 'vue-router';

const title = 'TODO管理アプリ メニュー';

const router = useRouter();


// TODO: 仮の画面遷移
const onTodoMenuClicked = (): void => {
    router.push({ name: 'todo' });
}
const onUsersMenuClicked = (): void => {
    router.push({ name: 'userList' });
}
const onLogoutMenuClicked = (): void => {
    router.push({ name: 'home' });
};

</script>

<template>
    <HeaderArea v-bind:title="title" />
    <MainContainer>
        <div class="flex flex-col mx-auto">
            <MenuButton v-on:click="onTodoMenuClicked">TODO管理</MenuButton>
            <MenuButton>TODO一括登録</MenuButton>
            <MenuButton v-on:click="onUsersMenuClicked">ユーザ管理</MenuButton>
            <MenuButton v-on:click="onLogoutMenuClicked">ログアウト</MenuButton>
        </div>
    </MainContainer>
</template>