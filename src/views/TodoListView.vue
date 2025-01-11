<script setup lang="ts">
import HeaderArea from '@/components/HeaderArea.vue';
import MainContainer from '@/components/MainContainer.vue';
import InputText from '@/components/InputText.vue';
import SubmitButton from '@/components/SubmitButton.vue';

const title = 'TODOリスト';

const createTodo = () => {
    console.log('TODOを作成します');
};

</script>

<template>
    <HeaderArea v-bind:title="title" />
    <MainContainer>
        <form class="mb-3 flex flex-row gap-10" v-on:submit.prevent="createTodo">
            <InputText id="todoTitle" name="todoTitle" class="basis-2/3" />
            <div class="basis-1/3 text-left">
                <SubmitButton>作成</SubmitButton>
            </div>
        </form>
        <hr>
        <div class="mt-3 text-left">
            <ul class="list-disc">
                <li class="ml-10">
                    <span>牛乳を買う</span>
                    <SubmitButton class="ml-2">完了</SubmitButton>
                    <SubmitButton class="ml-2">削除</SubmitButton>
                </li>
            </ul>
        </div>
    </MainContainer>
</template>