<script setup lang="ts">
import LogoIcon from '@/icons/LogoIcon.vue';
</script>

<template>
    <header class="bg-white flex p-5 shadow-md">
        <LogoIcon />
        <h3 class="text-2xl ml-2">
            Todo管理アプリ
        </h3>
    </header>
    <main class="p-8">
        <div class="container mx-auto text-center">
            <form class="flex flex-col max-w-80 mx-auto">
                <label for="userId" class="sr-only">ユーザーID</label>
                <input type="text" id="userId" name="userId" placeholder="ユーザID"
                    class="z-0 focus:z-10 mb-[-1px] rounded-t-lg border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-300/50">
                <input type="password" id="password" name="password" placeholder="パスワード"
                    class="z-0 focus:z-10 rounded-b-lg border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-300/50">
                <label for="password" class="sr-only">パスワード</label>
                <button class="mt-3 h-12 rounded-md bg-blue-600 hover:bg-blue-700 text-neutral-50">ログイン</button>
            </form>
        </div>
    </main>
</template>