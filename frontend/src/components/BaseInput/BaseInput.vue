<script setup lang='ts'>
defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  activatorError: boolean | undefined
  activatorLoading: boolean
  errorMessage: string | undefined
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
        {
          [$style.error]: props.activatorError,
        },
        {
          [$style.loading]: props.activatorLoading,
        },
      ]"
    >
    <div
      v-if="props.errorMessage"
      :class="$style['error-message']"
      data-test="error-message"
    >
      {{ props.errorMessage }}
    </div>
  </div>
</template>

<style module lang="postcss">
.input {
  display: block;
  width: 100%;
  border: 1px solid;
  transition: border 0.3s, background 0.3s;
}

.error {
  @apply border-red-600 bg-red-300;
}

.error-message {
  position: absolute;
  top: 100%;
  left: 0;

  @apply text-red-600;
}

.loading {
  @apply bg-gray-500;
}
</style>
