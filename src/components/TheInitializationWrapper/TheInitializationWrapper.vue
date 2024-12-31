<script setup lang='ts'>
import { machineApp } from '@/machines/MachineApp/MachineApp'
/*
  This component waits for all of the logic required for application to be loaded before starting rendering anything.
  For example, you have something on your backend and you want to be safe that when any page renders it will already have that information.
  If you don't need it in your application feel free to discard this component and use classic App.vue-way
  It can't be implemented in App.vue because async script setup requires <Suspense> to present in parent.
*/
import { RouterView } from 'vue-router'
import { waitFor } from 'xstate'

await waitFor(
  machineApp.actorRef,
  snapshot => snapshot.hasTag('initialized'),
)
/*
  If you need something more to wait for before application will be initialized, add it here.
  Remember that if any of child components will have async script setup, it will be handled by <Suspense> automatically
*/
</script>

<template>
  <RouterView />
  <!-- Avoid adding anything here, it will decrease customizability. Use layouts instead -->
</template>
