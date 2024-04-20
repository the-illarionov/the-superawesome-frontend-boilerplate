import { assign, fromPromise, setup } from 'xstate'
import type { DoneActorEvent } from 'xstate'
import { useMachine } from '@xstate/vue'
import type { Ref } from 'vue'
import { createBrowserInspector } from '@statelyai/inspect'
import type { ConfigurationData } from './types'
import type { UserInfo } from '@/types/TypeUserInfo'
import { useApi } from '@/composables/useApi'

const MachineApp = setup({
  types: {} as {
    tags: 'initialized' | 'unauthorized'
    context: {
      configurationData: ConfigurationData
      userInfo: UserInfo
    }
    events: {
      type: 'User authorized'
      userInfo: UserInfo
    }
  },
  actions: {
    assignConfigurationData: assign({
      configurationData: ({ event }) => (event as unknown as DoneActorEvent<ConfigurationData>).output,
    }),
    assignUserInfo: assign({
      userInfo: ({ event }) => event.userInfo,
    }),
    showConnectionError() {
      // eslint-disable-next-line no-alert
      alert('There was a problem with connection!')
    },
  },
  actors: {
    fetchConfigurationData: fromPromise<ConfigurationData>(async () => {
      const { data, error }: { data: Ref<ConfigurationData>, error: Ref<string> } = await useApi('/configuration').get()

      if (error.value)
        return Promise.reject(new Error('error'))

      return data.value
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFkCGBjAFgSwHZgEEAHIgOgDEwAXLPKAAnQHtcAzbKAVwCdUrsW9CH1QBiCCzCk8ANyYBrKWlr5iZSjRy4GzNhx58BuISISym6QywDaABgC6d+4lBEmsbPxYuQAD0QAzABMAOykAQAsASGRIREAjEHxtgCcEQA0IACeiAAcuaQhMVEhAKwAvuWZylqEJKQA6qiedPSsTNz0nLBgnVRM9KicVJiiAKo9nUMjHdgAXpBOPm4eXrg+-gi5AGzx4UG5ySlxiUeZOVthoZHRFVUgNXh16tQqOizsXLxrJlRivdwOqQiAAbPjtbgAW1Ij1U9Q0b0YH303yMv1QZlwcksaycSyQIBWLW8BM2wQKtnipW2qROSVSGWyiCCERSpCCd3uuCYEDgPlhz2W7mJ61JiFs53FlWqGFqagory07z0XysxmEfyFqyMG0QEVykq221IdxlKmejWa-G0bQ6XUm9H6g2GmC1It1CFKKSC4RKsQS9JShviyWlD1lT3lAEkICCwG61h7kiFbPtDrSAyHg6H7gL5QBlTBMADurV0+HQPwBHQTOrFnpSpV90X9p1ShpZYTKlUqQA */
  id: 'MachineApp',

  context: {
    configurationData: {
      data: '',
    },
    userInfo: {
      token: '',
      status: 0,
    },
  },

  states: {
    'Fetching configuration data': {
      invoke: {
        src: 'fetchConfigurationData',
        onDone: {
          target: 'Waiting for user to auth',
          actions: 'assignConfigurationData',
        },
        onError: 'Showing connection error',
      },
    },

    'Waiting for user to auth': {
      tags: ['initialized', 'unauthorized'],
      on: {
        'User authorized': {
          target: 'Idle',
          actions: 'assignUserInfo',
        },
      },
    },

    'Idle': {},
    'Showing connection error': {
      entry: 'showConnectionError',
    },
  },

  initial: 'Fetching configuration data',
})

const machineOptions: any = {
  systemId: 'machineApp',
}

if (import.meta.env.DEV)
  machineOptions.inspect = createBrowserInspector().inspect

const machineApp = useMachine(MachineApp, machineOptions)

machineApp.actorRef.start()

machineApp.actorRef.subscribe({
  error: (err) => {
    console.error(err)
  },
})

export {
  machineApp,
}
