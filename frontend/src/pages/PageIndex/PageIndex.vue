<script setup lang='ts'>
import LayoutBase from '@/layouts/LayoutBase.vue'
import { machineApp } from '@/machines/MachineApp/MachineApp'
import FormLogin from '@/components/FormLogin/FormLogin.vue'
import type { UserInfo } from '@/types/TypeUserInfo'

function sendUserInfoToMachineApp({ userInfo }: { userInfo: UserInfo }) {
  machineApp.send({
    type: 'User authorized',
    userInfo,
  })
}
</script>

<template>
  <LayoutBase>
    <p>
      machineApp state:
      <span data-test="machineapp-state">
        {{ machineApp.snapshot.value.value }}
      </span>
    </p>
    <p class="mb-16">
      machineApp context:
      {{ machineApp.snapshot.value.context }}
    </p>

    <div class="mx-auto w-1/2">
      <Transition
        name="fade"
        mode="out-in"
      >
        <FormLogin
          v-if="machineApp.snapshot.value.hasTag('unauthorized')"
          @logged="sendUserInfoToMachineApp"
        />
        <div
          v-else
          class="text-center"
          data-test="user-logged"
        >
          You are logged in
        </div>
      </Transition>
    </div>
  </LayoutBase>
</template>
