<script setup lang="ts">
import LoggedLayout from '@/layouts/LoggedLayout.vue'

import { authMachine } from '@/machines/AuthMachine'
</script>

<template>
	<LoggedLayout> You are logged, your token is: {{ authMachine.context.token }} </LoggedLayout>
</template>
