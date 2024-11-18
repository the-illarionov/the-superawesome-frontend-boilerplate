import { mount } from '@vue/test-utils'

import { expect, it } from 'vitest'
import BaseInput from './BaseInput.vue'

it('renders validation error', () => {
  const wrapper = mount(BaseInput, { props: {
    errorMessage: 'Validation error message',
    activatorError: true,
    activatorLoading: false,
  } })
  expect(wrapper.text()).toContain('Validation error message')
})
