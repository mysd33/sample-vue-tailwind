import { beforeEach, describe, expect, test } from 'vitest'
import LoginView from '../LoginView.vue'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

describe('LoginViewのテスト', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('LoginViewが表示されること', () => {
    const wrapper = mount(LoginView)
    expect(wrapper.text()).toContain('TODO管理アプリ')
  })
})
