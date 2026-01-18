<script setup lang="ts">
import ActionButton from '@/components/button/ActionButton.vue'
import ButtonArea from '@/components/button/ButtonArea.vue'
import LinkButton from '@/components/button/LinkButton.vue'
import HeaderArea from '@/components/layout/HeaderArea.vue'
import MainContainer from '@/components/layout/MainContainer.vue'
import { Page, Pageable } from '@/components/pagination/pagination'
import PaginationLink from '@/components/pagination/PaginationLink.vue'
import TableArea from '@/components/table/TableArea.vue'
import TableDataCol from '@/components/table/TableDataCol.vue'
import TableDataRow from '@/components/table/TableDataRow.vue'
import TableHeaderCol from '@/components/table/TableHeaderCol.vue'
import TableHeaderRow from '@/components/table/TableHeaderRow.vue'
import type { User } from '@/usecases/common/models/user'
import { calcAge, formatDate } from '@/usecases/common/utils/dateUtils'
import { UserService } from '@/usecases/user/services/userService'
import { onMounted, ref } from 'vue'

// ビジネスロジック
const userService = UserService.getInstance()

//TODO: ページサイズを設定ファイルに切り出しできるようにする
const pageSize = 5

const userPage = ref<Page<User>>()

// 初期表示処理
onMounted(async () => {
  // ユーザ一覧を取得
  userPage.value = await userService.findAllForPagination(new Pageable(pageSize, 0))
})

// ページネーション処理
const onPageClicked = async (pageable: Pageable) => {
  userPage.value = await userService.findAllForPagination(pageable)
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
      <template v-slot:tbody>
        <template v-if="!userPage || userPage.content.length === 0">
          <TableDataRow>
            <TableDataCol colSpan="7" class="text-center">データが存在しません</TableDataCol>
          </TableDataRow>
        </template>
        <template v-if="userPage && userPage.content.length > 0">
          <TableDataRow v-for="(user, index) in userPage.content" :key="user.id">
            <TableDataCol>{{ index + 1 }}</TableDataCol>
            <TableDataCol>{{ user.id }}</TableDataCol>
            <TableDataCol>{{ user.name }}</TableDataCol>
            <TableDataCol>{{ formatDate(user.birthday) }}</TableDataCol>
            <TableDataCol>{{ calcAge(user.birthday) }}</TableDataCol>
            <TableDataCol>{{ user.isAdmin ? '○' : '-' }}</TableDataCol>
            <TableDataCol>
              <!-- 詳細ボタンで詳細画面へ遷移 -->
              <LinkButton forward-view-name="userDetail" :forward-view-params="{ id: user.id }"
                >詳細</LinkButton
              >
            </TableDataCol>
          </TableDataRow>
        </template>
      </template>
    </TableArea>
    <PaginationLink
      v-if="userPage && userPage.content.length > 0"
      :pageSize="pageSize"
      :page="userPage"
      @onClick="onPageClicked" />

    <div class="my-2 text-left">
      <span>合計: {{ userPage ? userPage.totalElements : 0 }}件</span>
    </div>
    <br />
    <ButtonArea>
      <ActionButton>CSV出力</ActionButton>
      <LinkButton forward-view-name="newUser">新規ユーザ登録</LinkButton>
    </ButtonArea>
  </MainContainer>
</template>
