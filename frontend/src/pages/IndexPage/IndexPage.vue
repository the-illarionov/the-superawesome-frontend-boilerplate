<script setup lang="ts">
import { api } from '@/services/api'

const { data } = await api.get('/api/user')
</script>

<template>
	{{ data }}
	<div
		data-test="greeting"
		class="flex"
	>
		<i class="i-mdi-alarm"></i>Index Page
	</div>
</template>
