import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IndexPage from './IndexPage.vue'

// #TODO: make more obvious unit tests (for components mb)

describe('IndexPage Suite', () => {
	it('IndexPage Case', () => {
		const wrapper = mount(IndexPage)
		expect(wrapper.text()).toContain('Hello, World!')
	})
})
