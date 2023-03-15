import { useBaseFetch } from './baseFetch'

export const auth = {
	login({ username, password }: Api.Auth.Login) {
		return useBaseFetch('/api/login').json().post({ username, password })
	}
}
