<script setup lang="ts">
import HeaderArea from '@/components/layout/HeaderArea.vue';
import MainContainer from '@/components/layout/MainContainer.vue';
import InputText from '@/components/form/InputText.vue';
import SubmitButton from '@/components/button/SubmitButton.vue';
import LinkButton from '@/components/button/LinkButton.vue';
import { useRouter } from 'vue-router';
import InputItem from '@/components/form/InputItem.vue';
import ButtonArea from '@/components/button/ButtonArea.vue';

const title = 'TODOリスト';
const router = useRouter();

const onBackButtonClick = () => {
    router.push({ name: 'menu' });
};

const createTodo = () => {
    console.log('TODOを作成します');
};

</script>

<template>
    <HeaderArea :title="title">
        <LinkButton :outline="true" @click="onBackButtonClick">メニューに戻る</LinkButton>
    </HeaderArea>
    <MainContainer>
        <form class="mb-3 flex flex-row gap-10" @submit.prevent="createTodo">
            <InputItem class="basis-2/3">
                <InputText id="todoTitle" name="todoTitle" />
            </InputItem>
            <ButtonArea class="basis-1/3 text-left">
                <SubmitButton>作成</SubmitButton>
            </ButtonArea>
        </form>
        <hr>
        <div class="mt-3 text-left">
            <ul class="list-disc">
                <li class="ml-10">
                    <ButtonArea>
                        <span class="pt-2">牛乳を買う</span>
                        <LinkButton>完了</LinkButton>
                        <LinkButton>削除</LinkButton>
                    </ButtonArea>
                </li>
            </ul>
        </div>
    </MainContainer>
</template>