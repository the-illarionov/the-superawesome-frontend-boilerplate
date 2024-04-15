<script setup lang="ts">
import TheInitializationWrapper from './components/TheInitializationWrapper/TheInitializationWrapper.vue'
</script>

<template>
  <Suspense>
    <TheInitializationWrapper />
    <template #fallback>
      <div
        class="flex
            justify-center
            items-center
            h-full
            w-full"
      >
        Loading...
      </div>
    </template>
  </Suspense>
</template>
