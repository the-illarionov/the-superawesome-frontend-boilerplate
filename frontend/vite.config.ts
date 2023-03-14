/// <reference types="vite-ssg" />

import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import presetIcons from '@unocss/preset-icons'

const env = loadEnv('development', process.cwd(), '')

// https://vitejs.dev/config/
export default defineConfig({
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
			key: `./keys/${env.LOCAL_HOST}-key.pem`,
			cert: `./keys/${env.LOCAL_HOST}.pem`
		}
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
})
