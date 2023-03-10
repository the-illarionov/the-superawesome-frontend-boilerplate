import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		globals: true,
	},
	ssr: {
		format: "esm", // you can use "cjs", but don't forget to edit "serve" command in package.json
	},
})
