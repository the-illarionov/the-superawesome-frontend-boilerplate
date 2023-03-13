import IndexPage from '@/pages/IndexPage/IndexPage.vue'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'IndexPage',
		component: IndexPage
	}
]
