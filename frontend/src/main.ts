import 'uno.css'
import '@unocss/reset/normalize.css'
import '@unocss/reset/eric-meyer.css'

import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from '@/router'
import type { Router } from 'vue-router'

let routerInstance: Router

// `export const createApp` is required instead of the original `createApp(App).mount('#app')`
export const createApp = ViteSSG(
	// the root component
	App,
	// vue-router options
	{ routes },
	// function to have custom setups
	({ app, router, routes, isClient, initialState }) => {
		routerInstance = router
		// install plugins etc.
	}
)

export { routerInstance }
