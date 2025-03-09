<script setup lang="ts" generic="T">
// 参考
// https://tailwindui.com/components/application-ui/navigation/pagination を参考に作成

import { defineProps, defineEmits } from 'vue'
import { Pageable, Page } from '@/components/pagination/pagination'

// Propsのインターフェース定義
interface Props<T> {
  /**
   * ページサイズ（1ページ当たりの表示件数）
   */
  pageSize: number
  /**
   * 検索結果のページ情報
   */
  page: Page<T>
}

// Emitsのインターフェース定義
interface Emits {
  /**
   * ページリンクがクリックされたときに発火するイベント
   */
  (e: 'onClick', pageable: Pageable): void
}

// プロパティの定義
const props = defineProps<Props<T>>()

// エミットの定義
const emit = defineEmits<Emits>()

// ページリンクがクリックされたときのハンドラ
function handleClick(pageIndex: number) {
  // クリックされたページ番号をもとに、Pageableを作成してイベントを発火
  // ページ数は0から始まるため、ページ番号から1を引いている
  const pageNumber = pageIndex - 1
  emit('onClick', new Pageable(props.pageSize, pageNumber))
}
</script>

<template>
  <div class="flex items-center justify-between border-t border-gray-200 py-3">
    <div>
      <nav
        class="isolate inline-flex -space-x-px rounded-md bg-white shadow-xs"
        aria-label="Pagination">
        <a
          href="#"
          class="text-md relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-gray-300 ring-inset focus:z-20 focus:outline-offset-0"
          :class="page.isFirst() ? 'bg-gray-200 text-gray-500' : 'text-blue-600 hover:bg-gray-50'"
          @click.prevent.stop="handleClick(1)">
          <span>最初へ</span>
        </a>
        <a
          href="#"
          class="text-md relative inline-flex items-center px-2 py-2 ring-1 ring-gray-300 ring-inset focus:z-20 focus:outline-offset-0"
          :class="page.isFirst() ? 'bg-gray-200 text-gray-500' : 'text-blue-600 hover:bg-gray-50'"
          @click.prevent.stop="handleClick(page.pageNumber)">
          <span>前へ</span>
        </a>
        <a
          v-for="pageIndex in page.getTotalPages()"
          :key="pageIndex"
          href="#"
          :aria-current="page.isCurrent(pageIndex - 1) ? 'page' : undefined"
          class="relative inline-flex px-4 py-2 font-semibold"
          :class="
            page.isCurrent(pageIndex - 1)
              ? 'z-10 items-center bg-blue-600 text-sm text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2'
              : 'items-centertext-sm text-blue-600 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
          "
          @click.prevent.stop="handleClick(pageIndex)">
          {{ pageIndex }}
        </a>
        <a
          href="#"
          class="text-md relative inline-flex items-center px-2 py-2 ring-1 ring-gray-300 ring-inset focus:z-20 focus:outline-offset-0"
          :class="page.isLast() ? 'bg-gray-200 text-gray-500' : 'text-blue-600 hover:bg-gray-50'"
          @click.prevent.stop="handleClick(page.pageNumber + 2)">
          <span>次へ</span>
        </a>
        <a
          href="#"
          class="text-md relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-gray-300 ring-inset focus:z-20 focus:outline-offset-0"
          :class="page.isLast() ? 'bg-gray-200 text-gray-500' : 'text-blue-600 hover:bg-gray-50'"
          @click.prevent.stop="handleClick(page.getTotalPages())">
          <span>最後へ</span>
        </a>
      </nav>
    </div>
  </div>
</template>
