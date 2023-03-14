/// <reference types="vite-ssg" />

import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import presetIcons from '@unocss/preset-icons'

// https://vitejs.dev/config/
export default defineConfig(() => {
	const LOCAL_HOST = loadEnv('development', process.cwd(), '').LOCAL_HOST

	return {
		plugins: [
			vue(),
			UnoCSS({
				presets: [
					presetIcons({
						extraProperties: {
							display: 'inline-block',
							'vertical-align': 'middle'
						}
					})
				]
			})
		],
		// https://github.com/antfu/vite-ssg/blob/main/src/types.ts
		ssgOptions: {
			formatting: 'minify',

			// https://github.com/antfu/vite-ssg#custom-routes-to-render
			includedRoutes(paths, routes) {
				return ['/']
			}
		},
		preview: {
			https: {
				key: `./keys/${LOCAL_HOST}-key.pem`,
				cert: `./keys/${LOCAL_HOST}.pem`
			}
		},
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url))
			}
		}
	}
})
