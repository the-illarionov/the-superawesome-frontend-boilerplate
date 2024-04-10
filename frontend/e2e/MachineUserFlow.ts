import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

import { setup } from 'xstate'
import { createModel } from '@xstate/test'

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
  /** @xstate-layout N4IgpgJg5mDOIC5QFkCGBjAFgSwHZgFVYwAnAMQBsB7AdwDojSACAN21mwBdYmSqrOAYkYkmsAK7p0cWADNxFCgE8m1KDAgBtAAwBdRKAAOVDp2xVcBkAA9EAJgDMdgDQgliABwA2OgFYAvv6uaFh4hMTk1PQirOxcPHwCwhFi4gBGALZcnJBMslQkGUw0XJhMaRSouADWTOIRuKgZYDr6SCDGpuaW7bYIdnYAnH6u7ggAjB52foFBILhUEHBWITj4IpS0Vp1c3VZ92qOI2oHBGGvhpJvRKWymCfyc2ya7FvuIACweRwjeM3OrMIbKIMFLsVRUdSQZ5dN69RBeOy+H5-AIA85AiLXOgANVQFGwEFQZgsTFIfFE4NgmFoPSMLxJdJsCIGfkGDgA7Mi3IhJtM0YEgA */
  id: 'MachineUserFlow',

  states: {
    'User visits root': {
      on: {
        'User successfully logged': 'User is logged',
        'User submitted form with blank username': 'Validation error is shown',
      },
      meta: {
        test: async (page: Page) => {
          await page.goto('/')
        },
      },
    },

    'User is logged': {
      meta: {
        test: async (page: Page) => {
          await expect(page.getByTestId('user-logged')).toBeVisible()
        },
      },
    },
    'Validation error is shown': {
      meta: {
        test: async (page: Page) => {
          await expect(page.getByTestId('error-message')).toBeVisible()
        },
      },
    },
  },

  initial: 'User visits root',
})

const modelUserFlow = createModel(MachineUserFlow).withEvents({
  'User successfully logged': {
    // @ts-expect-error exec
    exec: async (page: Page) => {
      await page.getByTestId('username').fill('foo')
      await page.getByTestId('password').fill('bar')
      await page.getByTestId('submit').click()
    },
  },
  'User submitted form with blank username': {
    // @ts-expect-error exec
    exec: async (page: Page) => {
      await page.getByTestId('submit').click()
    },
  },
})

const testPlans = modelUserFlow.getShortestPathPlans()

testPlans.forEach((plan) => {
  test.describe(plan.description, () => {
    plan.paths.forEach((path) => {
      test(path.description, async ({ page }) => {
        await path.test(page)
      })
    })
  })
})

export {
  testPlans,
}
