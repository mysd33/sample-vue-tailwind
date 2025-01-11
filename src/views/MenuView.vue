<script setup lang="ts">
import HeaderArea from '@/components/HeaderArea.vue';
import MainContainer from '@/components/MainContainer.vue';
import MenuButton from '@/components/MenuButton.vue';
import { useRouter } from 'vue-router';

const title = 'TODO管理アプリ メニュー';

const router = useRouter();

const logout = (): void => {
    // TODO: 仮でログインへ遷移
    router.push({ name: 'home' });
};

</script>

<template>
    <HeaderArea v-bind:title="title" />
    <MainContainer>
        <div class="flex flex-col mx-auto">
            <MenuButton>TODO管理</MenuButton>
            <MenuButton>TODO一括登録</MenuButton>
            <MenuButton>ユーザ管理</MenuButton>
            <MenuButton v-on:click="logout">ログアウト</MenuButton>
        </div>
    </MainContainer>
</template>