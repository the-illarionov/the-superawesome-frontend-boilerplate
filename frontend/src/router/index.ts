import type { RouteRecordRaw } from 'vue-router'
import IndexPage from '@/pages/IndexPage/IndexPage.vue'
import AuthPage from '@/pages/AuthPage/AuthPage.vue'
import DashboardPage from '@/pages/DashboardPage/DashboardPage.vue'

export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'IndexPage',
		component: IndexPage
	},
	{
		path: '/auth',
		name: 'AuthPage',
		component: AuthPage
	},
	{
		path: '/dashboard',
		name: 'DashboardPage',
		component: DashboardPage
	}
]
