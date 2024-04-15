import { expect, test } from '@playwright/test'

import { setup } from 'xstate'
import { createTestModel } from '@xstate/test'

const MachineUserFlow = setup({
  types: {} as {
    events: |
    {
      type: 'User successfully logged'
    } |
    {
      type: 'User submitted form with blank username'
    }
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFkCGBjAFgSwHZgFVYwAnAMQBsB7AdwDojSACAN21mwBdYmSqrOAYkYkmsAK7p0cWADNxFCgE8m1KDAgBtAAwBdRKAAOVDp2xVcBkAA9EAJgDMdgDQgliABwA2OgFYAvv6uaFh4hMTk1PQirOxcPHwCwhFi4gBGALZcnJBMslQkGUw0XJhMaRSouADWTOIRuKgZYDr6SCDGpuaW7bYIdnYAnH6u7ggAjB52foFBILhUEHBWITj4IpS0Vp1c3VZ92qOIALTjgcEYa+Gkm9EpbKYJ-JzbJrsW+4gALB5HCN4zOarMIbKIMFLsVRUdSQV5dD69RBeOy+P4AgJAy4giK3OgANVQFGwEFQZgsTFIfFEkNgmFoPSMbzJDJsSIGfkGDgA7Ki3IhJtMMYEgA */
  id: 'MachineUserFlow',

  states: {
    'User visits root': {
      on: {
        'User successfully logged': 'User is logged',
        'User submitted form with blank username': 'Validation error is shown',
      },
    },

    'User is logged': {

    },
    'Validation error is shown': {

    },
  },

  initial: 'User visits root',
})

const modelUserFlow = createTestModel(MachineUserFlow)

const testPaths = modelUserFlow.getShortestPaths()

testPaths.forEach((path) => {
  test(path.description, async ({ page }) => {
    await path.test({
      states: {
        'User visits root': async () => {
          await page.goto('/')
          await expect(page.getByTestId('form-login')).toBeVisible()
        },
        'User is logged': async () => {
          await expect(page.getByTestId('user-logged')).toBeVisible()
        },
        'Validation error is shown': async () => {
          await expect(page.getByTestId('error-message').first()).toBeVisible()
        },
      },
      events: {
        'User successfully logged': async () => {
          await page.getByTestId('username').fill('John Doe')
          await page.getByTestId('password').fill('Password')
          await page.getByTestId('submit').click()
        },
        'User submitted form with blank username': async () => {
          await page.getByTestId('submit').click()
        },
      },
    })
  })
})
