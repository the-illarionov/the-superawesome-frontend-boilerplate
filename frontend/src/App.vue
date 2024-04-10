<script setup lang="ts">
import TheInitializationWrapper from './components/TheInitializationWrapper/TheInitializationWrapper.vue'

const isDev = import.meta.env.DEV
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

  <iframe
    v-if="isDev"
    id="stately-inspect"
    class="absolute
        bottom-0
        left-0
        h-[40vh]
        w-full"
  />
</template>
