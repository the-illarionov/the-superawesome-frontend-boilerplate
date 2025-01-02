<script setup lang="ts">
import { RouterView } from 'vue-router'
import { machineApp } from './machines/MachineApp/MachineApp'

machineApp.send({
  type: 'Awake',
})
</script>

<template>
  <RouterView />
</template>
