<script setup lang="ts">
import LogoIcon from '@/icons/LogoIcon.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = (): void => {
    // TODO: 仮でログインへ遷移
    router.push({ name: 'home' });
};

</script>

<template>
    <header class="bg-white flex p-5 shadow-md">
        <LogoIcon />
        <h3 class="text-2xl ml-2">
            Todo管理アプリ メニュー
        </h3>
    </header>
    <main class="p-8">
        <div class="container mx-auto text-center">
            <div class="flex flex-col mx-auto">
                <button
                    class="mt-12 h-12 rounded-md bg-blue-600 hover:bg-blue-700 text-xl text-neutral-50">TODO管理</button>
                <button
                    class="mt-12 h-12 rounded-md bg-blue-600 hover:bg-blue-700 text-xl text-neutral-50">TODO一括登録</button>
                <button
                    class="mt-12 h-12 rounded-md bg-blue-600 hover:bg-blue-700 text-xl text-neutral-50">ユーザ管理</button>
                <button v-on:click="logout"
                    class="mt-12 h-12 rounded-md bg-blue-600 hover:bg-blue-700 text-xl text-neutral-50">ログアウト</button>
            </div>
        </div>
    </main>
</template>