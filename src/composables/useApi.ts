import { createFetch, type UseFetchOptions } from '@vueuse/core'

const useApiRaw = createFetch({
  baseUrl: '/api',
  combination: 'chain',
  options: {
    async beforeFetch({ options }) {
      options.headers = {
        ...options.headers,
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      }

      return {
        options,
      }
    },
  },
})

/*
Creating a wrapper around API so we don't need to write ".json" each time.
If you need another response type, i would suggest creating something like 'useApiBlob' instead of exporting 'useApiRaw'
*/

function useApi(urL: string, obj?: UseFetchOptions) {
  return useApiRaw(urL, obj ?? {}).json()
}

export {
  useApi,
}
