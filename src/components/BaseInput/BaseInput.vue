<script setup lang='ts'>
defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  activatorError?: boolean
  activatorLoading?: boolean
  errorMessage?: string
}>()

const model = defineModel()
</script>

<template>
  <div class="relative">
    <input
      v-model="model"
      v-bind="$attrs"
      :class="[
        $style.input,
        props.activatorError && $style.error,
        props.activatorLoading && $style.loading,
      ]">

    <div
      v-if="props.errorMessage"
      :class="$style['error-message']"
      data-test="error-message">
      {{ props.errorMessage }}
    </div>
  </div>
</template>

<style module lang="postcss">
.input {
  width: 100%;
  border: 1px solid;
  transition: border 0.3s, background 0.3s;
}

.error {
  @apply border-red-600 bg-red-300;
}

.error-message {
  position: absolute;
  bottom: 100%;
  left: 0;

  @apply text-red-600;
}

.loading {
  @apply bg-gray-500;
}
</style>
