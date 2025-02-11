import { describe, expect, test } from 'vitest'
import LoginView from '@/views/LoginView.vue'
import { mount } from '@vue/test-utils'

describe('LoginViewのテスト', () => {
  test('LoginViewが表示されること', () => {
    const wrapper = mount(LoginView)
    expect(wrapper.text()).toContain('TODO管理アプリ')
  })
})
