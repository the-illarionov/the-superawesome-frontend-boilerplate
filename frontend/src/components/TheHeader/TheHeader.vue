<script setup lang="ts"></script>

<template>
	<div :class="$style.header">
		<div :class="$style.right">
			<slot name="right"></slot>
		</div>
	</div>
</template>

<style module>
.header {
	display: flex;
	padding: 1rem;
}

.right {
	margin-left: auto;
}
</style>
