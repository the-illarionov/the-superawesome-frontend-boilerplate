<script setup lang='ts'>
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import BaseInput from '@/components/BaseInput/BaseInput.vue'
import LayoutBase from '@/layouts/LayoutBase.vue'
import { machineApp } from '@/machines/MachineApp/MachineApp'
import { computed, ref } from 'vue'

const isLoading = computed(() => machineApp.snapshot.value.hasTag('loading'))
const errorMessage = computed(() => machineApp.snapshot.value.context.error)

const postId = ref('')

function fetchPost() {
  machineApp.send({
    type: 'User fetched post',
    id: Number.parseInt(postId.value),
  })
}

const post = computed(() => machineApp.snapshot.value.context.post)
</script>

<template>
  <LayoutBase>
    <BaseInput
      v-model="postId"
      :activator-loading="isLoading"
      :activator-error="typeof errorMessage !== 'undefined'"
      :error-message="errorMessage"
      class="mb-4"
      placeholder="Type an id for a post to fetch from jsonplaceholder.com" />

    <BaseButton
      :activator-loading="isLoading"
      class="mb-8"
      @pointerdown="fetchPost">
      Fetch post
    </BaseButton>

    <Transition name="fade">
      <div v-if="post">
        <h2 class="text-xl">
          {{ post.title }}
        </h2>

        <p>
          {{ post.body }}
        </p>

        <p class="text-gray-500">
          id: {{ post.id }}
        </p>

        <p class="text-gray-500">
          userId: {{ post.userId }}
        </p>
      </div>
    </Transition>
  </LayoutBase>
</template>
