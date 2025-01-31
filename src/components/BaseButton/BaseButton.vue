<script setup lang='ts'>
const props = defineProps<{
  activatorLoading?: boolean
}>()
</script>

<template>
  <button
    :class="[
      $style.button,
      props.activatorLoading && $style.loading,
    ]">
    <slot />
  </button>
</template>

<style module lang="postcss">
.button {
  display: block;

  width: 100%;
  border: 1px solid;

  text-align: center;

  transition: border 0.3s, background 0.3s;
}

.loading {
  @apply bg-gray-500;

  cursor: default;
}
</style>
