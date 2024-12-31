import type { UserInfo } from '@/types/TypeUserInfo'
import type { Ref } from 'vue'
import type { DoneActorEvent, ErrorActorEvent } from 'xstate'
import type { FormData, ValidationErrors } from '../types'
import { useApi } from '@/composables/useApi'
import { assign, fromPromise, setup } from 'xstate'

export const MachineIndex = setup({
  types: {} as {
    tags: 'fetching'
    context: {
      validationErrors: ValidationErrors
      isDirty: boolean
      formData: FormData
      userInfo: UserInfo
    }
    events: |
    {
      type: 'User submitted'
      username: string
      password: string
    }
  },
  actions: {
    unassignValidationErrors: assign({
      validationErrors: () => ({}),
    }),
    assignFormData: assign({
      formData: ({ event }) => ({ username: event.username, password: event.password }),
    }),
    assignIsDirty: assign({
      isDirty: () => true,
    }),
    assignValidationErrors: assign({
      validationErrors: ({ event }) => (event as unknown as ErrorActorEvent<ValidationErrors>).error,
    }),
    assignUserInfo: assign({
      userInfo: ({ event }) => (event as unknown as DoneActorEvent<UserInfo>).output,
    }),
  },
  actors: {
    validateForm: fromPromise<true | ValidationErrors, { username: string, password: string }>(({ input }) => {
      const errors: ValidationErrors = {}

      if (!input.username)
        errors.username = 'empty'
      if (!input.password)
        errors.password = 'empty'

      if (Object.keys(errors).length > 0)
        return Promise.reject(errors)

      return Promise.resolve(true)
    }),
    fetchLogin: fromPromise<UserInfo | ValidationErrors, { username: string, password: string }>(async ({ input }) => {
      const { data, error }: { data: Ref<UserInfo>, error: Ref<string> } = await useApi('/login').post({
        username: input.username,
        password: input.password,
      })

      if (error.value)
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({ server: 'problem' })

      return data.value
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFkCGBjAFgSwHZgElcIwAPAOgHVVsAXPKAAgDMB7AJ0dgFcAjAWzoBiAKqwwnHgLq1IAbQAMAXUSgADq1h1srXKpClEAJgAsC8kaMBGAOwKFADgDMLpw6tOANCACeiJzbkTkYKTlYKAKyhCgCcRgBsThEAvsneaFh4hMRk5ABqqAA22BCo9LhQQhC6YOR4AG6sANa1GTj4RCQUBcWl5VAIDazoZTq4ikoT+hpa9Lr6hgg2VibkMcHx8ZYOllbefggOMRYmMWcxZg52JilpIG1Znbk9JaMVQhLsHORqhWVs7H45AeHRy3SKr36g1wjRGc3GyimSBAM2082Ri1MRhONgiMS2Cis61OXl8xicxxsuJisUiDniRNS6Qw7WyXXIADEwLRMhVGIVWFA8FUanUYc1WizHmDOdzeUwBULcNDYaNdBMkepNGi9BjEFYrJZyBEQlEbNYIhFbBF9ohNsajE4TPEaWFYgamfcpaD2Vyee0FYLhZ9vr9-hwgSC2bk-fL+UHlUM4WMNcpptr4QtENdyA4HBEbPErXiFAyjLaEE54oFHacHI4zG4Gak7rhWCR4Mio09FlrZmMswgFBWALRRci2GJ2EKmfOhIye7sy6jaPkArh8QS0dP99GgRYmBwV+nGxfe6Pg3pvKA7nWDqJWIJ0x0KGzrUt7MmHbEGq0mOwKI6VzmmevIXrK-oMPGSq3pmeoIDERK5o68RHDY7j0vEJjHj+VhWhSNgmAE5pvqBrI9uQYgSIw2CwNBMAQLBA7wR41jkIepYuhcqGJPEx7xMa9j2NW8SOIhpgtskQA */
  id: 'MachineIndex',

  context: {
    validationErrors: {},
    isDirty: false,
    formData: {
      username: '',
      password: '',
    },
    userInfo: {
      token: '',
      status: 0,
    },
  },

  output: ({ context }) => ({
    userInfo: context.userInfo,
  }),

  states: {
    'Waiting for submit': {
      on: {
        'User submitted': {
          target: 'Validating',
          actions: ['unassignValidationErrors', 'assignFormData', 'assignIsDirty'],
        },
      },
    },

    'Validating': {
      invoke: {
        src: 'validateForm',
        onDone: 'Fetching login',
        onError: {
          target: 'Waiting for submit',
          reenter: true,
          actions: 'assignValidationErrors',
        },
        input: ({ context }) => ({ username: context.formData.username, password: context.formData.password }),
      },
    },

    'Fetching login': {
      tags: 'fetching',
      invoke: {
        src: 'fetchLogin',
        onDone: {
          target: 'User is logged',
          actions: 'assignUserInfo',
        },
        onError: {
          target: 'Waiting for submit',
          reenter: true,
          actions: 'assignValidationErrors',
        },
        input: ({ context }) => ({ username: context.formData.username, password: context.formData.password }),
      },
    },

    'User is logged': {
      type: 'final',
    },
  },

  initial: 'Waiting for submit',
})
