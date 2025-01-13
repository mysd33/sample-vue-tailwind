<script setup lang="ts">
import HeaderArea from '@/components/layout/HeaderArea.vue';
import MainContainer from '@/components/layout/MainContainer.vue';
import FormArea from '@/components/form/FormArea.vue';
import InputItem from '@/components/form/InputItem.vue';
import InputText from '@/components/form/InputText.vue';
import InputPassword from '@/components/form/InputPassword.vue';
import InputDate from '@/components/form/InputDate.vue';
import RequiredBadge from '@/icons/RequiredBadge.vue';
import ButtonArea from '@/components/button/ButtonArea.vue';
import LinkButton from '@/components/button/LinkButton.vue';
import SubmitButton from '@/components/button/SubmitButton.vue';

import { useRouter } from 'vue-router';

interface Props {
    id: string;
}
defineProps<Props>();

const title = 'TODO管理アプリ';

const router = useRouter();

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
                <!-- TODO: データバインド -->
                <InputText type="text" id="userId" name="userId" v-bind:readonly="true" value="yamada@xxx.co.jp" />
            </InputItem>
            <InputItem>
                <label for="password">パスワード
                    <RequiredBadge />
                </label>
                <InputPassword id="password" name="password" v-bind:focus="true" />
            </InputItem>
            <InputItem>
                <label for="userName">ユーザー名
                    <RequiredBadge />
                </label>
                <!-- TODO: データバインド -->
                <InputText type="text" id="userName" name="userName" value="山田太郎" />
            </InputItem>
            <InputItem>
                <label for="birthday">生年月日
                    <RequiredBadge />
                </label>
                <!-- TODO: データバインド -->
                <InputDate id="birthday" name="birthday" value="1990-01-01" />
            </InputItem>
            <ButtonArea>
                <SubmitButton>ユーザ更新</SubmitButton>
                <SubmitButton v-bind:danger="true">ユーザ削除</SubmitButton>
            </ButtonArea>
        </FormArea>
    </MainContainer>
</template>