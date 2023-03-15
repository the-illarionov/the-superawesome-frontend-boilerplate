import { createFetch } from '@vueuse/core'

const useBaseFetch = createFetch({
	baseUrl: `https://localhost`, // #TODO: change to import.meta.env.BASE_URL
	combination: 'overwrite',
	options: {
		async beforeFetch({ options }) {
			/* const myToken = await getMyToken()
      		options.headers.Authorization = `Bearer ${myToken}` */
			return { options }
		}
	}
})

export { useBaseFetch }
