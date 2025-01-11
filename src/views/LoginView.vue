<script setup lang="ts">
import HeaderArea from '@/components/HeaderArea.vue';
import MainContainer from '@/components/MainContainer.vue';
import FormArea from '@/components/FormArea.vue';
import SubmitButton from '@/components/SubmitButton.vue';
import { useRouter } from 'vue-router';

const title = 'TODO管理アプリ';

const router = useRouter();

const onSubmit = (): void => {
    // TODO: 仮でメニューへ遷移
    router.push({ name: 'menu' });
};

</script>

<template>
    <HeaderArea v-bind:title="title" />
    <MainContainer>
        <FormArea v-on:submit.prevent="onSubmit">
            <label for="userId" class="sr-only">ユーザーID</label>
            <input type="text" id="userId" name="userId" placeholder="ユーザID"
                class="h-12 z-0 focus:z-10 mb-[-1px] rounded-t-lg border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-300/50" />
            <label for="password" class="sr-only">パスワード</label>
            <input type="password" id="password" name="password" placeholder="パスワード"
                class="h-12 z-0 focus:z-10 rounded-b-lg border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-300/50" />
            <button type="submit"
                class="mt-3 px-3 h-12 rounded-md bg-blue-600 hover:bg-blue-700 text-md text-neutral-50">ログイン</button>
        </FormArea>
    </MainContainer>
</template>