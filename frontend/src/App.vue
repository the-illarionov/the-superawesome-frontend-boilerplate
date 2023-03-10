<script setup lang="ts">
import { RouterView } from 'vue-router'

fetch('/api/user')
	.then((r) => r.json())
	.then((r) => {
		console.log(r)
	})
</script>

<template>
	<RouterView />
</template>

<style module></style>
