<script setup lang='ts'>
const props = defineProps<{
  activatorLoading: boolean
}>()
</script>

<template>
  <button
    :class="[
      $style.button,
      {
        [$style.loading]: props.activatorLoading,
      },
    ]">
    <slot />
  </button>
</template>

<style module lang="postcss">
.button {
  display: block;
  width: 100%;
  text-align: center;
  border: 1px solid;
}

.loading {
  @apply bg-gray-500;

  cursor: default;
}
</style>
