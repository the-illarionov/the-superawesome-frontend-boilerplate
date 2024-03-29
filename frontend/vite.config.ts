/// <reference types="vite-ssg" />

import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'

const env = loadEnv('development', process.cwd(), '')

// #TODO: vite.dev.config + vite.prod.config

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		UnoCSS({
			presets: [
				presetUno(),
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

		includedRoutes() {
			return ['/', '/auth']
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
