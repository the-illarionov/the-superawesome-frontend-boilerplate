<script setup lang="ts">
import { ref } from 'vue'

import DefaultLayout from '@/layouts/DefaultLayout.vue'

import { authMachine } from '@/machines/AuthMachine'

const username = ref('')
const password = ref('')

async function submit() {
	authMachine.send({
		type: 'Form was submitted',
		data: {
			username: username.value,
			password: password.value
		}
	})
}
</script>

<template>
	<DefaultLayout>
		<!-- #TODO: fix ts error -->
		<div
			data-test="auth-form"
			:class="{
				[$style['has-validation-errors']]:
					authMachine.state.value.hasTag('validation-failed'),
				[$style['loading']]: authMachine.state.value.hasTag('loading')
			}"
		>
			<div v-show="authMachine.state.value.hasTag('validation-failed')">
				<ul>
					<li
						v-for="(error, index) in authMachine.context.errors"
						:key="index"
					>
						{{ error.message }}
					</li>
				</ul>
			</div>

			<form
				action="/api/login"
				method="POST"
				@submit.prevent="submit"
			>
				<p>
					<input
						type="text"
						placeholder="Login"
						data-test="username"
						name="username"
						v-model="username"
					/>
				</p>
				<p>
					<input
						type="password"
						placeholder="Password"
						data-test="password"
						name="password"
						v-model="password"
					/>
				</p>
				<p><button type="submit">Login</button></p>
			</form>
		</div>
	</DefaultLayout>
</template>

<style module>
.has-validation-errors {
	background: red;
}
.loading {
	background: grey;
}
</style>
