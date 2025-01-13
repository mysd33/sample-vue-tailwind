<script setup lang="ts">
import HeaderArea from '@/components/layout/HeaderArea.vue';
import MainContainer from '@/components/layout/MainContainer.vue';
import FormArea from '@/components/form/FormArea.vue';
import InputItem from '@/components/form/InputItem.vue';
import InputText from '@/components/form/InputText.vue';
import InputPassword from '@/components/form/InputPassword.vue';
import InputDate from '@/components/form/InputDate.vue';
import ToggleSwitch from '@/components/form/ToggleSwitch.vue';
import RequiredBadge from '@/icons/RequiredBadge.vue';
import ButtonArea from '@/components/button/ButtonArea.vue';
import LinkButton from '@/components/button/LinkButton.vue';
import SubmitButton from '@/components/button/SubmitButton.vue';

import { useRouter } from 'vue-router';
import { ref } from 'vue';

const title = 'TODO管理アプリ';

const router = useRouter();

// TODO: 仮のバインド
const isAdmin = ref(false);

const onBackButtonClick = () => {
    router.push({ name: 'userList' });
};
const onSubmit = (): void => {
    // TODO: 仮でメニューへ遷移
    router.push({ name: 'userList' });
};

</script>

<template>
    <HeaderArea v-bind:title="title">
        <LinkButton v-bind:outline="true" v-on:click="onBackButtonClick">ユーザ一覧に戻る</LinkButton>
    </HeaderArea>
    <MainContainer>
        <FormArea v-on:submit="onSubmit">
            <InputItem>
                <label for="userId">ユーザーID
                    <RequiredBadge />
                </label>
                <InputText id="userId" name="userId" v-bind:focus="true" />
            </InputItem>
            <InputItem>
                <label for="password">パスワード
                    <RequiredBadge />
                </label>
                <InputPassword id="password" name="password" />
            </InputItem>
            <InputItem>
                <label for="userName">ユーザー名
                    <RequiredBadge />
                </label>
                <InputText id="userName" name="userName" />
            </InputItem>
            <InputItem>
                <label for="birthday">生年月日
                    <RequiredBadge />
                </label>
                <InputDate id="birthday" name="birthday" />
            </InputItem>
            <InputItem>
                <ToggleSwitch v-bind:enabled="isAdmin">管理者</ToggleSwitch>
            </InputItem>
            <InputItem></InputItem>
            <ButtonArea>
                <SubmitButton>ユーザ登録</SubmitButton>
            </ButtonArea>
        </FormArea>
    </MainContainer>
</template>