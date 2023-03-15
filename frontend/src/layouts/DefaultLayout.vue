<script setup lang="ts">
import TheHeader from '@/components/TheHeader/TheHeader.vue'
</script>

<template>
	<div>
		<TheHeader>
			<template #right>
				<RouterLink
					data-test="router-link-auth-page"
					:to="{ name: 'AuthPage' }"
					>Login</RouterLink
				>
			</template>
		</TheHeader>
		<slot name="default"></slot>
	</div>
</template>

<style module></style>
