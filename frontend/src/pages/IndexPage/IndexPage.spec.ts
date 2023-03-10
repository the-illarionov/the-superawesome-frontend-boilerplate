import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IndexPage from './IndexPage.vue'

describe('Index Suite', () => {
	it('Index Case', () => {
		const wrapper = mount(IndexPage)
		expect(wrapper.text()).toContain('Index Page')
	})
})
