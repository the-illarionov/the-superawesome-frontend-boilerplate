import { createFetch } from '@vueuse/core'

const useMyFetch = createFetch({
	baseUrl: 'https://localhost',
	combination: 'overwrite',
	options: {
		async beforeFetch({ options }) {
			/* const myToken = await getMyToken()
      		options.headers.Authorization = `Bearer ${myToken}` */
			return { options }
		}
	},
	fetchOptions: {}
})

export const api = {
	get(url: string) {
		return useMyFetch(url).get().json()
	}
}
