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
import ValidationErrorBanner from '@/components/banner/ValidationErrorBanner.vue';
import { ref } from 'vue';

const router = useRouter();

// TODO: 仮の入力エラー
//const isValidationError = ref(true);
const isValidationError = ref(false);

const onBackButtonClick = () => {
    router.push({ name: 'menu' });
};

const onSubmit = () => {
    console.log('TODOを作成します');
};

</script>

<template>
    <HeaderArea title="TODO一括登録">
        <LinkButton :outline="true" @click="onBackButtonClick">メニューに戻る</LinkButton>
    </HeaderArea>
    <MainContainer>
        <ValidationErrorBanner :isError="isValidationError" />
        <form @submit="onSubmit" class="flex flex-col text-left">
            <InputItem>
                <label for="todoFile">Todoファイル
                    <RequiredBadge />
                </label>
                <InputFile id="todoFile" name="todoFile" :focus="true" :isError="isValidationError" />
            </InputItem>
            <ButtonArea class="mt-4">
                <SubmitButton>登録</SubmitButton>
            </ButtonArea>
        </form>
    </MainContainer>
</template>