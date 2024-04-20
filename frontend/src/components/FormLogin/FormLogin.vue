<script setup lang='ts'>
import { useMachine } from '@xstate/vue'
import { ref } from 'vue'
import { MachineIndex } from './machines/MachineIndex'
import BaseInput from '@/components/BaseInput/BaseInput.vue'
import BaseButton from '@/components//BaseButton/BaseButton.vue'
import type { UserInfo } from '@/types/TypeUserInfo'

const emit = defineEmits<{
  (e: 'logged', arg: { userInfo: UserInfo }): void
}>()

const machineIndex = useMachine(MachineIndex)

machineIndex.actorRef.start()

const username = ref('')
const password = ref('')

function onSubmit(e: Event) {
  machineIndex.send({
    type: 'User submitted',
    username: username.value,
    password: password.value,
  })

  e.preventDefault()
}

machineIndex.actorRef.subscribe({
  complete() {
    emit(
      'logged',
      {
        userInfo: machineIndex.snapshot.value.context.userInfo,
      },
    )
  },
})
</script>

<template>
  <div>
    <!-- I probably would not do validation logic like that in real project but for demo purpose it's ok -->
    FormLogin MachineIndex state: {{ machineIndex.snapshot.value.value }}<br>
    FormLogin MachineIndex context: {{ machineIndex.snapshot.value.context }}
    <form @submit="onSubmit">
      <div class="mb-8">
        <BaseInput
          v-model="username"
          placeholder="Name"
          :activator-error="
            machineIndex.snapshot.value.context.validationErrors.username
              && machineIndex.snapshot.value.context.isDirty"
          :error-message="machineIndex.snapshot.value.context.validationErrors.username"
          :activator-loading="machineIndex.snapshot.value.hasTag('fetching')"
          data-test="username"
        />
      </div>

      <div class="mb-8">
        <BaseInput
          v-model="password"
          placeholder="Password"
          type="password"
          :activator-error="
            machineIndex.snapshot.value.context.validationErrors.password
              && machineIndex.snapshot.value.context.isDirty"
          :error-message="machineIndex.snapshot.value.context.validationErrors.password"
          :activator-loading="machineIndex.snapshot.value.hasTag('fetching')"
          data-test="password"
        />
      </div>

      <BaseButton
        data-test="submit"
        :activator-loading="machineIndex.snapshot.value.hasTag('fetching')"
      >
        Login
      </BaseButton>

      <div
        v-if="machineIndex.snapshot.value.hasTag('fetching')"
        class="pt-8
            text-center"
      >
        Loading...
      </div>
    </form>
  </div>
</template>
