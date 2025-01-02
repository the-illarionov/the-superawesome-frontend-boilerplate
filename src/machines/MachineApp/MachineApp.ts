/* eslint ts/no-use-before-define: 0 */

import type { ApiGetPostResponse } from '@/api/types'
import type { MachineAppContext } from './types'
import { Api } from '@/api'
import { assert } from '@/utils/assert'
import { createBrowserInspector } from '@statelyai/inspect'
import { shallowRef } from 'vue'
import { type ActorLogicFrom, type ActorOptions, assign, createActor, initialTransition, setup } from 'xstate'

const MachineApp = setup({
  types: {} as {
    tags: 'loading'
    events: |
      {
        type: 'Awake'
      } |
      {
        type: 'Sleep'
      } |
      {
        type: 'User fetched post'
        id: number
      } |
      {
        type: 'Post received successfully'
        post: ApiGetPostResponse
      } |
      {
        type: 'Post fetching failed'
        error: string
      }
    context: MachineAppContext
  },
  actions: {
    resetContext: assign({
      ...generateInitialContext(),
    }),

    async fetchPost({ event }) {
      assert(event.type === 'User fetched post')

      try {
        const post = await Api.getPost({ id: event.id })

        send({
          type: 'Post received successfully',
          post,
        })
      }
      catch (error: any) {
        send({
          type: 'Post fetching failed',
          error: error.message,
        })
      }
    },

    unassignPost: assign({
      post: () => undefined,
    }),

    assignPost: assign({
      post: ({ event }) => {
        assert(event.type === 'Post received successfully')

        return event.post
      },
    }),

    unassignError: assign({
      error: () => undefined,
    }),

    assignError: assign({
      error: ({ event }) => {
        assert(event.type === 'Post fetching failed')

        return event.error
      },
    }),
  },
  actors: {},
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFkCGBjAFgSwHZgEEAHIgOgGUAbMMIgYgIHdUBrMAbQAYBdRUIgPaxsAF2wDcfEAA9EANgBMAZlIBOAKxLVARiUAOOUoAsAdjlGANCACeibXoWlTpvetPnjRhQF9vVtFh4hCSkTKxgdFQ0RFy8SCCCwmISUrIIiiakcpzK6rqG7pY2iEqcnGomLm5mRp6+-hg4+MRkYWykAOqoonhQAAQAZgIATn0ArrBgoyICg2AiWH2JInQAqpOjA-NYkEtCIrFSiT0p8WnaF9qkStnaRnImCuqcJndWtggKBqQKRg7ar04SiUXx8fhAASawVazHaADFtk1+ss6AAFfZ9YZgdBgbAAN12sDG6BxsFgAzGlEo1kO8WOyUkZzsL1U1xM6hMBlqeQBcneiCMmlI9hyrk4FzkenscnqEMaQRaoVhYFICIWSL2sBW6K1c3VvUG3WoEFp-CEJ0ZoHO2k4cmFej0IIUlSUJhu-IQ6m+Xruej+gvFbt84NwAggcCkkIVJCO5oZqQFnFZXoeRm0igUCjkbiKH3MPz+ChFWklClUYIagWaISitFjSXElpkAo5pBTlXTmazOY99kczk51Q8Ri8sqj1Zh4XrFoTCBMZjbBkehgKNV7eVIlQcCjKO-nclUMvB4+hSvCnW6Ylw-SGowmUz6Mz1i2W0-jTIQDiMi4eWZuxjXYoEFKPQKiqQo6mPeUJzPeFEQNV86TjRtZ10Z0220LN2U5Iwyk4dQPRAsDBwgkdg28IA */
  id: 'MachineApp',

  context: generateInitialContext(),

  states: {
    Sleep: {
      on: {
        Awake: 'Awake',
      },
    },

    Awake: {
      on: {
        Sleep: 'Sleep',
      },

      exit: 'resetContext',

      states: {
        'Waiting for user to fetch post': {
          on: {
            'User fetched post': {
              target: 'Fetching post',
              actions: ['unassignPost', 'unassignError'],
            },
          },
        },

        'Fetching post': {
          tags: 'loading',
          on: {
            'Post received successfully': {
              target: 'Waiting for user to fetch post',
              actions: 'assignPost',
            },

            'Post fetching failed': {
              target: 'Waiting for user to fetch post',
              actions: 'assignError',
            },
          },

          entry: 'fetchPost',
        },
      },

      initial: 'Waiting for user to fetch post',
    },
  },

  initial: 'Sleep',
})

function generateInitialContext(): MachineAppContext {
  return {
    post: undefined,
    error: undefined,
  }
}

const machineOptions: ActorOptions<ActorLogicFrom<typeof MachineApp>> = {}

if (import.meta.env.DEV && import.meta.env.VITE_XSTATE_DEBUG === '1')
  machineOptions.inspect = createBrowserInspector().inspect

const snapshot = shallowRef(initialTransition(MachineApp)[0])

const actorRef = createActor(MachineApp, machineOptions)

actorRef.subscribe({
  next(newSnapshot) {
    snapshot.value = newSnapshot
  },
  error(err) {
    console.error(err)
  },
})

actorRef.start()

const send = actorRef.send

const machineApp = {
  send,
  snapshot,
}

export {
  machineApp,
}
