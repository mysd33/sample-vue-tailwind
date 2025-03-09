<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HeaderArea from '@/components/layout/HeaderArea.vue'
import MainContainer from '@/components/layout/MainContainer.vue'
import TableArea from '@/components/table/TableArea.vue'
import TableHeaderRow from '@/components/table/TableHeaderRow.vue'
import TableHeaderCol from '@/components/table/TableHeaderCol.vue'
import TableDataRow from '@/components/table/TableDataRow.vue'
import PaginationLink from '@/components/pagination/PaginationLink.vue'
import LinkButton from '@/components/button/LinkButton.vue'
import ButtonArea from '@/components/button/ButtonArea.vue'
import TableDataCol from '@/components/table/TableDataCol.vue'
import { useRouter } from 'vue-router'
import ActionButton from '@/components/button/ActionButton.vue'
import { UserRepository } from '@/usecases/common/repositories/UserRepository'
import type { User } from '@/usecases/common/models/User'
import { UserService } from '@/usecases/user/services/UserService'
import { formatDate, calcAge } from '@/usecases/common/utils/date_utils'
import { Page, Pageable } from '@/components/pagination/pagination'

//TODO: 設定ファイルに切り出しできるようにする
const pageSize = 5

const userRepository = new UserRepository()
const userService = new UserService(userRepository)

const userPage = ref<Page<User>>()

const router = useRouter()

// 初期表示処理
onMounted(async () => {
  // ユーザ一覧を取得
  userPage.value = await userService.findAllForPageNation(new Pageable(pageSize, 0))
})

// ページング処理
const onPageClicked = async (pageable: Pageable) => {
  userPage.value = await userService.findAllForPageNation(pageable)
}

// 詳細ボタンクリック時の処理
const onDetailButtonClicked = (id: string) => {
  // クリックされたユーザIDをパラメータにして詳細画面に遷移
  router.push({ name: 'userDetail', params: { id: id } })
}
</script>

<template>
  <HeaderArea title="ユーザ管理">
    <LinkButton :outline="true" forward-view-name="menu">メニューに戻る</LinkButton>
  </HeaderArea>
  <MainContainer>
    <TableArea>
      <template v-slot:thead>
        <TableHeaderRow>
          <TableHeaderCol>No</TableHeaderCol>
          <TableHeaderCol>ユーザID</TableHeaderCol>
          <TableHeaderCol>ユーザ名</TableHeaderCol>
          <TableHeaderCol>誕生日</TableHeaderCol>
          <TableHeaderCol>年齢</TableHeaderCol>
          <TableHeaderCol>管理者</TableHeaderCol>
          <TableHeaderCol></TableHeaderCol>
        </TableHeaderRow>
      </template>
      <template v-slot:tbody v-if="userPage">
        <TableDataRow v-for="(user, index) in userPage.content" :key="user.id">
          <TableDataCol>{{ index + 1 }}</TableDataCol>
          <TableDataCol>{{ user.id }}</TableDataCol>
          <TableDataCol>{{ user.name }}</TableDataCol>
          <TableDataCol>{{ formatDate(user.birthday) }}</TableDataCol>
          <TableDataCol>{{ calcAge(user.birthday) }}</TableDataCol>
          <TableDataCol>{{ user.isAdmin ? '○' : '-' }}</TableDataCol>
          <TableDataCol>
            <LinkButton @click="onDetailButtonClicked(user.id)">詳細</LinkButton>
          </TableDataCol>
        </TableDataRow>
      </template>
    </TableArea>
    <PaginationLink
      v-if="userPage"
      :pageSize="pageSize"
      :page="userPage"
      @onClick="onPageClicked" />

    <div class="my-2 text-left">
      <label>合計: {{ userPage ? userPage.totalElements : 0 }}件</label>
    </div>
    <br />
    <ButtonArea>
      <ActionButton>CSV出力</ActionButton>
      <LinkButton forward-view-name="newUser">新規ユーザ登録</LinkButton>
    </ButtonArea>
  </MainContainer>
</template>
