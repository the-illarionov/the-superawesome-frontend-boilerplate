<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<template>
	<DefaultLayout>
		<h1
			data-test="greeting"
			class="color-green text-5xl"
		>
			<i class="i-mdi-human-greeting-variant"></i>Hello, World!
		</h1>
	</DefaultLayout>
</template>
