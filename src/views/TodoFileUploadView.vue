<script setup lang="ts">
import HeaderArea from '@/components/layout/HeaderArea.vue';
import MainContainer from '@/components/layout/MainContainer.vue';
import InputItem from '@/components/form/InputItem.vue';
import ButtonArea from '@/components/button/ButtonArea.vue';
import SubmitButton from '@/components/button/SubmitButton.vue';
import InputFile from '@/components/form/InputFile.vue';
import RequiredBadge from '@/icons/RequiredBadge.vue';
import LinkButton from '@/components/button/LinkButton.vue';
import { useRouter } from 'vue-router';

const title = 'TODO一括登録';
const router = useRouter();

const onBackButtonClick = () => {
    router.push({ name: 'menu' });
};

const onSubmit = () => {
    console.log('TODOを作成します');
};

</script>

<template>
    <HeaderArea :title="title">
        <LinkButton :outline="true" @click="onBackButtonClick">メニューに戻る</LinkButton>
    </HeaderArea>
    <MainContainer>
        <form @submit="onSubmit" class="flex flex-col text-left">
            <InputItem>
                <label for="todoFile">Todoファイル
                    <RequiredBadge />
                </label>
                <InputFile id="todoFile" name="todoFile" :focus="true" />
            </InputItem>
            <ButtonArea class="mt-4">
                <SubmitButton>登録</SubmitButton>
            </ButtonArea>
        </form>
    </MainContainer>
</template>