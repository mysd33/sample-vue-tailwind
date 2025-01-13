<script setup lang="ts">
import HeaderArea from '@/components/layout/HeaderArea.vue';
import MainContainer from '@/components/layout/MainContainer.vue';
import LoginFormArea from '@/components/form/LoginFormArea.vue';
import LoginInputText from '@/components/form/LoginInputText.vue';
import LoginInputPassword from '@/components/form/LoginInputPassword.vue';
import SubmitButton from '@/components/button/SubmitButton.vue';
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
        <LoginFormArea v-on:submit="onSubmit">
            <label for="userId" class="sr-only">ユーザーID</label>
            <LoginInputText id="userId" name="userId" placeholder="ユーザID" v-bind:focus="true" />
            <label for="password" class="sr-only">パスワード</label>
            <LoginInputPassword id="password" name="password" placeholder="パスワード" />
            <SubmitButton size="lg" class="mt-3">ログイン</SubmitButton>
        </LoginFormArea>
    </MainContainer>
</template>