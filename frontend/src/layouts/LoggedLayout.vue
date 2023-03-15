<script setup lang="ts">
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import { authMachine } from '@/machines/AuthMachine'

function logout() {
	authMachine.send({ type: 'User logged out' })
}
</script>

<template>
	<div>
		<TheHeader>
			<template #right>
				<a
					href="#"
					@click.prevent="logout"
					>Logout</a
				>
			</template>
		</TheHeader>
		<slot name="default"></slot>
	</div>
</template>

<style module></style>
