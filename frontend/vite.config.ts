import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import presetIcons from '@unocss/preset-icons'

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
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
})
