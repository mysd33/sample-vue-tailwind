import { describe, expect, test } from 'vitest'
import HomeView from '@/views/HomeView.vue'
import { mount } from '@vue/test-utils'

describe('HomeViewのテスト', () => {
  test('HomeViewが表示されること', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.text()).toContain('Hello world!')
  })
})
